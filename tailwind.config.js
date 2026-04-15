/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#c3c0ff",
        "primary-container": "#4f46e5",
        "on-primary": "#1d00a5",
        "on-primary-container": "#dad7ff",
        secondary: "#4edea3",
        "secondary-container": "#00a572",
        "on-secondary": "#003824",
        tertiary: "#ffb95f",
        "tertiary-container": "#885500",
        "on-tertiary": "#472a00",
        surface: "#0b1326",
        "surface-dim": "#0b1326",
        "surface-container-lowest": "#060e20",
        "surface-container-low": "#131b2e",
        "surface-container": "#171f33",
        "surface-container-high": "#222a3d",
        "surface-container-highest": "#2d3449",
        "surface-bright": "#31394d",
        "on-surface": "#dae2fd",
        "on-surface-variant": "#c7c4d8",
        outline: "#918fa1",
        "outline-variant": "#464555",
        background: "#0b1326",
        error: "#ffb4ab",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        label: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(6,14,32,0.4)',
      },
      backdropBlur: {
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
