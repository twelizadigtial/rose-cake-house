/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: "#F857A6",
          soft: "#FDE8F2",
          rose: "#F9D6E5",
          deep: "#E03C8A",
          light: "#FFF0F6"
        },
        cream: "#FFF9FB",
        dark: "#1A1A1A",
        graytext: "#666666",
        gold: "#D4AF37",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'soft-pink': '0 10px 30px -5px rgba(248, 87, 166, 0.25)',
        'luxury': '0 20px 40px -15px rgba(26, 26, 26, 0.08)',
        'glass': '0 8px 32px 0 rgba(248, 87, 166, 0.12)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
