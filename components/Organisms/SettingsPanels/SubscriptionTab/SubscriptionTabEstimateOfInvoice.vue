<template>
  <section
    class="w-full max-w-lg mx-auto h-full flex items-center justify-center"
  >
    <label-with-data
      class="w-full text-left"
      :label="$t('Estimate of the invoice')"
    >
      <div class="w-full border-b border-dark-gray pb-2">
        <div class="flex w-full justify-between">
          <div>
            <p class="subtitle mb-0">{{ $t('Pomodoro premium') }}</p>
            <p>1 {{ $t('user') }}</p>
          </div>
          <p>{{ currentInvoice.amount }}</p>
        </div>
        <div class="flex justify-between">
          <p>Tax</p>
          <p>{{ currentInvoice.tax }}</p>
        </div>
      </div>
      <div class="flex justify-between mt-2">
        <p>Total</p>
        <p>{{ totalInvoice }}</p>
      </div>
      <div class="mt-8">
        <p class="subtitle">
          {{
            $t(
              'Given your current configuration, you will be automatically billed'
            )
          }}
          {{ totalInvoice }}
          {{ isMonthlySubscription ? $t('next month') : $t('next year') }}.
        </p>
      </div>
    </label-with-data>
  </section>
</template>

<script>
import LabelWithData from '@/components/Atoms/LabelWithData'
import { getTotalAmountWithTaxFromString } from '@/helpers/subscriptions'

export default {
  name: 'SubscriptionTabEstimateOfInvoice',
  components: { LabelWithData },
  props: {
    isMonthlySubscription: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    currentInvoice() {
      return this.$store.getters['user/getCurrentInvoice']
    },
    totalInvoice() {
      const { amount, tax } = this.currentInvoice
      return getTotalAmountWithTaxFromString(amount, tax)
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
