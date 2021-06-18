<template>
  <div class="billing-history__body--row">
    <div class="billing-history__body--column w-1/3">
      <p>{{ receipt.paid_at | formatDate }}</p>
    </div>
    <div class="billing-history__body--column w-1/4">
      <p>{{ isCurrentSubscriptionMonthly ? $t('monthly') : $t('yearly') }}</p>
    </div>
    <div class="billing-history__body--column w-1/4">
      <p class="capitalize">{{ totalInvoice }}</p>
    </div>
    <div
      class="
        billing-history__body--column billing-history__body--column--actions
        w-2/12
      "
    >
      <a
        :href="downloadUrl"
        :download="true"
        target="_blank"
        tabindex="0"
        class="inline-flex icon-receipt"
      >
        <icon icon-name="download" class="w-6 p-0.5" />
      </a>
    </div>
  </div>
</template>

<script>
import moment from 'moment-timezone'

import { getTotalAmountWithTaxFromString } from '@/helpers/subscriptions'
import Icon from '@/components/Atoms/Icon'

export default {
  name: 'RowBillingHistory',
  components: { Icon },
  filters: {
    formatDate: (value) => {
      return moment(value).format('MMMM  DD, YYYY')
    },
  },
  props: {
    receipt: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalInvoice() {
      return getTotalAmountWithTaxFromString(
        this.receipt.amount,
        this.receipt.tax
      )
    },
    downloadUrl() {
      return `${process.env.API_URL}/spark/user/${this.$auth.user.id}/receipts/${this.receipt.provider_id}/download`
    },
    isCurrentSubscriptionMonthly() {
      return this.$store.getters['user/isCurrentSubscriptionMonthly'](
        this.receipt.amount
      )
    },
  },
}
</script>
