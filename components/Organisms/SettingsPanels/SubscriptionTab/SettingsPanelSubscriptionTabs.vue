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
import { SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS } from '@/constantes'
import TabLink from '@/components/Atoms/TabLink'

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
      return SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS
    },
  },
}
</script>
