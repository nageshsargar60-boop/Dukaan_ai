# DukaanAI

DukaanAI helps small shop owners create product listings and manage inventory with AI.

## What works today

The React frontend includes a **product settings form**. Shop owners can enter name, category, prices, GST, stock, and listing details. The form validates input, shows a live preview, and saves settings in the browser with `localStorage`.

AI listing generation, a product catalog, and the Express backend are **not built yet**.

## Planned Technology Stack

- Frontend: React and Vite
- Backend: Node.js and Express
- AI: Ollama local model

## Getting Started

You need [Node.js](https://nodejs.org/) (LTS) installed.

```bash
git clone https://github.com/nageshsargar60-boop/Dukaan_ai.git
cd Dukaan_ai/frontend
npm install
npm run dev
```

Then open the local URL printed in the terminal (usually `http://localhost:5173`).

Useful commands from `frontend/`:

```bash
npm run test    # validation checks
npm run build   # production build
npm run lint    # lint the frontend
```

## License

This project is under the MIT License. See the `LICENSE` file for details.
