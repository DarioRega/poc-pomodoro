<template>
  <modal :is-open="isOpen" size="large">
    <template #header>
      <h5 class="text-dark-blue dark:text-celeste">
        {{ $t('Start a session') }}
      </h5>
    </template>
    <template #body>
      <panel-select-running-task
        :is-loading="isLoading"
        @onSelectTask="handleRunWithTask"
      />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <brand-button type="secondary" @click="$emit('onClose')"
          >{{ $t('Close') }}
        </brand-button>
        <brand-button
          :is-loading="isLoading"
          type="primary"
          @click="handleRunWithoutTask"
          >{{ $t('I just want the timer') }}
        </brand-button>
      </div>
    </template>
  </modal>
</template>

<script>
import BrandButton from '@/components/Atoms/BrandButton'
import Modal from '@/components/Molecules/Modal/Modal'
import PanelSelectRunningTask from '@/components/Organisms/PanelSelectRunningTask/PanelSelectRunningTask'

export default {
  name: 'ModalPanelSelectRunningTask',
  components: { Modal, BrandButton, PanelSelectRunningTask },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    // TODO  dont forget in action to set the component to load
    handleRunWithTask(task) {
      // TODO vuex action
    },
    handleRunWithoutTask() {
      // TODO vuex action
    },
  },
}
</script>
