# System Architecture

## 1. Tech Stack
-  **Core**: Next.js 14+ (App Router).
-  **Language**: JavaScript (ES6+).
-  **Styling**: Tailwind CSS v4 + Shadcn UI (Radix Primitives).
-  **State Management**: React `useState` / `useContext` (Music Player).
-  **Icons**: `lucide-react`.
-  **Fonts**: `next/font` (Inter, Playfair Display, Great Vibes).
-  **Notifications**: `sonner` (Toast).

## 2. Directory Structure
```
/
├── app/
│   ├── layout.js       # Root Layout (Music Player, Toaster)
│   ├── page.js         # Landing Page (List of Events)
│   ├── [slug]/         # Dynamic Route for Cards (Wedding/Graduation/etc)
│   ├── admin/          # Admin Dashboard & Builder
│   ├── api/            # API Routes (Data, Upload, Auth)
│   └── globals.css     # Global Styles (HSL Variables)
├── components/
│   ├── ui/             # Shadcn Components (Button, Card, Dialog, etc.)
│   ├── admin/          # Admin-specific Components (MediaLibrary, SectionEditor)
│   └── sections/       # Public-facing Sections (Hero, Story, Gallery, RSVP)
├── data/               # JSON Storage for Cards (wedding.json, graduation.json)
├── lib/
│   └── cardService.js  # File System CRUD operations
├── public/
│   └── uploads/        # User uploaded media
└── project_context/    # Documentation
```

## 3. Data Strategy
-  **JSON Storage**: Each event is stored as a separate JSON file in `data/{id}.json`.
-  **Schema**: Flexible JSON structure containing configuration (theme, colors) and content sections (hero, story, etc.).
-  **CRUD**: `cardService.js` manages file reading/writing safely.

## 4. Theming Strategy
-  **Dynamic HSL Variables**: `globals.css` defines base themes using HSL.
-  **Tailwind Integration**: `tailwind.config.js` maps `primary`, `secondary`, etc. to these CSS variables (`var(--color-primary)`).
-  **Runtime Switching**: The Admin panel updates the `theme` property, which applies a `data-theme` attribute for instant style switching.
```
