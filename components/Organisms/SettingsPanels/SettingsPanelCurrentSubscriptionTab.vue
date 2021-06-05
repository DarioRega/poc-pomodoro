<template>
  <section class="settings-panel w-full h-full">
    <settings-panel-subscription-tabs
      :current-active-tab="currentActiveTab"
      class="mb-10"
      @onTabChange="currentActiveTab = $event"
    />
    <div>
      <subscription-tab-overview
        v-show="currentActiveTab === steps.OVERVIEW"
        @onSeeAllHistory="currentActiveTab = steps.BILLING_HISTORY"
      />
      <subscription-tab-estimate-of-invoice
        v-show="currentActiveTab === steps.ESTIMATE_OF_INVOICE"
      />
      <subscription-tab-invoice-informations
        v-show="currentActiveTab === steps.INVOICE_INFORMATIONS"
        @onManageInvoicesInformations="handleManageInvoicesInformations"
      />
      <subscription-tab-billing-history
        v-show="currentActiveTab === steps.BILLING_HISTORY"
        @onRequestDownloadInvoice="handleRequestDownloadInvoice"
      />
      <subscription-tab-current-subscription
        v-show="currentActiveTab === steps.CURRENT_SUBSCRIPTION"
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
  props: {
    values: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localValues: {},
      currentActiveTab: '',
    }
  },
  computed: {
    steps() {
      return SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES
    },
  },
  mounted() {
    this.localValues = this.values
    this.currentActiveTab = this.steps.OVERVIEW
  },
  methods: {
    handleManageInvoicesInformations() {
      // TODO handle redirect
    },
    handleManageSubscription() {
      // TODO handle redirect
    },
    handleRequestDownloadInvoice(invoiceId) {
      // TODO handle download call
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
