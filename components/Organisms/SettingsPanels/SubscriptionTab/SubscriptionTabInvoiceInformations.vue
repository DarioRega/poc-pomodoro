<template>
  <section class="w-full max-w-lg mx-auto h-full justify-center">
    <label-with-data
      class="w-full text-left"
      :label="$t('Invoice information')"
    />

    <!--  BILLING PERIOD -->
    <label-with-data
      :is-small="true"
      class="w-full text-left mb-4"
      :label="$t('Billing period')"
    >
      <p class="capitalize">
        {{ isCurrentSubscriptionMonthly ? $t('monthly') : $t('annually') }}
      </p>
    </label-with-data>

    <!--  PAYMENT METHOD -->
    <label-with-data
      :is-small="true"
      class="w-full text-left mb-4"
      :label="$t('Payment method')"
    >
      <p class="capitalize">{{ userPaymentMethod }}</p>
      <p v-if="userLastFourDigit">
        {{ $t('Card number: ') }}**********{{ userLastFourDigit }},
      </p>
      <p v-if="userCardExp">{{ $t('Exp: ') }}{{ userCardExp }}</p>
    </label-with-data>

    <!--  BILLING CONTACT -->
    <label-with-data
      :is-small="true"
      class="w-full text-left"
      :label="$t('Billing contact')"
    >
      <div class="flex items-start justify-start text-current mt-2">
        <div class="inline-flex mr-4">
          <div
            class="
              rounded-full
              w-14
              h-14
              flex
              items-center
              justify-center
              bg-dark-indigo
              dark:bg-light-indigo
              bg-opacity-25
              dark:bg-opacity-25
            "
          >
            <icon
              icon-name="userRound"
              class="w-8 h-8 text-dark-indigo dark:text-light-indigo"
            />
          </div>
        </div>
        <div>
          <p class="font-semibold">{{ user.name }}</p>
          <p class="font-semibold">{{ user.email }}</p>
          <p class="font-semibold">{{ userBillingAddressLine1 }}</p>
          <p class="font-semibold">{{ userBillingAddressLine2 }}</p>
        </div>
      </div>
    </label-with-data>
    <div class="mt-10 text-center">
      <brand-button @click="$emit('onManageSubscriptionInformations')">
        {{ $t('Manage invoices information') }}
      </brand-button>
    </div>
  </section>
</template>

<script>
import LabelWithData from '@/components/Atoms/LabelWithData'
import Icon from '@/components/Atoms/Icon'
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'SubscriptionTabInvoiceInformations',
  components: { LabelWithData, Icon, BrandButton },
  props: {
    receipts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isCurrentSubscriptionMonthly() {
      return this.$store.getters['user/isCurrentSubscriptionMonthly']
    },
    user() {
      return this.$store.getters['user/getUser']
    },

    userPaymentMethod() {
      return `${this.user.card_brand ? this.user.card_brand : ''}`
    },
    userCardExp() {
      return `${this.user.card_expiration ? this.user.card_expiration : ''}`
    },
    userLastFourDigit() {
      return `${this.user.card_last_four ? this.user.card_last_four : ''}`
    },

    userBillingAddressLine1() {
      const { billing_address, billing_city } = this.user
      return `${billing_address ? `${billing_address}, ` : ''}  ${
        billing_city ? `${billing_city}, ` : ''
      }`
    },
    userBillingAddressLine2() {
      const { billing_postal_code, billing_country } = this.user
      return `${billing_postal_code ? `${billing_postal_code}, ` : ''} ${
        billing_country ? `${billing_country}` : ''
      }`
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
