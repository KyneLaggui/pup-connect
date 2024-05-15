/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    fontSize: {
      icon: "1rem",
      logo: "1.25rem",
      xs: "0.694rem",
      sm: "0.833rem",
      base: "1rem",
      lg: "1.2rem",
      xl: "1.44rem",
      "2xl": "1.728rem",
      "3xl": "2.074rem",
      "4xl": "2.488rem",
      "5xl": "2.986rem",
    },
    container: {
      center: true,
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        // Main colors
        background: "var(--neutral-white-50)",
        foreground: "var(--obsidian-950)",

        // Other colors
        border: "var(--neutral-white-200)",
        input: {
          DEFAULT: "var(--neutral-white-50)",
          foreground: "var(--obsidian-950)",
          border: "var(--neutral-white-200)",
          placeholder: "var(--obsidian-400)",
          ring: "var(--blue-600)",
        },
        ring: "var(--blue-600)",

        // Hierarchical colors
        primary: {
          DEFAULT: "var(--blue-600)",
          foreground: "var(--blue-50)",
          border: "var(--blue-600)",
          hover: "var(--blue-500)",
        },
        secondary: {
          DEFAULT: "var(--blue-50)",
          foreground: "var(--blue-900)",
          border: {
            DEFAULT: "var(--blue-500)",
            alt: "var(--blue-100)",
          },
          hover: "var(--blue-100)",
        },
        tertiary: {
          DEFAULT: "var(--neutral-white-50)",
          foreground: "var(--obsidian-950)",
          border: "var(--neutral-white-50)",
          hover: "var(--neutral-white-100)",
        },
        neutral: {
          DEFAULT: "var(--obsidian-50)",
          foreground: "var(--obsidian-700)",
          border: "var(--obsidian-100)",
          hover: "var(--obsidian-100)",
        },
        destructive: {
          DEFAULT: "var(--red-500)",
          foreground: "var(--neutral-white-50)",
          border: "var(--red-500)",
          hover: "var(--red-400)",
        },
        muted: {
          DEFAULT: "var(--neutral-white-200)",
          foreground: "var(--neutral-white-500)",
          border: "var(--neutral-white-200)",
          hover: "var(--neutral-white-200)",
        },
        accent: {
          DEFAULT: "var(--blue-100)",
          foreground: "var(--blue-800)",
          border: "var(--blue-400)",
          hover: "var(--blue-200)",
        },
        popover: {
          DEFAULT: "var(--neutral-white-50)",
          foreground: "var(--obsidian-950)",
        },
        card: {
          DEFAULT: "var(--neutral-white-100)",
          foreground: "var(--obsidian-950)",
        },
        tag: {
          DEFAULT: "var(--blue-50)",
          foreground: "var(--blue-900)",
          border: "var(--blue-100)",
          hover: "var(--blue-200)",
        },
        checkbox: {
          border: "var(--obsidian-200)",
          text: "var(--obsidian-600)",
        },
        accordion: {
          DEFAULT: "var(--blue-800)",
        },
        buttonBorder: {
          DEFAULT: "var(--neutral-white-300)",
        },
        drawer: {
          icon: "var(--neutral-white-600)",
        },
        forms: {
          label: "var(--obsidian-800)",
          file: "var(--neutral-white-500)",
          placeholder: "var(--obsidian-500)",
        },
        forgotPassword: "var(--purple-50)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
