import IconsList from './Components/IconList'

export default {
  title: 'Documentation/Icons',
  component: IconsList,
}

export const All = () => ({
  components: { IconsList },
  template: `
    <icons-list />`,
})
