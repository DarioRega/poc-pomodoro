<template>
  <section>
    <div class="header flex overflow-hidden">
      <div class="header__col flex-1">
        <task-target
          :is-selected="isSelected"
          :is-complete="task.status === TASK_STATUS.COMPLETED"
        />
        <brand-input
          :value="task.name"
          :name="labels.taskName"
          :is-selected="isSelected"
          type="task"
          class="w-full px-3"
          @change="handleTaskNameChange"
        />
      </div>
      <div class="w-36 header__col header__col--center">task status</div>

      <div class="w-24 flex-none header__col header__col--center">
        task deadline
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
import { TASK_STATUS } from '@/constantes'

export default {
  name: 'TaskGridBodyAllTasks',
  components: { TaskTarget, BrandInput },
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
    TASK_STATUS() {
      return TASK_STATUS
    },
  },
  methods: {
    handleTaskNameChange(value) {
      //
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  &__col {
    @apply overflow-hidden flex items-center;
    &--center {
      @apply mx-auto text-center justify-center;
    }
    & h6 {
      @apply mb-0;
    }
  }
}
</style>
