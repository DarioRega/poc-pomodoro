<template>
  <section class="w-full h-full">
    <div class="flex flex-col justify-center w-full max-w-2xl mx-auto mt-4">
      <h6 class="mb-3 text-dark-blue dark:text-celeste">
        {{ labels.selectYourTask }} :
      </h6>
      <div class="pb-4">
        <select-running-task
          :options="tasks"
          :value="previousTask"
          name="select task"
          :labels="labels"
          :placeholder="labels.placeholderSelect"
          @change="handleSelectTask"
        />
        <div class="text-center mt-8 mb-2">
          <brand-button
            type="primary"
            :is-disabled="hasSelectedTask ? false : true"
            :is-loading="isLoading"
            @click="$emit('onSelectTask', selectedTask)"
            >{{ labels.startSession }}
          </brand-button>
        </div>
      </div>
      <div v-show="previousTask.id" class="w-full mx-auto text-center my-4">
        <h6 class="text-dark-blue dark:text-celeste">
          ...{{ labels.previousTask }} :
        </h6>
        <p class="text-dark-gray mb-4 mt-3">
          {{ formatTaskText(previousTask) }}
        </p>
        <brand-button @click="$emit('onSelectTask', previousTask)">
          {{ labels.usePreviousTask }}
        </brand-button>
      </div>
    </div>
  </section>
</template>

<script>
import BrandButton from '@/components/Atoms/BrandButton'
import SelectRunningTask from '@/components/Organisms/PanelSelectRunningTask/SelectRunningTask'

export default {
  name: 'PanelSelectRunningTask',
  components: { BrandButton, SelectRunningTask },
  props: {
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
  data() {
    return {
      hasSelectedTask: false,
    }
  },
  beforeMount() {
    // this.currentActiveTab = SETTINGS_PANEL_STEPS[3].step
  },
  methods: {
    handleSelectTask(task) {
      if (task) {
        this.hasSelectedTask = true
        this.selectedTask = task
      } else {
        this.hasSelectedTask = false
      }
    },
    formatTaskText(task) {
      const { name, project, subProject } = task
      return `${name} ${subProject ? `, in ${subProject}` : ''} ${
        project ? `, from ${project} ${this.labels.project}` : ''
      }`
    },
  },
}
</script>
