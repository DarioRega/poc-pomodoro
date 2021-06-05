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
      return this.$store.getters['settings/getSettingsPanelSteps'](this.$i18n)
    },
  },
}
</script>
