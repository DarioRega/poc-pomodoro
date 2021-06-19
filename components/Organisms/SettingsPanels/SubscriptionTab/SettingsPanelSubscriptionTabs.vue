<template>
  <div>
    <ul
      class="flex flex-row gap-x-2"
      :class="isPremium ? 'justify-between' : 'justify-start'"
    >
      <li v-for="tab in tabs" :key="tab.step">
        <tab-link
          v-show="shouldDisplay(tab.step)"
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
import { SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES } from '@/constantes'

export default {
  name: 'SettingsPanelSubscriptionTabs',
  components: { TabLink },
  props: {
    currentActiveTab: {
      type: String,
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentSubscriptionTab() {
      return SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.CURRENT_SUBSCRIPTION
    },
    tabs() {
      return getSubscriptionsSettingsPanelSteps(this.$i18n)
    },
  },
  methods: {
    shouldDisplay(step) {
      if (
        step ===
        SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.CURRENT_SUBSCRIPTION
      ) {
        return true
      }
      return this.isPremium
    },
  },
}
</script>
