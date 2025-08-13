# Dizayn AI

Dizayn AI est une application web (Next.js) qui génère des visuels à partir d’une image de référence et/ou d’un texte (prompt). Le flux par défaut:
- Analyse de l’image avec un modèle vision (OpenRouter: Llama 3.2 Vision).
- Combinaison du résultat avec votre texte.
- Génération d’image via Hugging Face (FLUX.1-dev). OpenAI (GPT‑4o‑mini / DALL·E 3) est supporté côté serveur dans `server/models/` si vous avez des crédits.

> Page de test: `/dashboard/design/12345`

---

## Fonctionnalités

- Upload d’images locales (drag & drop natif via input file).
- Saisie d’un prompt personnalisé.
- Analyse d’image (vision) pour produire un prompt détaillé.
- Génération d’image à partir du prompt (retour sous forme d’URL data:image).
- Interface type chat (historique messages utilisateur / assistant).
- Affichage du prompt révisé, téléchargement de l’image générée.
- Thème clair/sombre (next-themes, Tailwind CSS v4).

---

## Stack technique

- Framework: Next.js 15 (App Router), React 19, TypeScript
- UI: Tailwind CSS v4, lucide-react
- Thème: next-themes
- IA:
  - Vision (analyse): OpenRouter (Meta Llama 3.2 Vision Instruct – gratuit/limité)
  - Génération d’image: Hugging Face Inference API (black-forest-labs/FLUX.1-dev)
  - Optionnel côté serveur: OpenAI (GPT‑4o‑mini, DALL·E 3)

---

## Arborescence essentielle

```
.
├─ app/
│  ├─ api/
│  │  ├─ analyze-image/route.ts      # Analyse d'image via OpenRouter
│  │  └─ generate-image/route.ts     # Génération d'image via Hugging Face
│  ├─ (root)/
│  │  └─ dashboard/
│  │     └─ design/
│  │        └─ [id]/page.tsx         # Page principale (chat + affichage résultats)
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ DesignInput.tsx                 # Upload image(s) + saisie prompt + submit
│  ├─ Sidebar.tsx
│  ├─ Container.tsx
│  ├─ InputMessage.tsx
│  └─ CreateDesignModal.tsx
├─ server/
│  └─ models/
│     ├─ gpt-4o-mini.ts               # Impl. OpenAI Vision (option)
│     └─ dall-e-3.ts                  # Impl. OpenAI DALL·E 3 (option)
├─ .env                               # Clés API (ne pas committer)
├─ next.config.ts
├─ tsconfig.json
├─ postcss.config.mjs
├─ package.json
└─ README.md
```

---

## Prérequis

- Node.js ≥ 18
- Un compte et une clé pour les services que vous utilisez:
  - OpenRouter (vision – recommandé pour tests gratuits)
  - Hugging Face (génération – requiert une clé)
  - Optionnel: OpenAI (si vous activez les fichiers `server/models/*`)

---

## Configuration des variables d’environnement

Créez un fichier `.env` à la racine:

```env
# Vision via OpenRouter
OPENROUTER_API_KEY="votre_cle_openrouter"

# Génération via Hugging Face
HUGGINGFACE_API_KEY="votre_cle_huggingface"

# Optionnel: OpenAI (utilisé dans server/models/* uniquement)
OPENAI_API_KEY="votre_cle_openai"
```

Notes:
- Ne commitez jamais vos clés. Le `.gitignore` exclut déjà `.env*`.
- Les modèles OpenAI peuvent renvoyer des erreurs 429 si vous n’avez plus de crédits (voir “Dépannage”).

---

## Installation

```bash
# 1) Installer les dépendances
npm install

# 2) Lancer en développement
npm run dev

# Application sur http://localhost:3000
```

Build production:

```bash
npm run build
npm start
```

---

## Utilisation

1. Ouvrez `http://localhost:3000/dashboard/design/12345`
2. Ajoutez une image de référence (depuis votre ordinateur).
3. Rédigez un prompt (optionnel).
4. Envoyez. L’application:
   - Analyse l’image pour produire un prompt détaillé (via `/api/analyze-image`).
   - Combine ce prompt avec votre texte.
   - Génère une image (via `/api/generate-image`).
5. Téléchargez le résultat ou recommencez.

---

## API interne (App Router)

### POST `/api/analyze-image`
- Corps JSON:
  ```json
  { "imageUrl": "data:image/png;base64,..." }
  ```
- Réponse:
  ```json
  { "prompt": "..." }
  ```
- Implémentation: `app/api/analyze-image/route.ts` (OpenRouter)

### POST `/api/generate-image`
- Corps JSON:
  ```json
  { "prompt": "..." }
  ```
- Réponse:
  ```json
  { "imageUrl": "data:image/jpeg;base64,...", "revisedPrompt": "..." }
  ```
- Implémentation: `app/api/generate-image/route.ts` (Hugging Face)
- Détails: la réponse binaire de Hugging Face est transformée en `data:image/*;base64,...` pour un affichage direct dans `<img />`.

---

## Composants clés

### DesignInput
- Fichier: `components/DesignInput.tsx`
- Rôle: sélection d’images (Data URL), saisie du prompt, envoi.
- Props:
  - `onSubmit?: (prompt: string, images: string[]) => void`
  - `placeholder?: string`

### Page de génération
- Fichier: `app/(root)/dashboard/design/[id]/page.tsx`
- Rôle: logique du chat, appels aux API, affichage des images générées, téléchargement.

---

## Personnalisation

- Tailles et ratios: ajuster l’affichage/label dans `DesignInput.tsx` et/ou les options UI.
- Modèle de génération: pour utiliser OpenAI DALL·E 3, adaptez une route API ou branchez `server/models/dall-e-3.ts` dans une route `app/api/...` (requires crédits).
- Modèle vision: de même, vous pouvez remplacer OpenRouter par OpenAI (`server/models/gpt-4o-mini.ts`) si vous avez des crédits.

---

## Dépannage

- Erreur 404/HTML (“<!DOCTYPE … is not valid JSON”):
  - Vérifiez l’existence des routes:  
    - `app/api/analyze-image/route.ts`  
    - `app/api/generate-image/route.ts`
  - Redémarrez `npm run dev` après création/modification des fichiers.

- Erreur 429 (quota dépassé):
  - OpenAI: ajoutez des crédits ou utilisez OpenRouter + Hugging Face comme dans les routes par défaut.
  - Hugging Face: vérifiez votre quota et la disponibilité du modèle.

- L’image ne s’affiche pas:
  - Assurez-vous que `imageUrl` commence par `data:image/...;base64,`.
  - Vérifiez la console serveur pour les codes d’erreur Hugging Face.

---

## Sécurité

- Les clés API sont sensibles. Conservez-les dans `.env` et ne les partagez pas.
- Mettez en place un rate limiting si vous déployez publiquement.
- Filtrez les prompts utilisateur si nécessaire (modération côté serveur).

---

## Roadmap

- Persistance des designs en base (l’URL inclut déjà un `[id]`).
- Historique multi-projets par utilisateur.
- Paramètres avancés de génération (tailles, styles).
- File d’attente et webhooks pour traitements longs.

---

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE`.

---

## Auteurs

- Dizayn AI
