/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        'sans': ['system-ui', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'spectra-black': '#000000',
        'spectra-white': '#ffffff',
        'spectra-gray': {
          50: '#f9fafb',
          100: '#f3f4f6',
          300: '#d1d5db',
          400: '#9ca3af',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}