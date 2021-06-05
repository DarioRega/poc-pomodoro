import SubscriptionTabBillingHistory from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabBillingHistory'

export default {
  title: 'Organisms/SettingsPanels/SubscriptionTabs/BillingHistory',
  component: SubscriptionTabBillingHistory,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubscriptionTabBillingHistory },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <subscription-tab-billing-history />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
