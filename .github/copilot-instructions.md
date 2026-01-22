# Copilot Instructions — Skinstric Clone Project

## Tech Stack
- Framework: Next.js (App Router)
- Styling: Plain CSS (NO Tailwind, NO styled-components)
- Language: TypeScript + React
- Routing: Next.js app directory (app/)

## Core Rules
1. Do NOT use Tailwind CSS.
2. Do NOT introduce new frameworks or libraries unless explicitly requested.
3. Prefer simple, readable code over clever abstractions.
4. Follow existing folder structure — do not restructure routes.
5. Use semantic, human-readable CSS class names (not utility classes).

## CSS Naming Convention
Use descriptive class names based on purpose, not appearance.

Examples:
- layout: app-container, page-content, header, hero-section
- components: form-container, input-field, primary-button
- states: error-text, disabled-button, loading-spinner

Avoid:
- Tailwind-like names (e.g., flex-center, text-xl, bg-black)
- Random abbreviations (e.g., btn1, div2)

## React / Next.js Conventions
- Use functional components only.
- Default export page components.
- Keep components small and focused.
- Prefer local component state (useState) unless global state is required.
- Avoid unnecessary complexity.

## Project Structure
Follow this structure:

app/
  page.tsx            # landing page
  enter/
    page.tsx          # Phase 1 form
  testing/
    page.tsx          # Phase 2 placeholder
  layout.tsx          # global layout
  globals.css         # global styles

lib/
  validation.ts       # input validation helpers
  api.ts              # API helper functions

## UX Requirements
- Forms must validate inputs before submission.
- Buttons must be disabled when actions are invalid.
- Show clear error messages.
- Do not allow navigation forward if validation fails.

## Code Quality
- Prefer explicit logic over magic.
- Avoid deeply nested components.
- Write code that a junior developer could understand.

## When Unsure
If requirements are unclear, choose the simplest implementation that matches existing patterns in the project.
