module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './stories/**/*.{js,jsx,ts,tsx,vue}',
    './styleguide/components/**/*.{js,jsx,ts,tsx,vue}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      heading: ['Poppins', 'Helvetica', 'Arial', 'sans-serif'],
      body: ['Nunito', 'Helvetica', 'Arial', 'sans-serif'],
      timer: ['Montserrat', 'sans-serif'],
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '1024px',
      xl: '1366px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    fontSize: {
      xs: '.75rem', // 12px
      sm: '.875rem', // 14px
      base: '1rem', // 16px
      lead: '1.313rem', // 21px
      md: '1.4375rem', // 23px
      lg: '1.875rem', // 30px
      xl: '2.3125rem', // 37px
      '2xl': '2.875rem', // 46px
      '3xl': '3.375rem', // 54px
    },
    extend: {
      colors: {
        success: '#61B45B',
        error: '#BF2C44',
        celeste: '#EDF2FB',
        'light-indigo': '#638FEF',
        'dark-indigo': '#4f46e5',
        'dark-blue': '#182532',
        'darker-blue': '#131E28',
        'light-gray': '#E7E8EA',
        'dark-gray': '#747C84',
        'dark-gray-20': 'rgba(116,124,132,0.2)',
        'darker-gray': '#333B44',
        'lighter-white': '#F9F9F9',
        'light-white': '#F4F5F7',
        'dark-black': '#1C1D1F',
        'darker-black': '#131415',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
