<template>
  <section class="flex-1">
    <task-grid-header-all-tasks
      :labels="labels.header"
      :is-toggled="isToggled"
      :is-stacked="isStacked"
      class="mb-3 pb-2 border-b-2 border-dark-blue dark:border-celeste"
    />
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
    />
  </section>
</template>

<script>
import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/TaskGridBodyAllTasks'
import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/TaskGridHeaderAllTasks'

export default {
  name: 'TaskGridAllTasks',
  components: {
    TaskGridHeaderAllTasks,
    TaskGridBodyAllTasks,
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
