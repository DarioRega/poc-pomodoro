import { SETTINGS_PANEL_LABELS } from '@/constantes/labels'
import SubscriptionTabOverview from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabOverview'

export default {
  title: 'Organisms/SettingsPanels/SubscriptionTabs/Overview',
  component: SubscriptionTabOverview,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubscriptionTabOverview },
  computed: {
    getLabels() {
      return SETTINGS_PANEL_LABELS.subscriptionTab
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <subscription-tab-overview :labels='getLabels' />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
