import ColorPalette from './Components/ColorPalette'

export default {
  title: 'Documentation/Colors',
  component: ColorPalette,
}

export const All = () => ({
  data() {
    return {
      colors: [
        'success',
        'error',
        'celeste',
        'light-indigo',
        'dark-indigo',
        'dark-blue',
        'darker-blue',
        'light-gray',
        'dark-gray',
        'dark-gray',
        'darker-gray',
        'lighter-white',
        'light-white',
        'dark-black',
        'darker-black',
      ],
    }
  },
  components: { ColorPalette },
  template: `
    <color-palette :colors="colors" />`,
})
