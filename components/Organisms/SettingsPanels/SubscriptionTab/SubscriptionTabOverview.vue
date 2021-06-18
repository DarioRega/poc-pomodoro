<template>
  <section>
    <div
      class="
        flex flex-row flex-wrap
        gap-y-12
        justify-between
        items-stretch
        cards__container
      "
    >
      <div class="cards__card">
        <label-with-data :label="$t('Estimate of the invoice')">
          <p>
            {{ totalInvoice(getCurrentInvoice || {}) }}
            {{ $t(' tax included') }}
          </p>
          <p>{{ $t('Next invoice') }} {{ nextInvoiceDate }}</p>
        </label-with-data>
      </div>

      <div class="cards__card">
        <label-with-data :label="$t('Invoice information')">
          <div class="flex flex-row justify-between items-start">
            <div>
              <p class="subtitle">{{ $t('Billing period') }}</p>
              <!--              TODO conditional rendering for label depending the plan -->
              <p class="capitalize">
                {{
                  isCurrentSubscriptionMonthly ? $t('monthly') : $t('annually')
                }}
              </p>
            </div>
            <div>
              <p class="subtitle">{{ $t('Payment method') }}</p>
              <p class="capitalize">
                {{ user.card_brand || $t('unknown') }}
                {{ ', ******' + user.card_last_four || '' }}
              </p>
            </div>
          </div>
        </label-with-data>
      </div>

      <div class="cards__card">
        <label-with-data :label="$t('Billing history')">
          <!--          TODO v-for on billing history max 5 entry, it's just a preview here-->
          <div class="flex flex-col">
            <div
              v-for="receipt in receipts"
              :key="receipt.provider_id"
              class="flex flex-row justify-between"
            >
              <p>{{ receipt.paid_at | formatDate }}</p>
              <p>{{ totalInvoice(receipt) }}</p>
            </div>

            <div class="text-center mt-2">
              <p v-show="isShortHistory">{{ $t("That's all") }}</p>
              <a
                v-show="!isShortHistory"
                tabindex="0"
                role="button"
                class="
                  view-history
                  text-xs text-dark-indigo
                  dark:text-light-indigo
                  no-underline
                  focus:outline-none
                  focus:underline
                "
                @click="$emit('onSeeAllHistory')"
                >{{ $t('View all history') }}</a
              >
            </div>
          </div>
        </label-with-data>
      </div>

      <div class="cards__card">
        <label-with-data :label="$t('Billing contact')">
          <div class="flex text-current">
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
            </div>
          </div>
        </label-with-data>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment-timezone'

import {
  formatReceiptDate,
  getTotalAmountWithTaxFromString,
} from '@/helpers/subscriptions'

import LabelWithData from '@/components/Atoms/LabelWithData'
import Icon from '@/components/Atoms/Icon'
import { BILLING_DATE_FORMAT } from '@/constantes'

export default {
  name: 'SubscriptionTabOverview',
  components: { LabelWithData, Icon },
  filters: {
    formatDate: (value) => {
      return formatReceiptDate(value)
    },
  },
  props: {
    receipts: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
      userReceipts: 'user/getUserReceipts',
      isCurrentSubscriptionMonthly: 'user/isCurrentSubscriptionMonthly',
      getCurrentInvoice: 'user/getCurrentInvoice',
    }),
    isShortHistory() {
      return this.userReceipts.length <= 5
    },
    nextInvoiceDate() {
      const paymentDate = this.getCurrentInvoice.paid_at
      if (this.isCurrentSubscriptionMonthly) {
        return moment(paymentDate).add(1, 'month').format(BILLING_DATE_FORMAT)
      }
      return moment(paymentDate).add(1, 'year').format(BILLING_DATE_FORMAT)
    },
  },
  methods: {
    totalInvoice(receipt) {
      return getTotalAmountWithTaxFromString(receipt.amount, receipt.tax)
    },
  },
}
</script>
<style lang="scss" scoped>
.cards {
  &__card {
    @apply w-[45%] border border-dark-gray rounded-md p-4 bg-light-white dark:bg-darker-blue;

    p {
      &:not(.subtitle) {
        @apply mb-2 text-sm;
      }
    }
  }
}
</style>
