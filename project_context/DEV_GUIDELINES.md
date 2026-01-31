# Developer Guidelines & Rules

## 1. Coding Standards
-  **Descriptive Naming**: Components should be named explicitly (e.g., `WeddingHeroSection.js` is better than `Hero.js` if we have multiple).
-  **Clean Code**: Remove unused imports and console logs before committing.
-  **Comments**: Comment complex logic, specifically animation calculations.

## 2. CSS Rules
-  **CSS Modules**: ALWAYS use CSS Modules (`styles.module.css`) for component styling to avoid global clashes.
-  **Avoid !important**: Solve specificity issues with better selectors.
-  **Flexbox/Grid**: Use Flexbox for 1D layouts, Grid for 2D layouts.
-  **Mobile Responsive**: Write media queries using `min-width` (mobile-first approach).
    ```css
    .container {
        padding: 1rem; /* Mobile */
    }
    @media (min-width: 768px) {
        .container {
            padding: 2rem; /* Tablet/Desktop */
        }
    }
    ```

## 3. Next.js Best Practices
-  **Image Component**: Always use `next/image` for assets to ensure optimization.
-  **Server Components**: By default, keep components Server Components unless `useState/useEffect` is needed (then add `'use client'`).
-  **Fonts**: Use `next/font` variable loading to prevent Layout Shift (CLS).

## 4. Workflows
-  **Check-in**: Before marking a task done, check it against `REQUIREMENTS.md` and `DESIGN_SYSTEM.md`.
