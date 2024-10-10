import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const MODEL_NAME = "andreasjansson/blip-2:f677695e5e89f8b236e52ecd1d3f01beb44c34606419bcc19345e046d8f786f9";

async function generateCaption(image: Blob): Promise<string> {
  const output = await replicate.run(MODEL_NAME, {
    input: {
      image,
      caption: true,
      temperature: 1,
      use_nucleus_sampling: false,
    },
  });

  if (typeof output === 'string') {
    return output;
  } else {
    throw new Error('Unexpected response format from Replicate API');
  }
}
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');

    if (!imageFile || !(imageFile instanceof Blob)) {
      return NextResponse.json({ error: "No valid image provided" }, { status: 400 });
    }

    const caption = await generateCaption(imageFile);
    return NextResponse.json({ caption });
  } catch (error) {
    console.error("Error generating caption:", error);
    return NextResponse.json({ error: "Failed to generate caption" }, { status: 500 });
  }
}
