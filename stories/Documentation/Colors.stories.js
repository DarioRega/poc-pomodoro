import ColorPalette from './Components/ColorPalette'

export default {
  title: 'Documentation/Colors',
  component: ColorPalette,
}

export const All = () => ({
  data() {
    return {
      colors: [

        'bg-success',
        'bg-error',
        'bg-celeste',
        'bg-light-indigo',
        'bg-dark-indigo',
        'bg-dark-blue',
        'bg-darker-blue',
        'bg-dark-gray',
        'bg-darker-gray',
        'bg-lighter-white',
        'bg-light-white',
        'bg-dark-black',
        'bg-darker-black',
        'bg-dark-gray-20',
      ],
    }
  },
  components: { ColorPalette },
  template: `
    <color-palette :colors="colors" />`,
})
