// importing required modules and types from the 'next/server' package
import { NextRequest, NextResponse, userAgent } from 'next/server';

// defining a type for the variant with properties: id, fileName, and weight
type Variant = {
  id: string;
  fileName: string;
  weight: number;
};

// hardcoded configuration for the variants. each variant has an ID, a corresponding file, and a weight
const variantsConfig: Variant[] = [
  {
    id: 'variant1',
    fileName: 'variant1.html',
    weight: 50,
  },
  {
    id: 'variant2',
    fileName: 'variant2.html',
    weight: 30,
  },
  {
    id: 'variant3',
    fileName: 'variant3.html',
    weight: 20,
  },
];

// middleware function that determines which variant to serve based on device type and possibly cookie values
export async function staticMiddleware(req: NextRequest) {
  // extract the device details from the user agent of the request
  const { device } = userAgent(req);

  // determine the device type, whether it's mobile or desktop
  const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';

  // function to choose a variant based on device type and weights of available variants
  function chooseVariant(
    deviceType: 'mobile' | 'desktop',
    variants: Variant[]
  ): Variant {
    // calculate the total weight of all variants
    let totalWeight = variants.reduce((sum, v) => sum + v.weight, 0);

    // generate a random value within the range of the total weight
    let randomValue = Math.random() * totalWeight;

    // loop through variants to find a matching variant based on its weight
    for (const variant of variants) {
      if (randomValue < variant.weight) {
        return variant;
      }
      randomValue -= variant.weight;
    }

    // default to the first variant if no variant is matched
    return variants[0];
  }

  // try to get the variant ID from the cookies. convert it to a string if it exists
  const variantID = req.cookies.get('variantID')?.toString();

  let chosenVariant;

  // if a variant ID exists in the cookies, use it to find the corresponding variant
  if (variantID) {
    chosenVariant =
      variantsConfig.find((v) => v.id === variantID) ||
      chooseVariant(deviceType, variantsConfig); // if not found, choose a new variant based on device type and weights
  } else {
    // if no variant ID in the cookies, choose a variant based on device type and weights
    chosenVariant = chooseVariant(deviceType, variantsConfig);
  }

  // rewrite the request to serve the chosen variant's file
  const res = NextResponse.rewrite(`/${chosenVariant.fileName}`);

  // if the variant ID doesn't exist in the cookies, set it now for future requests
  if (!variantID) {
    res.cookies.set('variantID', chosenVariant.id, {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60, // set the cookie to expire in 10 years
    });
  }

  // return the response with the rewritten URL or any set cookies
  return res;
}
