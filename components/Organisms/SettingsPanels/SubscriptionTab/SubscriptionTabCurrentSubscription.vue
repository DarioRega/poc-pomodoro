<template>
  <section class="w-full max-w-lg mx-auto h-full justify-center">
    <!--  BILLING PERIOD -->
    <label-with-data
      class="w-full text-left mb-4"
      :label="labels.billingPeriod"
    >
      <p class="subtitle">{{ labels.activeSubscription }}</p>
      <div class="border border-dark-gray rounded-md p-4 mt-4">
        <div class="flex justify-between items-center">
          <p class="subtitle font-bold text-dark-blue dark:text-celeste">
            LOGO
          </p>
          <h5 class="text-dark-blue dark:text-celeste">
            {{ isPremium ? labels.premiumPlanName : labels.freemiumPlanName }}
          </h5>
        </div>
        <div class="flex justify-between items-center mt-6">
          <div>
            <p class="subtitle">{{ labels.users }}</p>
            <p class="text-dark-gray">
              1 {{ labels.outOf }} {{ labels.users }}
            </p>
          </div>
          <div>
            <p class="subtitle capitalize">{{ labels.tasks }}</p>
            <p class="text-dark-gray">
              1 {{ labels.outOf }} 4 {{ labels.tasks }}
            </p>
          </div>
        </div>
        <div class="text-center mt-10">
          <brand-button
            v-if="isPremium"
            class="capitalize"
            @click="$emit('onUpgrade')"
          >
            {{ labels.manageSubscription }}
          </brand-button>
          <brand-button v-else class="capitalize" @click="$emit('onUpgrade')">
            {{ labels.upgrade }}
          </brand-button>
        </div>
      </div>
    </label-with-data>
  </section>
</template>

<script>
import LabelWithData from '@/components/Atoms/LabelWithData'
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'SubscriptionTabCurrentSubscription',
  components: { LabelWithData, BrandButton },
  props: {
    labels: {
      type: Object,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
p {
  &:not(.subtitle) {
    @apply mb-2 text-sm;
  }
}
</style>
