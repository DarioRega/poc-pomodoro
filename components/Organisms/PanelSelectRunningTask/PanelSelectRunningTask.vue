<template>
  <section class="w-full h-full">
    <div class="flex flex-col justify-center w-full max-w-2xl mx-auto mt-4">
      <h6 class="mb-3 text-dark-blue dark:text-celeste">
        {{ $t('Select your task') }} :
      </h6>
      <div class="pb-4">
        <select-running-task
          :options="tasks"
          name="select task"
          :placeholder="$t('Pick a task')"
          @change="handleSelectTask"
        />
        <div class="text-center mt-8 mb-2">
          <brand-button
            type="primary"
            :is-disabled="hasSelectedTask ? false : true"
            :is-loading="isLoading"
            @click="$emit('onSelectTask', selectedTask)"
            >{{ $t('Start session') }}
          </brand-button>
        </div>
      </div>
      <div v-show="previousTask.id" class="w-full mx-auto text-center my-4">
        <h6 class="text-dark-blue dark:text-celeste">
          ...{{ $t('or pick your previous task') }} :
        </h6>
        <p class="text-dark-gray mb-4 mt-3">
          {{ formatTaskText(previousTask) }}
        </p>
        <brand-button
          :is-loading="isLoading"
          @click="$emit('onSelectTask', previousTask)"
        >
          {{ $t('Use the previous task') }}
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
  },
  data() {
    return {
      hasSelectedTask: false,
      selectedTask: {},
    }
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.allProjectsTasks
    },
    previousTask() {
      return this.$store.state.tasks.previousTask
    },
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
        project ? `, from ${project} ${this.$t('project')}` : ''
      }`
    },
  },
}
</script>
