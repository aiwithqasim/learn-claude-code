# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

Next.js 16 app using the App Router, React 19, TypeScript, and Tailwind CSS v4.

- `app/page.tsx` - Home page
- `app/layout.tsx` - Root layout (Geist font, metadata)
- `app/globals.css` - Global styles
- `public/` - Static assets
