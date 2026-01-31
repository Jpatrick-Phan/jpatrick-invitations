# System Architecture

## 1. Tech Stack
-  **Core**: Next.js 14+ (App Router).
-  **Language**: JavaScript (ES6+).
-  **Styling**: CSS Modules (`.module.css`) + Global CSS Variables (Theming).
-  **State Management**: React `useState` / `useContext` (for global states like Music Player).
-  **Icons**: `lucide-react` (Lightweight SVG icons).
-  **Fonts**: `next/font` (Google Fonts: Playfair Display, Great Vibes, Inter).

## 2. Directory Structure
```
/
├── app/
│   ├── layout.js       # Root Layout (Music Player defined here to persist)
│   ├── page.js         # Main Entry (Wedding Theme Default)
│   ├── graduation/     # Route for Graduation Theme Demo
│   │   └── page.js
│   └── globals.css     # Global Styles (Reset + Variables)
├── components/
│   ├── ui/             # Reusable basic atoms (Button, Input, Modal)
│   ├── sections/       # Major page sections (Hero, Story, Gallery, RSVP)
│   │   ├── Hero.js
│   │   ├── EventTime.js
│   │   └── ...
│   └── icons/          # Custom SVGs if needed
├── lib/
│   ├── data.js         # Static data content (Mock DB)
│   └── utils.js        # Helper functions (Time formatting)
├── public/
│   ├── images/         # Optimized assets
│   └── music/          # Audio files
└── project_context/    # Documentation (THIS FOLDER)
```

## 3. Data Strategy
-  **Content Separatation**: All text/images should be pulled from a JSON/Object structure (in `lib/data.js`). This makes switching from "Wedding" to "Graduation" easy by just swapping the data object passed to components.

## 4. Theming Strategy
-  Use CSS Variables in `globals.css` for easy theme switching.
```css
:root {
  /* Default (Wedding) */
  --color-primary: #d4a373;
  --color-bg: #fefae0;
  --font-heading: 'Great Vibes', cursive;
}

[data-theme='graduation'] {
  --color-primary: #2d6a4f;
  --color-bg: #ffffff;
  --font-heading: 'Cinzel', serif;
}
```
