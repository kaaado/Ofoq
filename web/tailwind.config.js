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
          // Authoritative 6 Core Brand Colors
          midnight: '#172B46',  // Primary: Trust, professionalism & identity
          royal: '#2868C7',     // Secondary: Hope, communication & technology
          cloud: '#A9C5D8',     // Supporting: Calm, accessibility & comfort
          gold: '#D8BE83',      // Accent: Growth, achievement & optimism
          coral: '#D58C7A',     // Human Accent: Warmth, empathy & family connection
          porcelain: '#F5F6F3', // Neutral Canvas

          // Derived Accessible Tones (WCAG 2.1 AA Verified)
          'midnight-dark': '#0F1E32',
          'midnight-deep': '#0A1422',
          'midnight-elevated': '#1A304D',
          'midnight-surface': '#203A5C',
          'midnight-light': '#223B5E',
          'midnight-secondary': '#475A72',
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
          'gold-dark': '#806936',       // 4.85:1 contrast on Porcelain (#F5F6F3)
          'gold-soft': '#FAF4E8',
          'porcelain-pure': '#FFFFFF',
          'porcelain-darker': '#E5E7E0',

          // Functional State Colors (WCAG 2.1 AA Verified)
          success: '#2D7A58',
          'success-soft': '#EBF5F0',
          warning: '#945F0B',           // 5.01:1 contrast on #FDF6E9, 5.40:1 on #FFFFFF
          'warning-soft': '#FDF6E9',
          error: '#BA3C3C',
          'error-soft': '#FBEEEE',
          info: '#2868C7',
          'info-soft': '#E9F1FC',
        }
      },
      fontFamily: {
        sans: ['Lato', 'Poppins', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Lato', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'ofoq-sm': '0.75rem',   // 12px - inputs, chips
        'ofoq-md': '1rem',      // 16px - subcards, buttons
        'ofoq-lg': '1.5rem',    // 24px - standard cards
        'ofoq-xl': '2rem',      // 32px - modals, hero panels
        'ofoq-2xl': '2.5rem',   // 40px - showcase containers
      },
      boxShadow: {
        'glass-sm': '0 4px 16px 0 rgba(23, 43, 70, 0.05)',
        'glass': '0 8px 32px 0 rgba(23, 43, 70, 0.08)',
        'glass-hover': '0 14px 44px 0 rgba(23, 43, 70, 0.12)',
        'glass-lg': '0 20px 48px -8px rgba(23, 43, 70, 0.16)',
        'glass-glow': '0 0 28px 0 rgba(169, 197, 216, 0.35)',
        'glass-royal': '0 12px 36px 0 rgba(40, 104, 199, 0.18)',
        'glass-coral': '0 8px 24px 0 rgba(213, 140, 122, 0.25)',
        'float-soft': '0 16px 36px -12px rgba(23, 43, 70, 0.14)',
        'ambient-navy': '0 0 60px -15px rgba(23, 43, 70, 0.3)',
        'horizon-glow': '0 0 36px 2px rgba(40, 104, 199, 0.22), 0 0 18px 0 rgba(216, 190, 131, 0.25)',
      },
      transitionTimingFunction: {
        'ofoq-calm': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'ofoq-tactile': 'cubic-bezier(0.34, 1.35, 0.64, 1)',
      }
    },
  },
  plugins: [],
}
