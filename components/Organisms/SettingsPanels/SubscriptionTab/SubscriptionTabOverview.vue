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
        <label-with-data :label="labels.estimateOfInvoice">
          <p>10.77 USD {{ labels.taxIncluded }}</p>
          <p>{{ labels.nextInvoice }} Nov 18, 2021</p>
        </label-with-data>
      </div>

      <div class="cards__card">
        <label-with-data :label="labels.invoiceInformation">
          <div class="flex flex-row justify-between items-start">
            <div>
              <p class="subtitle">{{ labels.billingPeriod }}</p>
              <!--              TODO conditional rendering for label depending the plan -->
              <p class="capitalize">{{ labels.annual }}</p>
            </div>
            <div>
              <p class="subtitle">{{ labels.paymentMethod }}</p>
              <!--              TODO add paypal, or credits cards logo-->
              <!--              TODO conditional rendering for logo depending the plan -->
              <p>Paypal</p>
            </div>
          </div>
        </label-with-data>
      </div>

      <div class="cards__card">
        <label-with-data :label="labels.billingHistory">
          <!--          TODO v-for on billing history max 5 entry, it's just a preview here-->
          <div class="flex flex-col">
            <div class="flex flex-row justify-between">
              <p>Oct 19, 2020</p>
              <p>10.77 $USD</p>
            </div>
            <div class="flex flex-row justify-between">
              <p>Oct 19, 2020</p>
              <p>10.77 $USD</p>
            </div>
            <div class="flex flex-row justify-between">
              <p>Oct 19, 2020</p>
              <p>10.77 $USD</p>
            </div>
            <div class="text-center mt-2">
              <p v-show="isShortHistory">{{ labels.thatsAll }}</p>
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
                >{{ labels.viewAllHistory }}</a
              >
            </div>
          </div>
        </label-with-data>
      </div>

      <div class="cards__card">
        <label-with-data :label="labels.billingContact">
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
              <p class="font-semibold">Dario Regazzoni</p>
              <p class="font-semibold">dario.regazzoni@outlook.fr</p>
            </div>
          </div>
        </label-with-data>
      </div>
    </div>
  </section>
</template>

<script>
import LabelWithData from '@/components/Atoms/LabelWithData'
import Icon from '@/components/Atoms/Icon'

export default {
  name: 'SubscriptionTabOverview',
  components: { LabelWithData, Icon },
  props: {
    labels: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isShortHistory() {
      return false
      // TODO once we have the value
      // return this.values.billingHistory.length <= 5
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
