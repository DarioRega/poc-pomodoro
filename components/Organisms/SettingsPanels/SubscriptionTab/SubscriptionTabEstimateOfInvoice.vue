<template>
  <section
    class="w-full max-w-lg mx-auto h-full flex items-center justify-center"
  >
    <label-with-data class="w-full text-left" :label="labels.estimateOfInvoice">
      <div class="w-full border-b border-dark-gray pb-2">
        <div class="flex w-full justify-between">
          <div>
            <p class="subtitle mb-0">{{ labels.premiumPlanName }}</p>
            <p>1 {{ labels.user }}</p>
          </div>
          <p>10.00 $USD</p>
        </div>
        <div class="flex justify-between">
          <p>Tax</p>
          <p>0.99 $USD</p>
        </div>
      </div>
      <div class="flex justify-between mt-2">
        <p>Total</p>
        <p>10.99 $USD</p>
      </div>
      <div class="mt-8">
        <p class="subtitle">{{ labels.givenYourCurrentConfig }} 10.99 $USD</p>
      </div>
    </label-with-data>
  </section>
</template>

<script>
import LabelWithData from '@/components/Atoms/LabelWithData'

export default {
  name: 'SubscriptionTabEstimateOfInvoice',
  components: { LabelWithData },
  props: {
    labels: {
      type: Object,
      required: true,
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
