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
          // Refined 5 Core Brand Colors + Porcelain Canvas
          midnight: '#172B46', // Primary: Trust, professionalism & identity
          royal: '#2868C7',    // Secondary: Hope, communication & technology
          cloud: '#A9C5D8',    // Supporting: Calm, accessibility & comfort
          gold: '#D8BE83',     // Accent: Growth, achievement & optimism
          coral: '#D58C7A',    // Human Accent: Warmth, empathy & family connection
          porcelain: '#F5F6F3', // Neutral Canvas

          // Derived Accessible Tones
          'midnight-dark': '#0F1E32',
          'midnight-light': '#223B5E',
          'midnight-muted': '#5B6E85',
          'royal-hover': '#1E54A3',
          'royal-dark': '#153C78',
          'royal-light': '#4A85DD',
          'royal-soft': '#E9F1FC',
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
          info: '#2868C7',
        }
      },
      fontFamily: {
        sans: ['Lato', 'Poppins', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Lato', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
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
