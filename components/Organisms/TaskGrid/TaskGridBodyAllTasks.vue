<template>
  <section>
    <div
      class="header flex items-center"
      :class="isStacked && 'header--stacked'"
    >
      <div class="header__col task-name">
        <task-target
          :is-selected="isSelected"
          :is-complete="task.status.value === TASK_STATUS_VALUES.DONE"
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
          :value="task.name"
          :name="labels.taskName"
          :is-selected="isSelected"
          type="task"
          class="w-full"
          :class="[isRunning ? 'pr-3' : 'px-3']"
          @change="$emit('onTaskNameChange', $event, task.id)"
        />
      </div>
      <div class="w-40 header__col header__col--center">
        <task-select-status
          :name="labels.taskStatusName"
          :value="task.status"
          :options="TASK_STATES"
          @change="$emit('onTaskStatusChange', $event, task.id)"
        />
      </div>

      <div class="w-28 flex-none header__col header__col--center relative">
        <task-deadline
          :close-button-text="labels.closeCalendar"
          :value="task.deadline"
          :is-selected="isSelected"
          @change="$emit('onDeadlineChange', $event, task.id)"
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
      If the sidebar is stacked or normal width
    */
    isStacked: {
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
