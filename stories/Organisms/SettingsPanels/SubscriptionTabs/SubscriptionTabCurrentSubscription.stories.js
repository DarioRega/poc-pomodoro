import SubscriptionTabCurrentSubscription from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabCurrentSubscription'
import { SETTINGS_PANEL_LABELS } from '@/constantes/labels'

export default {
  title: 'Organisms/SettingsPanels/SubscriptionTabs/CurrentSubscription',
  component: SubscriptionTabCurrentSubscription,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubscriptionTabCurrentSubscription },
  computed: {
    getLabels() {
      return SETTINGS_PANEL_LABELS.subscriptionTab
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <subscription-tab-billing-history :labels='getLabels' />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
