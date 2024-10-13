import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-untitledsans)", ...fontFamily.sans],
        serif: ["var(--font-untitledserif)", ...fontFamily.serif],
        mono: ["var(--soehne-mono)", ...fontFamily.mono],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },

        /* Apart defined custom colors and styles */
        brand: {
          primary: "hsl(var(--brand-primary))",
          contrast: "hsl(var(--brand-contrast))",
        },
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "subtle-drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, 10px)" },
          "50%": { transform: "translate(0, 20px)" },
          "75%": { transform: "translate(-10px, 10px)" },
        },
        appear: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        disappear: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "gradient-move": {
          "0%": {
            x1: "17.7549",
            y1: "17",
            x2: "39.2549",
            y2: "36.5",
          },
          "25%": {
            x1: "20",
            y1: "40",
            x2: "60",
            y2: "20",
          },
          "50%": {
            x1: "50",
            y1: "10",
            x2: "30",
            y2: "60",
          },
          "75%": {
            x1: "10",
            y1: "50",
            x2: "60",
            y2: "10",
          },
          "100%": {
            x1: "100",
            y1: "100",
            x2: "100",
            y2: "100",
          },
        },
      },
      animation: {
        "subtle-drift": "subtle-drift 30s linear infinite",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        appear: "appear 0.3s ease-in-out forwards",
        disappear: "disappear 0.3s ease-in-out forwards",
        "gradient-move": "gradient-move 0.2s linear infinite",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
