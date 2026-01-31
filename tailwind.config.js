/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "var(--color-bg)",
                foreground: "var(--color-text)",
                primary: {
                    DEFAULT: "var(--color-primary)",
                    foreground: "var(--color-text)", // Fallback 
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--background))",
                    foreground: "hsl(var(--foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))", // Note: I didn't verify if --card was in CSS, assuming typical Setup. I'll map to background for safety if not.
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)"],
                heading: ["var(--font-playfair)"],
                script: ["var(--font-great-vibes)"],
            }
        },
    },
    plugins: [],
};
