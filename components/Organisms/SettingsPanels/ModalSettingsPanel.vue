<template>
  <modal :is-open="isOpen" size="large">
    <template #header>
      <h5 class="text-dark-blue dark:text-celeste">{{ $t('Settings') }}</h5>
    </template>
    <template #body>
      <settings-panel />
    </template>
    <template #footer>
      <div class="flex justify-end">
        <brand-button type="primary" @click="$emit('onClose')"
          >{{ $t('Close') }}
        </brand-button>
      </div>
    </template>
  </modal>
</template>

<script>
import SettingsPanel from '@/components/Organisms/SettingsPanels/SettingsPanel'
import BrandButton from '@/components/Atoms/BrandButton'
import Modal from '@/components/Molecules/Modal/Modal'

export default {
  name: 'ModalSettingsPanel',
  components: { Modal, BrandButton, SettingsPanel },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {},
}
</script>
