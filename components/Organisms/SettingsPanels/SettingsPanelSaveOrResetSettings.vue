<template>
  <div class="w-full max-w-xs justify-between flex mx-auto mt-6">
    <brand-button
      name="save changes"
      :is-loading="isLoading"
      :is-disabled="isLoading"
      @click="$emit('onSave')"
    >
      {{ saveChangesLabel }}
    </brand-button>
    <brand-button
      v-show="hasReset"
      name="save changes"
      type="secondary"
      @click="$emit('onResetDefault')"
    >
      {{ resetDefaultLabel }}
    </brand-button>
  </div>
</template>

<script>
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'SettingsPanelSaveOrResetSettings',
  components: { BrandButton },
  props: {
    hasReset: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    saveChangesLabel: {
      type: String,
      required: true,
    },
    resetDefaultLabel: {
      type: String,
      default: '',
    },
  },
}
</script>
