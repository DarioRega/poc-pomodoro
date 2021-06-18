<template>
  <section class="w-full max-w-lg mx-auto h-full justify-center">
    <!--  CURRENT SUBSCRIPTION -->
    <label-with-data
      class="w-full text-left mb-4"
      :label="$t('Current subscription')"
    >
      <div class="border border-dark-gray rounded-md p-4 mt-4">
        <div class="flex justify-between items-center">
          <p class="subtitle font-bold text-dark-blue dark:text-celeste">
            LOGO
          </p>
          <h5 class="text-dark-blue dark:text-celeste">
            {{ isPremium ? $t('Pomodoro premium') : $t('Free plan') }}
          </h5>
        </div>
        <div class="flex justify-between items-center mt-6">
          <div>
            <p class="subtitle capitalize">{{ $t('users') }}</p>
            <p class="text-dark-gray">1 {{ $t('out of') }} {{ $t('users') }}</p>
          </div>
          <div>
            <p class="subtitle capitalize">{{ $t('tasks') }}</p>
            <p class="text-dark-gray">
              {{ userTotalTasks }} {{ $t('out of') }}
              {{ isPremium ? $t('unlimited') : 5 }} {{ $t('tasks') }}
            </p>
          </div>
        </div>
        <div class="text-center mt-10">
          <brand-button
            v-if="isPremium"
            class="capitalize"
            @click="$emit('onManageSubscription')"
          >
            {{ $t('Manage subscription') }}
          </brand-button>
          <brand-button
            v-else
            class="capitalize"
            @click="$emit('onManageSubscription')"
          >
            {{ $t('Upgrade') }}
          </brand-button>
        </div>
      </div>
    </label-with-data>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import LabelWithData from '@/components/Atoms/LabelWithData'
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'SubscriptionTabCurrentSubscription',
  components: { LabelWithData, BrandButton },
  computed: {
    ...mapGetters({
      isPremium: 'user/isUserPremium',
      userTotalTasks: 'tasks/getUserTotalTasksAmount',
    }),
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
