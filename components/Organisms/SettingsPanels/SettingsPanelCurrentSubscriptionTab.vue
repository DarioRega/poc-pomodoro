<template>
  <section class="settings-panel w-full h-full">
    <settings-panel-subscription-tabs
      :current-active-tab="currentActiveTab"
      :is-premium="isPremium"
      class="mb-10"
      @onTabChange="currentActiveTab = $event"
    />
    <div>
      <subscription-tab-overview
        v-show="currentActiveTab === steps.OVERVIEW && isPremium"
        @onSeeAllHistory="currentActiveTab = steps.BILLING_HISTORY"
      />

      <subscription-tab-estimate-of-invoice
        v-show="currentActiveTab === steps.ESTIMATE_OF_INVOICE && isPremium"
        :is-monthly-subscription="isCurrentSubscriptionMonthly"
      />

      <subscription-tab-invoice-informations
        v-show="currentActiveTab === steps.INVOICE_INFORMATIONS && isPremium"
        @onManageInvoicesInformations="handleManageSubscription"
      />

      <subscription-tab-billing-history
        v-show="
          currentActiveTab === steps.BILLING_HISTORY &&
          wasUserPremiumAtLeastOnce
        "
        :receipts="userReceipts"
        @onRequestDownloadInvoice="handleRequestDownloadInvoice"
      />

      <subscription-tab-current-subscription
        v-show="currentActiveTab === steps.CURRENT_SUBSCRIPTION"
        :is-premium="isPremium"
        @onManageSubscription="handleManageSubscription"
      />
    </div>
  </section>
</template>

<script>
import { SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES } from '@/constantes'
import SettingsPanelSubscriptionTabs from '@/components/Organisms/SettingsPanels/SubscriptionTab/SettingsPanelSubscriptionTabs'
import SubscriptionTabOverview from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabOverview'
import SubscriptionTabEstimateOfInvoice from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabEstimateOfInvoice'
import SubscriptionTabInvoiceInformations from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabInvoiceInformations'
import SubscriptionTabBillingHistory from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabBillingHistory'
import SubscriptionTabCurrentSubscription from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabCurrentSubscription'
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsPanelCurrentSubscriptionTab',
  components: {
    SettingsPanelSubscriptionTabs,
    SubscriptionTabOverview,
    SubscriptionTabEstimateOfInvoice,
    SubscriptionTabInvoiceInformations,
    SubscriptionTabBillingHistory,
    SubscriptionTabCurrentSubscription,
  },
  data() {
    return {
      currentActiveTab: '',
    }
  },
  computed: {
    ...mapGetters({
      isPremium: 'user/isUserPremium',
      userReceipts: 'user/getUserReceipts',
      isUserCurrentlyPremium: 'user/isUserCurrentlyPremium',
      wasUserPremiumAtLeastOnce: 'user/wasUserPremiumAtLeastOnce',
      isCurrentSubscriptionMonthly: 'user/isCurrentSubscriptionMonthly',
    }),
    steps() {
      return SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES
    },
  },
  mounted() {
    if (this.isPremium) {
      this.currentActiveTab = this.steps.OVERVIEW
    } else {
      this.currentActiveTab = this.steps.CURRENT_SUBSCRIPTION
    }
  },
  methods: {
    handleManageSubscription() {
      window.open(`${process.env.API_URL}/billing`, '_blank')
    },
  },
}
</script>
<style scoped lang="scss">
p {
  &:not(.subtitle) {
    @apply mb-2 text-sm;
  }
}
</style>
