import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return Response.json(
        { error: 'Image URL is required' }, 
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyser cette image et créer un prompt détaillé en français pour DALL-E 3 afin de recréer un design similaire. Le prompt doit être descriptif, professionnel et inclure les éléments visuels clés, les couleurs, la composition, le style et l'ambiance. Répondez uniquement avec le prompt, sans introduction ni conclusion."
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });

    const prompt = response.choices[0]?.message?.content?.trim();

    if (!prompt) {
      throw new Error('Aucun prompt généré');
    }

    // return Response.json({ prompt });
    console.log(Response.json({ prompt }))

  } catch (error) {
    console.error('Erreur analyse image:', error);
    return Response.json(
      { error: 'Erreur lors de l\'analyse de l\'image' }, 
      { status: 500 }
    );
  }
}