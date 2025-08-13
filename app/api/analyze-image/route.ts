import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return Response.json(
        { error: 'Image URL is required' }, 
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:3000", // Votre site
        "X-Title": "Dizayn AI", // Nom de votre app
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3.2-11b-vision-instruct:free",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Analyser cette image et créer un prompt détaillé en français pour DALL-E 3 afin de recréer un design similaire. Le prompt doit être descriptif, professionnel et inclure les éléments visuels clés, les couleurs, la composition, le style et l'ambiance. Répondez uniquement avec le prompt, sans introduction ni conclusion."
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": imageUrl
                }
              }
            ]
          }
        ],
        "max_tokens": 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const prompt = data.choices[0]?.message?.content?.trim();

    if (!prompt) {
      throw new Error('Aucun prompt généré');
    }

    return Response.json({ prompt });

  } catch (error) {
    console.error('Erreur analyse image:', error);
    return Response.json(
      { error: 'Erreur lors de l\'analyse de l\'image' }, 
      { status: 500 }
    );
  }
}