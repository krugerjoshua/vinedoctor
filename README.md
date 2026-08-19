# 🍇 VineDoctor

An AI-powered vineyard plant diagnosis app. Take a photo of a sick vine and get an instant diagnosis, treatment recommendations, and where to buy the products.

## What it does

- Upload or drag and drop a photo of a vine leaf, stem, or cluster
- AI analyses the photo and identifies the disease or condition
- Returns severity level, symptoms, treatment products, and action steps
- Keeps a history of previous scans during the session

## Built with

- React + Vite
- Redux Toolkit
- OpenRouter API (Nvidia Nemotron vision model)

## Running locally

Clone the repo and install dependencies:

```bash
npm install
```

Create a `.env` file in the root of the project:

```
VITE_OPENROUTER_API_KEY=your_key_here
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Getting an API key

Sign up for a free account at [openrouter.ai](https://openrouter.ai), go to **Keys** and create a new key.

## Disclaimer

VineDoctor is a diagnostic aid only. Always confirm serious conditions with a licensed agronomist before applying any chemical treatments.