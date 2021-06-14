<template>
  <section class="flex flex-col justify-between items-center">
    <!--    ALL SECTION -->
    <task-grid-all-tasks
      :current-task-running="currentTaskRunning"
      :current-task-selected="currentTaskSelected"
      :tasks="allCurrentTabTasks"
      :is-layout-stacked="isLayoutStacked"
      class="mb-12"
    />

    <!--     ARCHIVED TASKS -->
    <task-grid-archived
      :current-task-selected="currentArchivedTaskSelected"
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
    /*
    Default
    */
    currentTaskSelected() {
      return this.$store.state.tasks.singles.currentTaskSelected
    },
    allCurrentTabTasks() {
      return this.$store.state.tasks.singles.all.filter(
        (x) => x.task_status.name !== TASK_STATUS_VALUES.ARCHIVED
      )
    },
    /*
     Archived
     */
    currentArchivedTaskSelected() {
      return this.$store.state.tasks.singles.currentArchivedTaskSelected
    },
    allCurrentTabTasksArchived() {
      return this.$store.state.tasks.singles.all.filter(
        (x) => x.task_status.name === TASK_STATUS_VALUES.ARCHIVED
      )
    },

    currentTaskRunning() {
      // v2
      return this.$store.state.tasks.currentTaskRunning
    },
  },
}
</script>
