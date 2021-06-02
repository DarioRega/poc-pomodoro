import SubscriptionTabBillingHistory from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabBillingHistory'
import { SETTINGS_PANEL_LABELS } from '@/constantes/labels'

export default {
  title: 'Organisms/SettingsPanels/SubscriptionTabs/BillingHistory',
  component: SubscriptionTabBillingHistory,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubscriptionTabBillingHistory },
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
