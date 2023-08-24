import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse, userAgent } from 'next/server';

// initialize Supabase client
const supabaseUrl = 'https://tawrifvzyjqcddwuqjyq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhd3JpZnZ6eWpxY2Rkd3VxanlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2NTc2MjcsImV4cCI6MjAwODIzMzYyN30.-VekGbd6Iwey0Q32SQA0RxowZtqSlDptBhlt2r-GZBw';
const supabase = createClient(supabaseUrl, supabaseKey);

type Variant = {
  id: string;
  fileName: string;
  weight: number;
};

// middleware function to handle decisioning
export async function dynamicMiddleware(req: NextRequest) {
  // <-- changed the determination of userAgent per https://edge-user-agent-based-rendering.vercel.app/
  // parse user agent
  const { device } = userAgent(req);
  // check the deviceType
  const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';

  // fetch variants from Supabase
  const result = await supabase.from('variants').select('*');

  if (result.error || !result.data) {
    console.error('Error fetching variants from Supabase:', result.error);
    // changed below to comply w/ next syntax
    return new NextResponse('Internal Server Error', {
      status: 500,
    });
  }

  // the result will contain an array of variants
  const variants = result.data;

  // logic to select a variant based on weight
  function chooseVariant(
    deviceType: 'mobile' | 'desktop',
    variants: Variant[]
  ): Variant {
    // sum all weights
    let totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);
    // generate random value to select variant
    let randomValue = Math.random() * totalWeight;

    for (const variant of variants) {
      if (randomValue < variant.weight) {
        return variant;
      }
      randomValue -= variant.weight;
    }

    // default to the first variant if none match
    return variants[0];
  }

  // check for existing cookie
  const variantID = req.cookies.get('variantID');

  let chosenVariant;

  if (variantID) {
    // if cookie exists, select the variant based on ID
    chosenVariant = variants.find((v) => v.id === variantID);
  } else {
    // if no cookie, select based on weight & device type
    chosenVariant = chooseVariant(deviceType, variants);
  }

  // increment count for the chosen variant in Supabase
  // increment function is defined in Functions under Database in supabase per https://www.youtube.com/watch?v=n5j_mrSmpyc
  const { data, error } = await supabase.rpc('increment', {
    row_id: chosenVariant.id,
  });

  // will log an error if update fails
  // changed below to comply with next syntax
  const res = NextResponse.rewrite(`/${chosenVariant.fileName}`);

  if (!variantID) {
    // changed below to comply with next syntax
    res.cookies.set('variantID', chosenVariant.id, {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60, //set it to 10 years
    });
  }

  return res;
}
