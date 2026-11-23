/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ofoq: {
          // 5 Approved Core Colors
          midnight: '#172B46',
          cloud: '#A9C5D8',
          coral: '#D58C7A',
          gold: '#D8BE83',
          porcelain: '#F5F6F3',

          // Derived Accessible Tones
          'midnight-dark': '#0F1E32',
          'midnight-light': '#223B5E',
          'midnight-muted': '#5B6E85',
          'cloud-light': '#DCE8F0',
          'cloud-ultralight': '#EDF4F8',
          'cloud-dark': '#4B728F',
          'coral-hover': '#C27765',
          'coral-dark': '#9E4E3D',
          'coral-soft': '#F8E7E3',
          'gold-dark': '#8C733E',
          'gold-soft': '#FAF4E8',
          'porcelain-pure': '#FFFFFF',
          'porcelain-darker': '#E5E7E0',

          // Functional State Colors
          success: '#2D7A58',
          warning: '#C4841D',
          error: '#BA3C3C',
          info: '#3F7A9E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['IBM Plex Sans Arabic', 'Cairo', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(23, 43, 70, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(23, 43, 70, 0.12)',
        'glass-glow': '0 0 24px 0 rgba(169, 197, 216, 0.4)',
        'glass-coral': '0 8px 24px 0 rgba(213, 140, 122, 0.25)',
      }
    },
  },
  plugins: [],
}
