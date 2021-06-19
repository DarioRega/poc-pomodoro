<template>
  <section class="settings-panel w-full h-full">
    <settings-panel-subscription-tabs
      :current-active-tab="currentActiveTab"
      :is-premium="isUserCurrentlyPremium"
      class="mb-10"
      @onTabChange="currentActiveTab = $event"
    />
    <div>
      <subscription-tab-overview
        v-if="currentActiveTab === steps.OVERVIEW && isUserCurrentlyPremium"
        :receipts="userReceipts"
        @onSeeAllHistory="currentActiveTab = steps.BILLING_HISTORY"
      />

      <subscription-tab-estimate-of-invoice
        v-if="
          currentActiveTab === steps.ESTIMATE_OF_INVOICE &&
          isUserCurrentlyPremium
        "
        :is-monthly-subscription="isCurrentSubscriptionMonthly"
      />

      <subscription-tab-invoice-informations
        v-if="
          currentActiveTab === steps.INVOICE_INFORMATIONS &&
          wasUserPremiumAtLeastOnce
        "
        @onManageSubscriptionInformations="handleManageSubscription"
      />

      <subscription-tab-billing-history
        v-if="
          currentActiveTab === steps.BILLING_HISTORY &&
          wasUserPremiumAtLeastOnce
        "
        :receipts="userReceipts"
      />

      <subscription-tab-current-subscription
        v-if="currentActiveTab === steps.CURRENT_SUBSCRIPTION"
        :is-premium="isUserCurrentlyPremium"
        @onManageSubscription="handleManageSubscription"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import { SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES } from '@/constantes'

import SettingsPanelSubscriptionTabs from '@/components/Organisms/SettingsPanels/SubscriptionTab/SettingsPanelSubscriptionTabs'
import SubscriptionTabOverview from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabOverview'
import SubscriptionTabEstimateOfInvoice from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabEstimateOfInvoice'
import SubscriptionTabInvoiceInformations from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabInvoiceInformations'
import SubscriptionTabBillingHistory from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabBillingHistory'
import SubscriptionTabCurrentSubscription from '@/components/Organisms/SettingsPanels/SubscriptionTab/SubscriptionTabCurrentSubscription'

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
    if (this.isUserCurrentlyPremium) {
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
