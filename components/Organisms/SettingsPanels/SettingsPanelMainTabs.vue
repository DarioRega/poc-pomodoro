<template>
  <div>
    <ul class="flex flex-row gap-x-4">
      <li v-for="tab in tabs" :key="tab.step">
        <tab-link
          type="primary"
          :is-active="tab.step === currentActiveTab"
          @click="$emit('onTabChange', tab.step)"
        >
          {{ tab.name }}
        </tab-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { SETTINGS_PANEL_STEPS } from '@/constantes'
import TabLink from '@/components/Atoms/TabLink'

export default {
  name: 'SettingsPanelMainTabs',
  components: { TabLink },
  props: {
    currentActiveTab: {
      type: String,
      required: true,
    },
  },
  computed: {
    tabs() {
      return SETTINGS_PANEL_STEPS
    },
  },
}
</script>
