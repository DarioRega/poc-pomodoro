import IconGridActions from '@/components/Molecules/IconGridActions'
import Icon from '@/components/Atoms/Icon'

export default {
  title: 'Molecules/IconGridActions',
  component: IconGridActions,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { IconGridActions, Icon },
  methods: {
    onSettingsClick() {
      alert('onSettingsClick')
    },
    onSoundClick() {
      alert('onSoundClick')
    },
    onHelpClick() {
      alert('onHelpClick')
    },
    onLogout() {
      alert('onLogout')
    },
  },
  template: `
    <icon-grid-actions v-bind="$props"
      @onSettingsClick='onSettingsClick'
      @onSoundClick='onSoundClick'
      @onHelpClick='onHelpClick'
      @onLogout='onLogout'
    />`,
})

export const Default = Template.bind({})

export const Muted = Template.bind({})
Muted.args = {
  isMuted: true,
}
