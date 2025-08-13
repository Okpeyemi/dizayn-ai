import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, customMessage = "", size = "1024x1024", quality = "hd" } = await request.json();
    
    if (!prompt) {
      return Response.json(
        { error: 'Prompt is required' }, 
        { status: 400 }
      );
    }

    // Combine le prompt analysé avec le message personnalisé
    const finalPrompt = customMessage 
      ? `${prompt}\n\nPersonnalisation demandée: ${customMessage}`
      : prompt;

    console.log('Generating image with prompt:', finalPrompt);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${finalPrompt}. Style: professionnel, haute qualité, adapté pour impression.`,
      n: 1,
      size: size as "1024x1024" | "1792x1024" | "1024x1792",
      quality: quality as "standard" | "hd",
      style: "natural"
    });

    console.log('OpenAI response:', JSON.stringify(response, null, 2));

    if (!response.data || response.data.length === 0) {
      console.error('No data in OpenAI response');
      return Response.json(
        { error: 'No image data returned from OpenAI' },
        { status: 500 }
      );
    }

    const imageUrl = response.data[0]?.url;
    const revisedPrompt = response.data[0]?.revised_prompt;

    console.log('Image URL:', imageUrl);
    console.log('Revised prompt:', revisedPrompt);

    if (!imageUrl) {
      console.error('No URL in image data:', response.data[0]);
      return Response.json(
        { error: 'No image URL returned from OpenAI' },
        { status: 500 }
      );
    }

    return Response.json({
      imageUrl,
      revisedPrompt
    });

  } catch (error) {
    console.error('Erreur génération image:', error);
    return Response.json(
      { error: `Erreur lors de la génération de l'image: ${error.message}` }, 
      { status: 500 }
    );
  }
}