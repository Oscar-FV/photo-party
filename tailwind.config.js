/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern:
        /.*-(neutral|primary|secondary|accent|info|success|warning|error|ghost|outline|wide|circle|link|xs|sm)/,
    },
  ],
  theme: {
    extend: {
      backgroundColor: "#1C1C1C",
      textColor: "#FFFFFF",
      colors: {
        primary: {
          50: "#FFF1F0",
          100: "#FFE3E0",
          200: "#FFC7C2",
          300: "#FFA69E",
          400: "#FF8A80",
          500: "#FF6F61",
          600: "#FF2D1A",
          700: "#D61200",
          800: "#8F0C00",
          900: "#4D0600",
          950: "#290300",
        },
        secondary: {
          50: "#ECF6FE",
          100: "#D8ECFD",
          200: "#B2DAFB",
          300: "#90CAF9",
          400: "#69B7F7",
          500: "#42A5F5",
          600: "#0D88ED",
          700: "#0A67B3",
          800: "#064579",
          900: "#03243F",
          950: "#021322",
        },
        accent: {
          50: "#FFFBF0",
          100: "#FFF7DB",
          200: "#FFEEB8",
          300: "#FFE694",
          400: "#FFDE70",
          500: "#FFD54F",
          600: "#FFC70F",
          700: "#CC9C00",
          800: "#8A6A00",
          900: "#473700",
          950: "#241B00",
        },
        neutral: {
          50: "#E8E8E8",
          100: "#D1D1D1",
          200: "#A3A3A3",
          300: "#787878",
          400: "#4A4A4A",
          500: "#1C1C1C",
          600: "#171717",
          700: "#121212",
          800: "#0D0D0D",
          900: "#080808",
          950: "#050505",
        },
        card: "#C44FFF"
      },
      backgroundImage: {
        "gradient-text":
          'linear-gradient(270deg, theme("colors.primary.500"), theme("colors.accent.500"), theme("colors.secondary.500"), theme("colors.accent.500"), theme("colors.primary.500"), theme("colors.accent.500"), theme("colors.secondary.500"))',
      },
      backgroundSize: {
        300: "300% 300%",
      },
      keyframes: {
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        gradient: "gradient 4s linear infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        photoParty: {
          primary: "#FF6F61",

          "primary-content": "#ffffff",

          secondary: "#42a5f5",

          "secondary-content": "#ffffff",

          accent: "#ffd54f",

          "accent-content": "#161002",

          neutral: "#1c1c1c",

          "neutral-content": "#cccccc",

          "base-100": "#121212",

          "base-200": "#0e0e0e",

          "base-300": "#0a0a0a",

          "base-content": "#ffffff",

          info: "#5ae0ff",

          "info-content": "#031216",

          success: "#00c853",

          "success-content": "#ffffff",

          warning: "#ffab40",

          "warning-content": "#031216",

          error: "#e53935",

          "error-content": "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
