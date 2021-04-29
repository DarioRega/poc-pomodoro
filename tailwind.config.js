module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{js,jsx,ts,tsx,vue}',
    './stories/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        success: '#61B45B',
        error: '#BF2C44',
        celeste: '#D4DFF6',
        'light-indigo': '#638FEF',
        'dark-indigo': '#4f46e5',
        'dark-blue': '#182532',
        'darker-blue': '#131E28',
        'dark-gray': '#747C84',
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
