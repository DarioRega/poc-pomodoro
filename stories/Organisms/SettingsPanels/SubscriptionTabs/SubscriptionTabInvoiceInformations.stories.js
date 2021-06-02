import SubscriptionTabInvoiceInformations from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabInvoiceInformations'
import { SETTINGS_PANEL_LABELS } from '@/constantes/labels'

export default {
  title: 'Organisms/SettingsPanels/SubscriptionTabs/InvoiceInformations',
  component: SubscriptionTabInvoiceInformations,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubscriptionTabInvoiceInformations },
  computed: {
    getLabels() {
      return SETTINGS_PANEL_LABELS.subscriptionTab
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <subscription-tab-invoice-informations :labels='getLabels' />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
