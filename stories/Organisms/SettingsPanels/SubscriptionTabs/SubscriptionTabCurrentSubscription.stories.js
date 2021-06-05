import SubscriptionTabCurrentSubscription from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabCurrentSubscription'

export default {
  title: 'Organisms/SettingsPanels/SubscriptionTabs/CurrentSubscription',
  component: SubscriptionTabCurrentSubscription,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SubscriptionTabCurrentSubscription },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <subscription-tab-current-subscription />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
