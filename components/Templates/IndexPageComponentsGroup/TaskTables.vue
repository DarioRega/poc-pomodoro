<template>
  <section class="flex flex-col justify-between items-center">
    <!--    ALL SECTION -->
    <task-grid-all-tasks
      :current-task-running="currentTaskRunning"
      :current-task-selected="currentTaskSelected"
      :tasks="allCurrentTabTasks"
      :is-layout-stacked="isLayoutStacked"
    />

    <!--     ARCHIVED TASKS -->
    <task-grid-archived
      :current-task-running="currentTaskRunning"
      :current-task-selected="currentTaskSelected"
      :tasks="allCurrentTabTasksArchived"
      :is-layout-stacked="isLayoutStacked"
    />
  </section>
</template>

<script>
import TaskGridAllTasks from '@/components/Organisms/TaskGrid/All/TaskGridAllTasks'
import { TASK_STATUS_VALUES } from '@/constantes'
import TaskGridArchived from '@/components/Organisms/TaskGrid/Archived/TaskGridArchived'

export default {
  name: 'IndexTopHeader',
  components: { TaskGridAllTasks, TaskGridArchived },
  props: {
    isLayoutStacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    allCurrentTabTasks() {
      console.log('store', this.$store.state.tasks.allSingles)
      return this.$store.state.tasks.allSingles.filter(
        (x) => x.task_status.name !== TASK_STATUS_VALUES.ARCHIVED
      )
    },
    allCurrentTabTasksArchived() {
      return this.$store.state.tasks.allSingles.filter(
        (x) => x.task_status.name === TASK_STATUS_VALUES.ARCHIVED
      )
    },
    currentTaskRunning() {
      return this.$store.state.tasks.currentTaskRunning
    },
    currentTaskSelected() {
      return this.$store.state.tasks.currentTaskSelected
    },
  },
}
</script>
