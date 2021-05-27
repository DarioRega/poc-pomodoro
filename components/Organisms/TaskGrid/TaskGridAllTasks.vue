<template>
  <section class="flex-1">
    <task-grid-header-all-tasks
      :labels="labels.header"
      :is-toggled="isToggled"
      :is-stacked="isStacked"
      class="mb-4"
    />
    <div class="max-h-[24rem] overflow-y-auto">
      <task-grid-body-all-tasks
        v-for="(task, index) in tasks"
        :key="task.id"
        :task="task"
        :is-selected="currentTaskSelected.id === task.id"
        :current-task-selected="currentTaskSelected"
        :is-first-row="index === 0"
        :is-stacked="isStacked"
        :labels="labels.body"
        class="mb-3"
        @onTargetClick="handleClickTaskTarget"
        @onTaskNameChange="handleChangeTaskName"
        @onTaskStatusChange="handleChangeTaskStatus"
        @onTaskDescriptionChange="handleChangeTaskDescription"
        @onDeadlineChange="handleChangeDeadline"
      >
        <div class="fixed w-4/12 -mt-4 right-0 px-4 mr-4">
          <BrandTextarea
            v-show="index === 0"
            :value="currentTaskSelected.description"
            :name="labels.taskDescription"
            :is-selected="isSelected"
            type="task"
            class="w-full block top-0 left-0 right-0 pr-3"
            @change="handleChangeTaskDescription"
          />
        </div>
      </task-grid-body-all-tasks>
    </div>
  </section>
</template>

<script>
import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/TaskGridBodyAllTasks'
import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/TaskGridHeaderAllTasks'
import BrandTextarea from '@/components/Atoms/Inputs/BrandTextarea'

export default {
  name: 'TaskGridAllTasks',
  components: {
    TaskGridHeaderAllTasks,
    TaskGridBodyAllTasks,
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
    currentTaskSelected: {
      type: Object,
      default: () => ({}),
    },
    tasks: {
      type: Array,
      required: true,
    },
    isStacked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isToggled: false,
    }
  },
  methods: {
    handleClickTaskTarget(taskId) {
      // TODO handle
    },
    handleChangeTaskName(value, taskId) {
      // TODO handle
    },
    handleChangeTaskStatus(statusId, taskId) {
      // TODO handle
    },
    handleChangeTaskDescription(value) {
      // TODO handle
      // /!\ add in handler these params  => (this.currentTaskSelected.id, value)
    },
    handleChangeDeadline({ dateTime, dateString, locale }, taskId) {
      // TODO handle
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  & .task-name {
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
