<template>
  <section class="w-full max-w-xl mx-auto h-full justify-center">
    <label-with-data class="w-full text-left" :label="labels.billingHistory" />
    <div class="billing-history__table--header mb-2">
      <div class="billing-history__header--column w-1/4">
        <p class="capitalize">{{ labels.dated }}</p>
      </div>
      <div class="billing-history__header--column w-1/4">
        <p>{{ labels.billNumber }}</p>
      </div>
      <div class="billing-history__header--column w-1/5">
        <p>{{ labels.billingPeriod }}</p>
      </div>
      <div class="billing-history__header--column w-1/5">
        <p class="capitalize">{{ labels.amount }}</p>
      </div>
      <div class="billing-history__header--column w-[10%]">
        <p class="capitalize">{{ labels.actions }}</p>
      </div>
    </div>

    <div v-for="row in rows" :key="row" class="billing-history__body--row">
      <div class="billing-history__body--column w-1/4">
        <p>Oct 18, 2020</p>
      </div>
      <div class="billing-history__body--column w-1/4">
        <p>PO-125345543</p>
      </div>
      <div class="billing-history__body--column w-1/5">
        <p>monthly</p>
      </div>
      <div class="billing-history__body--column w-1/5">
        <p class="capitalize">10.77 $USD</p>
      </div>
      <div
        class="
          billing-history__body--column billing-history__body--column--actions
          w-[10%]
        "
      >
        <button
          class="inline-flex"
          @click="$emit('onRequestDownloadInvoice', row)"
        >
          <icon icon-name="download" class="w-6 p-0.5" />
        </button>
      </div>
    </div>
    <div class="border-t border-dark-gray w-full">
      <!--    TODO pagination feature https://seelo.atlassian.net/browse/POM-47 -->
    </div>
  </section>
</template>

<script>
import LabelWithData from '@/components/Atoms/LabelWithData'
import Icon from '@/components/Atoms/Icon'

export default {
  name: 'SubscriptionTabBillingHistory',
  components: { LabelWithData, Icon },
  props: {
    labels: {
      type: Object,
      required: true,
    },
    rows: {
      type: Array,
      default: () => [1, 2, 3, 4, 5],
    },
  },
}
</script>
<style scoped lang="scss">
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
}
p {
  &:not(.subtitle) {
    @apply mb-0 text-sm;
  }
}
</style>
