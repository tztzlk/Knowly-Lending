/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      maxWidth: {
        "content-mobile": "var(--content-max-mobile)",
        "7xl": "80rem",
      },
      fontSize: {
        "responsive-base": "var(--text-base)",
        "responsive-lg": "var(--text-lg)",
        "responsive-xl": "var(--text-xl)",
        "responsive-h1": "var(--heading-1)",
        "responsive-h2": "var(--heading-2)",
        "responsive-h3": "var(--heading-3)",
      },
      minHeight: {
        touch: "3rem", /* 48px */
      },
      colors: {
        // Knowly base: neutral bg/heading/body; primary = startup blue (#5A7FFF → #4F8CFF → #3B82F6)
        ref: {
          bg: "#FDFDFD",
          heading: "#2C3E50",
          body: "#7F8C8D",
          primary: "#3B82F6",
          border: "#EAEAEA",
        },
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#4F8CFF",
          600: "#3b82f6",
          700: "#2563eb",
          800: "#1d4ed8",
          900: "#1e40af",
        },
        neutral: {
          surface: "#fafafa",
          muted: "#f4f4f5",
          border: "#e4e4e7",
          borderLight: "#f4f4f5",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "5rem",
        sectionLg: "6.25rem",
      },
      borderRadius: {
        card: "1rem",
        cardLg: "1.25rem",
        input: "0.75rem",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        cardHover: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        refCard: "0 4px 10px rgba(0, 0, 0, 0.05)",
        subtle: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
      },
      transitionDuration: {
        200: "200ms",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};
