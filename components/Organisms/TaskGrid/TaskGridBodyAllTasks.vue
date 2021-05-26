<template>
  <section>
    <div class="header flex">
      <div class="header__col flex-1">
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
      <div class="w-36 header__col header__col--center">
        <task-select-status
          :name="labels.taskStatusName"
          :value="task.status"
          :status-text="task.status"
          :options="TASK_STATES"
        />
      </div>

      <div class="w-24 flex-none header__col header__col--center">
        <task-deadline
          :close-button-text="labels.closeCalendar"
          :value="task.deadline"
          @change="handleChangeDeadline"
        />
      </div>

      <div class="w-1/6 header__col pl-6">task-description</div>

      <div class="w-1/4 header__col justify-end">
        <div class="flex items-center justify-end">actions</div>
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

export default {
  name: 'TaskGridBodyAllTasks',
  components: { TaskTarget, BrandInput, TaskSelectStatus, TaskDeadline },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    isToggled: {
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
  },
  computed: {
    // TODO Should come from the backend with an api call,mapped with the name aswell, depending on localization
    TASK_STATUS_VALUES() {
      return TASK_STATUS_VALUES
    },
    // TODO Should come from the backend with an api call, should come as props here
    TASK_STATES() {
      const prout = Object.keys(TASK_STATUS_VALUES).map((x, i) => {
        return {
          id: i + 1,
          value: TASK_STATUS_VALUES[x],
          name: FAKER_TASK_STATUS_NAMES[x],
        }
      })
      console.log('GRIDBODY STEAATES', prout)
      return prout
    },
  },
  methods: {
    handleClickTaskTarget() {},
    handleChangeTaskName(value) {
      //
    },
    handleChangeDeadline(dateTime, dateString) {
      //
    },
    //
  },
}
</script>
<style lang="scss" scoped>
.header {
  &__col {
    @apply flex items-center;
    &--center {
      @apply mx-auto text-center justify-center;
    }
    & h6 {
      @apply mb-0;
    }
  }
}
</style>
