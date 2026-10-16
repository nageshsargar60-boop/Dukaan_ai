# DukaanAI Project Instructions

## Project
DukaanAI helps small shop owners create AI-assisted product listings and manage inventory.

## Planned Stack
- Frontend: React and Vite
- Backend: Node.js and Express
- AI: Ollama local model

## Conventions
- Use clear, descriptive names.
- Keep code modular and readable.
- Validate user input.
- Never commit API keys, passwords, or `.env` files.
- Do not claim planned features are implemented unless verified.
- Explain changes in beginner-friendly language.

## Testing
- Run relevant checks before committing changes.
- Document setup commands in README.md.## Product Settings Rules
- Keep product settings UI components in `frontend/src/components/` and validation logic in `frontend/src/validation/`.
- Selling price must be greater than zero. If MRP is provided, it must not be lower than the selling price.
- Stock must be a non-negative integer when inventory tracking is enabled. Invalid product data must never be saved.
- Add or update tests for every validation rule. Run available test, build, and lint commands and report the actual results.

