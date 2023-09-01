import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse, userAgent } from 'next/server';

const supabaseUrl = 'https://tawrifvzyjqcddwuqjyq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhd3JpZnZ6eWpxY2Rkd3VxanlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2NTc2MjcsImV4cCI6MjAwODIzMzYyN30.-VekGbd6Iwey0Q32SQA0RxowZtqSlDptBhlt2r-GZBw';
const supabase = createClient(supabaseUrl, supabaseKey);

type Variant = {
  id: string;
  fileName: string;
  weight: number;
  experiment_id: string;
};

export const config = {
  // placeholder, the matcher will be dynamically adjusted inside the middleware.
  matcher: '/blog',
};

export async function dynamicMiddleware(req: NextRequest) {
  const { device } = userAgent(req);
  const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';

  // extract experimentId and experimentPath from req.body
  const { experiment_id, experiment_path }: any = req.body;

  // adjusting matcher dynamically based on provided path
  config.matcher = experiment_path;

  // fetch experiment and its variants from Supabase
  let { data, error } = await supabase
    .from('experiment')
    .select('*, variants (*)')
    .eq('experiment_id', experiment_id);

  if (error || !data || data.length === 0) {
    console.error('Error fetching experiment data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }

  const currentExperiment = data[0];
  const variants = currentExperiment.variants;

  function chooseVariant(variants: Variant[]): Variant {
    let totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
    let randomValue = Math.random() * totalWeight;

    for (const variant of variants) {
      if (randomValue < variant.weight) {
        return variant;
      }
      randomValue -= variant.weight;
    }

    return variants[0];
  }

  const variantCookie = req.cookies.get('variantID');
  const cookieID = variantCookie
    ? `${currentExperiment.id}_${variantCookie.value}`
    : null;

  let chosenVariant: Variant;

  if (cookieID) {
    chosenVariant = variants.find(
      (v: Variant) => v.id === variantCookie!.value
    );
  } else {
    chosenVariant = chooseVariant(variants);
  }

  // let incrementRes = await supabase.rpc('increment', {
  //   row_id: chosenVariant.id,
  // });

  // if (incrementRes.error) {
  //   console.error('Error incrementing variant count:', incrementRes.error);
  // }

  supabase
    .rpc('increment', { row_id: chosenVariant.id })
    .then(({ data, error }) => {
      if (error) {
        console.error('Error incrementing variant count:', error);
      } else {
        console.log(data);
      }
    });

  const url = req.nextUrl;
  url.pathname = url.pathname.replace(
    experiment_path,
    `${experiment_path}/${chosenVariant.fileName}`
  );

  const res = NextResponse.rewrite(url);

  if (!cookieID) {
    res.cookies.set('variantID', chosenVariant.id, {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60,
    });
  }

  return res;
}
