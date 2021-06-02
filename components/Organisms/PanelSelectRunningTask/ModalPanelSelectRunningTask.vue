<template>
  <modal :is-open="isOpen" size="large">
    <template #header>
      <h5 class="text-dark-blue dark:text-celeste">
        {{ labels.startASession }}
      </h5>
    </template>
    <template #body>
      <panel-select-running-task
        :tasks="tasks"
        :previous-task="previousTask"
        :labels="labels"
        :is-loading="isLoading"
        @onSelectTask="$emit('onRunWithTask', $event)"
      />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <brand-button type="secondary" @click="$emit('onClose')"
          >{{ labels.close }}
        </brand-button>
        <brand-button type="primary" @click="$emit('onRunWithoutTask')"
          >{{ labels.iJustWantTheTimer }}
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
    isLoading: {
      type: Boolean,
      default: false,
    },
    tasks: {
      type: Array,
      default: () => [],
    },
    previousTask: {
      type: Object,
      default: () => ({}),
    },
    labels: {
      type: Object,
      required: true,
    },
  },
}
</script>
