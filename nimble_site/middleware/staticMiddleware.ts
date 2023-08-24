import { NextRequest, NextResponse, userAgent } from 'next/server';

type Variant = {
  id: string;
  fileName: string;
  weight: number;
};

// hardcoded configuration for variants
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

export async function staticMiddleware(req: NextRequest) {
  const { device } = userAgent(req);
  const deviceType = device.type === 'mobile' ? 'mobile' : 'desktop';

  function chooseVariant(
    deviceType: 'mobile' | 'desktop',
    variants: Variant[]
  ): Variant {
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

  const variantID = req.cookies.get('variantID')?.toString();
  let chosenVariant;

  if (variantID) {
    chosenVariant =
      variantsConfig.find((v) => v.id === variantID) ||
      chooseVariant(deviceType, variantsConfig);
  } else {
    chosenVariant = chooseVariant(deviceType, variantsConfig);
  }

  const res = NextResponse.rewrite(`/${chosenVariant.fileName}`);
  if (!variantID) {
    res.cookies.set('variantID', chosenVariant.id, {
      path: '/',
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60,
    });
  }
  return res;
}
