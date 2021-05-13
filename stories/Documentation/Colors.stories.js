import Tailwind from '../../tailwind.config'
import ColorPalette from './Components/ColorPalette'

export default {
  title: 'Documentation/Colors',
  component: ColorPalette,
}

export const All = () => ({
  data() {
    return {
      colors: Tailwind.theme.extend.colors,
    }
  },
  components: { ColorPalette },
  template: `
    <color-palette :colors="colors" />`,
})
