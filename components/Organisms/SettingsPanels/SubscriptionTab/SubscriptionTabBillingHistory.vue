<template>
  <section class="w-full max-w-xl mx-auto h-full justify-center">
    <label-with-data class="w-full text-left" :label="$t('Billing history')" />
    <div class="billing-history__table--header mb-2">
      <div class="billing-history__header--column w-1/3">
        <p class="capitalize">{{ $t('dated') }}</p>
      </div>
      <div class="billing-history__header--column w-1/4">
        <p>{{ $t('Billing period') }}</p>
      </div>
      <div class="billing-history__header--column w-1/4">
        <p class="capitalize">{{ $t('amount') }}</p>
      </div>
      <div class="billing-history__header--column w-2/12 text-center">
        <p class="capitalize">{{ $t('actions') }}</p>
      </div>
    </div>

    <row-billing-history
      v-for="receipt in receipts"
      :key="receipt.paid_at"
      :receipt="receipt"
      class="billing-history__body--row"
    />
    <div class="border-t border-dark-gray w-full">
      <!--    TODO pagination feature https://seelo.atlassian.net/browse/POM-47 -->
    </div>
  </section>
</template>

<script>
import LabelWithData from '@/components/Atoms/LabelWithData'
import RowBillingHistory from '@/components/Atoms/RowBillingHistory'

export default {
  name: 'SubscriptionTabBillingHistory',
  components: { LabelWithData, RowBillingHistory },

  props: {
    receipts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<style lang="scss">
.billing-history {
  &__table--header {
    @apply w-full flex border-b border-dark-gray pb-1 justify-between;
  }

  &__header--column {
    @apply text-dark-blue dark:text-celeste;
  }
  &__header--column,
  &__body--column {
    @apply flex-none;
  }
  &__body--row {
    @apply mb-2 w-full flex justify-between;
  }

  &__body--column {
    @apply text-left text-dark-gray;
    &--actions {
      @apply text-center text-dark-indigo;
      @apply dark:text-light-indigo;
      &:hover {
        @apply opacity-80;
      }
    }
  }
  p {
    &:not(.subtitle) {
      @apply mb-0 text-sm;
    }
  }
}
</style>
