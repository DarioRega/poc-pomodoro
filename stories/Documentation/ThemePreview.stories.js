import ThemePreview from './Components/ThemePreview'

export default {
  title: 'Documentation/ThemePreview',
  component: ThemePreview,
}

export const Sizes = () => ({
  components: { ThemePreview },
  template: `<theme-preview />`,
})
