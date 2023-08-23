import { createClient } from '@supabase/supabase-js';

// initialize Supabase client
const supabaseUrl = 'https://tawrifvzyjqcddwuqjyq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhd3JpZnZ6eWpxY2Rkd3VxanlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2NTc2MjcsImV4cCI6MjAwODIzMzYyN30.-VekGbd6Iwey0Q32SQA0RxowZtqSlDptBhlt2r-GZBw';
const supabase = createClient(supabaseUrl, supabaseKey);

type Platform = 'mobile' | 'desktop' | 'other';

type Variant = {
  id: string;
  fileName: string;
  weight: number;
};

// function to determine user platform based on User-Agent string
function determinePlatform(userAgent: string): Platform {
  if (userAgent.match(/mobile/i)) {
    return 'mobile';
  } else if (userAgent.match(/desktop/i)) {
    return 'desktop';
  }
  return 'other';
}

// middleware function to handle decisioning
export async function abDecisioningMiddleware(req, res) {
  const userAgent = req.headers['user-agent'];
  const deviceType = determinePlatform(userAgent);

  // fetch variants from Supabase
  // the result will contain an array of variants and any potential fetchError
  const { data: variants, error: fetchError } = await supabase
    .from<Variant>('variants')
    .select('*');

  if (fetchError) {
    console.error('Error fetching variants from Supabase:', fetchError);
    res.status(500).send('Internal Server Error');
    return;
  }

  // logic to select a variant based on weight
  function chooseVariant(deviceType: Platform, variants: Variant[]): Variant {
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
  const variantID = req.cookies['variantID'];

  let chosenVariant;

  if (variantID) {
    // if cookie exists, select the variant based on ID
    chosenVariant = variants.find((v) => v.id === variantID);
  } else {
    // if no cookie, select based on weight & device type
    chosenVariant = chooseVariant(deviceType, variants);
    // set the cookie
    res.setHeader(
      'Set-Cookie',
      `variantID=${chosenVariant.id}; Max-Age=3600; Path=/; HttpOnly`
    );
  }

  // increment count for the chosen variant in Supabase
  const { data, error } = await supabase
    .from('variants')
    .update({ times_called: 1 })
    .eq('id', chosenVariant.id);

  // will log an error if update fails
  if (error) {
    console.error('Error updating Supabase:', error);
  }

  // serve the selected variant to the user
  res.sendFile(chosenVariant.fileName);
}
