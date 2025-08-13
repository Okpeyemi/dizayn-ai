# Dizayn AI 🎨🤖

[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149eca?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![OpenRouter](https://img.shields.io/badge/Vision-OpenRouter-0b6a99)](https://openrouter.ai)
[![Hugging Face](https://img.shields.io/badge/Image%20Gen-Hugging%20Face-f0bf1a?logo=huggingface)](https://huggingface.co)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Dizayn AI est une application web Next.js qui génère des visuels à partir d’une image de référence et/ou d’un texte (prompt). Elle combine:
- Analyse d’image via un modèle de vision (OpenRouter: Llama 3.2 Vision)
- Fusion avec votre prompt texte
- Génération d’images via Hugging Face (FLUX.1-dev)

Page de test locale: http://localhost:3000/dashboard/design/12345

---

## Sommaire 📚

- [Aperçu](#aperçu-)
- [Fonctionnalités](#fonctionnalités-)
- [Stack technique](#stack-technique-)
- [Prérequis](#prérequis-)
- [Installation](#installation-)
- [Configuration (env)](#configuration-env-)
- [Lancer le projet](#lancer-le-projet-)
- [Scripts NPM](#scripts-npm-)
- [API Routes](#api-routes-)
- [Arborescence](#arborescence-)
- [Composants clés](#composants-clés-)
- [Flux fonctionnel](#flux-fonctionnel-)
- [Qualité & conventions](#qualité--conventions-)
- [FAQ](#faq-)
- [Roadmap](#roadmap-)
- [Contribuer](#contribuer-)
- [Licence](#licence-)
- [Auteur](#auteur-)

---

## Aperçu 👀

- Téléversez une image (drag & drop) et/ou saisissez un prompt.
- L’app analyse l’image pour produire un prompt détaillé en français.
- Elle combine ce prompt avec votre demande personnalisée.
- Elle génère ensuite une image finale via l’API Inference de Hugging Face.
- Interface type “chat” avec historique, prévisualisation et téléchargement. ✨

---

## Fonctionnalités ✨

- 🖼️ Upload d’images locales
- 🧠 Analyse d’image (vision) → prompt détaillé
- 📝 Fusion du prompt vision + votre prompt
- 🧩 Génération d’image (data URL base64)
- 💬 Interface chat (messages user/assistant)
- 🌙 Thème clair/sombre (next-themes)
- ⚡ Dev rapide avec Turbopack
- 🎨 Tailwind CSS v4 + animations (tw-animate-css)

---

## Stack technique 🧰

- Framework: Next.js 15 (App Router)
- Langage: TypeScript 5
- UI: React 19, Tailwind CSS v4, lucide-react
- Thème: next-themes
- IA:
  - Vision: OpenRouter (Meta Llama 3.2 Vision Instruct Free)
  - Génération: Hugging Face Inference API (black-forest-labs/FLUX.1-dev)
- Outils: tailwind-merge, clsx, class-variance-authority

---

## Prérequis ✅

- Node.js ≥ 18 (20 recommandé)
- Comptes/Clés API nécessaires selon vos besoins:
  - OpenRouter (analyse d’image)
  - Hugging Face (génération d’image)

---

## Installation 🛠️

```bash
git clone https://github.com/Okpeyemi/dizayn-ai.git
cd dizayn-ai
npm ci # ou: npm install
```

---

## Configuration (env) 🔐

Créez un fichier `.env.local` à la racine:

```bash
touch .env.local
```

Renseignez les variables:
```bash
# Analyse d'image via OpenRouter
OPENROUTER_API_KEY=...

# Génération d'image via Hugging Face
HUGGINGFACE_API_KEY=...

# Optionnel si vous ajoutez l'intégration OpenAI côté serveur
# OPENAI_API_KEY=...
```

Notes:
- Ne committez jamais `.env.local`.
- Les API de vision/génération peuvent être coûteuses et/ou limitées. Surveillez vos quotas. 📈

---

## Lancer le projet ▶️

Développement:
```bash
npm run dev
# http://localhost:3000
```

Build + production locale:
```bash
npm run build
npm start
# http://localhost:3000
```

---

## Scripts NPM 📜

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

- ▶️ dev: serveur de dev (Turbopack)
- 🏗️ build: build production
- 🚀 start: serveur en production
- 🧹 lint: ESLint (Next + TS)

---

## API Routes 🔌

- POST /api/analyze-image
  - Body: { "imageUrl": "https://..." }
  - Réponse: { "prompt": "..." }
  - Utilise OpenRouter (Llama 3.2 Vision Instruct Free)

Exemple cURL:
```bash
curl -X POST http://localhost:3000/api/analyze-image \
  -H "Content-Type: application/json" \
  -d '{"imageUrl":"https://exemple.com/image.jpg"}'
```

- POST /api/generate-image
  - Body: { "prompt": "..." }
  - Réponse: { "imageUrl": "data:image/jpeg;base64,...", "revisedPrompt": "..." }
  - Utilise Hugging Face (FLUX.1-dev)

Exemple cURL:
```bash
curl -X POST http://localhost:3000/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Affiche minimaliste, couleurs pastel..."}'
```

Gestion d’erreurs:
- 400 si paramètres manquants
- 500 si erreur API distante (OpenRouter/HF)

---

## Arborescence 🌳

Aperçu des principaux fichiers et dossiers:

```
.
├─ app/
│  ├─ api/
│  │  ├─ analyze-image/route.ts    # 🔍 Analyse d'image (OpenRouter)
│  │  └─ generate-image/route.ts   # 🖼️ Génération d'image (Hugging Face)
│  ├─ (root)/
│  │  └─ dashboard/
│  │     ├─ layout.tsx
│  │     ├─ page.tsx
│  │     └─ design/[id]/page.tsx   # 💬 Page principale (chat + résultats)
│  ├─ layout.tsx                    # 🌐 Root layout (fonts, ThemeProvider)
│  ├─ page.tsx                      # Page d'accueil template Next
│  └─ globals.css                   # 🎨 Thème + Tailwind v4
├─ components/
│  ├─ Container.tsx
│  ├─ Sidebar.tsx
│  ├─ DesignInput.tsx               # Upload + prompt + submit
│  ├─ InputMessage.tsx
│  └─ theme-provider.tsx            # Dark/Light mode (next-themes)
├─ next.config.ts
├─ postcss.config.mjs               # @tailwindcss/postcss
├─ tsconfig.json                    # paths: "@/*" -> "./*"
├─ package.json
├─ package-lock.json
├─ LICENSE
└─ README.md
```

---

## Composants clés 🧩

- DesignInput: gestion du prompt et de l’upload (drag & drop via react-dropzone) 📥
- Sidebar: navigation latérale 🧭
- Container: layout de contenu 📦
- InputMessage: saisie style messagerie 💬
- ThemeProvider: mode sombre/clair (next-themes) 🌗

---

## Flux fonctionnel 🔄

1) L’utilisateur importe une image et/ou saisit un prompt.
2) Si image fournie:
   - Appelle /api/analyze-image → produit un prompt détaillé (FR) 🧠
3) Le prompt final = prompt vision ± prompt utilisateur.
4) Appelle /api/generate-image avec ce prompt → retourne une image base64 🖼️
5) L’historique (type chat) affiche messages, prompts et image générée. 🧵

---

## Qualité & conventions 🧹

- TypeScript strict ✅
- ESLint (Next + TS) → `npm run lint`
- Tailwind CSS v4 via PostCSS
- Aliases TS: `@/*` → import propres
- Fonts Google (Rakkas, DM Sans) intégrées via `next/font`

Bonnes pratiques:
- Ne stockez pas d’API keys côté client.
- Gérez les erreurs réseau (timeouts, rate limits).
- Ajoutez des tests unitaires/e2e pour les routes API. ✅

---

## FAQ ❓

- Quelle version de Node ?
  - Node 18+ (20 recommandé)
- Peut-on utiliser Yarn/pnpm ?
  - Le repo fournit un package-lock.json: npm est recommandé pour la cohérence.
- Pourquoi l’image renvoyée est un data URL base64 ?
  - Simplicité d’affichage/téléchargement. Vous pouvez ensuite stocker ailleurs (S3, Supabase Storage…) si besoin.

---

## Roadmap 🗺️

- [ ] ♻️ Mise en file et statut de génération (loading, retries)
- [ ] 🧪 Tests (unitaires et e2e)
- [ ] 💾 Persistance (historique, projets)
- [ ] 🧑‍🎨 Paramètres de génération (steps, seed, style presets)
- [ ] 🔐 Auth + quotas
- [ ] 📦 Export (PNG/JPEG/WebP, dimensions)
- [ ] 📈 Observabilité (logs, métriques)

---

## Contribuer 🤝

Les contributions sont les bienvenues !

1. Fork 🍴
2. Branche: `git checkout -b feat/ma-fonctionnalite` 🌱
3. Commit: `git commit -m "feat: ajoute ma fonctionnalité"` 💬
4. Push: `git push origin feat/ma-fonctionnalite` ⤴️
5. PR: ouvrez une Pull Request 🔄

---

## Licence 📄

MIT – voir [LICENSE](./LICENSE).

---

## Auteur 👤

- GitHub: [@Okpeyemi](https://github.com/Okpeyemi)
