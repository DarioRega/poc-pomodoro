<template>
  <div>
    <ul class="flex flex-row justify-between gap-x-2">
      <li v-for="tab in tabs" :key="tab.step">
        <tab-link
          :is-active="tab.step === currentActiveTab"
          class="text-sm"
          @click="$emit('onTabChange', tab.step)"
        >
          {{ tab.name }}
        </tab-link>
      </li>
    </ul>
  </div>
</template>

<script>
import TabLink from '@/components/Atoms/TabLink'
import { getSubscriptionsSettingsPanelSteps } from '@/helpers/settings'

export default {
  name: 'SettingsPanelSubscriptionTabs',
  components: { TabLink },
  props: {
    currentActiveTab: {
      type: String,
      required: true,
    },
  },
  computed: {
    tabs() {
      return getSubscriptionsSettingsPanelSteps(this.$i18n)
    },
  },
}
</script>
