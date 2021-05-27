<template>
  <section>
    <div class="header flex" :class="isStacked && 'header--stacked'">
      <div class="header__col task-name">
        <task-target
          :is-selected="isSelected"
          :is-complete="task.status === TASK_STATUS_VALUES.DONE"
          @click="handleClickTaskTarget"
        />
        <brand-input
          :value="task.name"
          :name="labels.taskName"
          :is-selected="isSelected"
          type="task"
          class="w-full px-3"
          @change="handleChangeTaskName"
        />
      </div>
      <div class="w-40 header__col header__col--center">
        <task-select-status
          :name="labels.taskStatusName"
          :value="task.status"
          :status-text="task.status"
          :options="TASK_STATES"
        />
      </div>

      <div class="w-28 flex-none header__col header__col--center">
        <task-deadline
          :close-button-text="labels.closeCalendar"
          :value="task.deadline"
          @change="handleChangeDeadline"
        />
      </div>

      <div class="w-4/12 header__col pl-6 relative">
        <BrandTextarea
          v-show="isFirstRow"
          :value="getCurrentDescription"
          :name="labels.taskDescription"
          :is-selected="isSelected"
          type="task"
          class="w-full absolute top-0 left-0"
          @change="handleChangeTaskDescription"
        />
      </div>
    </div>
  </section>
</template>

<script>
import TaskTarget from '@/components/Atoms/Task/TaskTarget'
import BrandInput from '@/components/Atoms/Inputs/BrandInput'
import TaskSelectStatus from '@/components/Atoms/Task/TaskSelectStatus'
import { FAKER_TASK_STATUS_NAMES, TASK_STATUS_VALUES } from '@/constantes'
import TaskDeadline from '@/components/Atoms/Task/TaskDeadline'
import BrandTextarea from '@/components/Atoms/Inputs/BrandTextarea'

export default {
  name: 'TaskGridBodyAllTasks',
  components: {
    TaskTarget,
    BrandInput,
    TaskSelectStatus,
    TaskDeadline,
    BrandTextarea,
  },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
    /*
      Used to get the store current task selected description and id,
      if we need to emit an edit
    */
    currentTaskSelected: {
      type: Object,
      default: () => ({}),
    },
    /*
      Only display the description of the first row,
      change description depending the currentTaskSelected
     */
    isFirstRow: {
      type: Boolean,
      default: false,
    },
    /*
      If the sidebar is stacked or normal width
    */
    isStacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // TODO Should come from the backend with an api call,mapped with the name aswell, depending on localization
    TASK_STATUS_VALUES() {
      return TASK_STATUS_VALUES
    },
    // TODO Should come from the backend with an api call, should come as props here
    TASK_STATES() {
      return Object.keys(TASK_STATUS_VALUES).map((x, i) => {
        return {
          id: i + 1,
          value: TASK_STATUS_VALUES[x],
          name: FAKER_TASK_STATUS_NAMES[x],
        }
      })
    },
    getCurrentDescription() {
      return this.currentTaskSelected.description || ''
    },
  },
  methods: {
    handleClickTaskTarget() {
      // TODO handle
    },
    handleChangeTaskName(value) {
      // TODO handle
    },
    handleChangeTaskDescription(value) {
      // TODO handle
      // add in handler these params  => (this.currentTaskSelected.id, value)
    },
    handleChangeDeadline(dateTime, dateString) {
      // TODO handle
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  .task-name {
    @apply flex-1;
  }
  &__col {
    @apply flex items-center;
    &--center {
      @apply mx-auto text-center justify-center;
    }
    & h6 {
      @apply mb-0;
    }
  }
  &--stacked {
    .task-name {
      @apply w-1/4 flex-none;
    }
  }
}
</style>
