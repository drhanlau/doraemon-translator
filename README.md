# Doraemon Translator

A fun Gen Z slang translator powered by OpenAI GPT-4o-mini, featuring a delightful Doraemon-themed interface.

## Features

- 🤖 AI-powered translation using OpenAI GPT-4o-mini
- 🎨 Beautiful Doraemon-themed UI with toast bread styling
- 🔄 Animated Doraemon that rotates during translation
- 📱 Responsive design for mobile and desktop
- 🎯 HTML-formatted output with proper spacing

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Run `npm install`
4. Run `npm run dev`

## Deployment to Netlify

### Method 1: Connect GitHub Repository
1. Push your code to GitHub (API key is now secure in environment variables)
2. Connect your GitHub repository to Netlify
3. Add environment variable in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add `VITE_OPENAI_API_KEY` with your OpenAI API key
4. Deploy!

### Method 2: Manual Deploy
1. Run `npm run build`
2. Upload the `dist` folder to Netlify
3. Add environment variable `VITE_OPENAI_API_KEY` in Netlify dashboard

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key (required)

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- OpenAI API
- Lucide React Icons
