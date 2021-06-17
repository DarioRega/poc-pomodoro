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
      <p class="capitalize">{{ $t('annual') }}</p>
    </label-with-data>

    <!--  PAYMENT METHOD -->
    <label-with-data
      :is-small="true"
      class="w-full text-left mb-4"
      :label="$t('Payment method')"
    >
      <p>Paypal logo</p>
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
          <p class="font-semibold">Dario Regazzoni</p>
          <p class="font-semibold">dario.regazzoni@outlook.fr</p>
          <p class="font-semibold">Chemin de Montelly 65, 1007 Lausanne</p>
        </div>
      </div>
    </label-with-data>
    <div class="mt-10 text-center">
      <brand-button @click="$emit('onManageInvoicesInformations')">
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
}
</script>
<style scoped lang="scss">
p {
  &:not(.subtitle) {
    @apply mb-2 text-sm;
  }
}
</style>
