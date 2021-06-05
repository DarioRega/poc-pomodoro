import SettingsPanelCurrentSubscriptionTab from '@/components/Organisms/SettingsPanels/SettingsPanelCurrentSubscriptionTab'

export default {
  title: 'Organisms/SettingsPanels/CurrentSubscriptionTab',
  component: SettingsPanelCurrentSubscriptionTab,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SettingsPanelCurrentSubscriptionTab },
  computed: {
    mockValues() {
      // TODO when removing hard coded values in component, mock values here as well
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <settings-panel-current-subscription-tab />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
