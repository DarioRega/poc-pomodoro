<template>
  <section>
    <div
      class="header flex items-center"
      :class="isLayoutStacked && 'header--stacked'"
    >
      <div class="header__col task-name">
        <task-target
          :is-selected="isSelected"
          :is-completed="isCompleted"
          :is-archive-enabled="isArchiveEnabled"
          :is-delete-enabled="isDeleteEnabled"
          @click="$emit('onTargetClick', task.id)"
          @dblclick="$emit('onChangeRunningTask', task.id)"
        />
        <icon
          v-show="isRunning"
          icon-name="clock"
          class="w-5 text-dark-indigo dark:text-light-indigo ml-2 mr-2"
        />
        <brand-input
          :name="$t('Task name')"
          :is-selected="isSelected"
          :is-completed="isCompleted"
          type="task"
          class="w-full"
          :class="[isRunning ? 'pr-0' : 'pl-3']"
          :value="taskName"
          @change.native="taskName = $event.target.value"
        />
      </div>
      <div class="w-32 3xl:w-56 px-4 header__col header__col--center">
        <task-select-status
          :name="$t('Task status')"
          :status="task.status"
          :options="TASK_STATES"
          @change="handleTaskStatusChange"
        />
      </div>

      <div
        class="
          w-24
          3xl:w-32
          px-2
          flex-none
          header__col header__col--center
          relative
        "
      >
        <task-deadline
          :close-button-text="$t('Close')"
          :value="task.deadline"
          :is-selected="isSelected"
          :is-completed="isCompleted"
          @change="handleTaskDeadlineChange"
        />
      </div>

      <div class="w-5/12 header__col">
        <div class="w-full px-4 relative">
          <slot />
        </div>
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
import Icon from '@/components/Atoms/Icon'

export default {
  name: 'TaskGridBodyAllTasks',
  components: {
    TaskTarget,
    Icon,
    BrandInput,
    TaskSelectStatus,
    TaskDeadline,
  },
  props: {
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
    isSelected: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    /*
      If the sidebar is stacked or normal width
    */
    isLayoutStacked: {
      type: Boolean,
      default: false,
    },
    /*
      If the is the current task running
    */
    isRunning: {
      type: Boolean,
      default: false,
    },
    /*
      If the user enabled the archive task mode on header
    */
    isArchiveEnabled: {
      type: Boolean,
      default: false,
    },
    /*
      If the user enabled the delete task mode on header
    */
    isDeleteEnabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      taskName: '',
    }
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
  },
  watch: {
    taskName(newValue, oldValue) {
      // TODO + validation dispatch action
    },
  },
  mounted() {
    this.taskName = this.task.name
  },
  methods: {
    handleTaskStatusChange(status) {
      // TODO dispatch action with task id
    },
    handleTaskDeadlineChange(dateTime, dateString) {
      // TODO dispatch action with task id
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
    @apply flex items-center h-full;
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
