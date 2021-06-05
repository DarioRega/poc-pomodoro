import SubscriptionTabEstimateOfInvoice from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabEstimateOfInvoice'

export default {
  title: 'Organisms/SettingsPanels/SubscriptionTabs/EstimateOfInvoice',
  component: SubscriptionTabEstimateOfInvoice,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubscriptionTabEstimateOfInvoice },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <subscription-tab-estimate-of-invoice />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
