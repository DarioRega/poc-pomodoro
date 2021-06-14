<template>
  <section class="flex justify-between items-center">
    <!--    ALL SECTION -->
    <task-grid-all-tasks
      :current-task-running="currentTaskRunning"
      :current-task-selected="currentTaskSelected"
      :tasks="allCurrentTabTasks"
      :is-layout-stacked="isLayoutStacked"
    />
  </section>
</template>

<script>
import TaskGridAllTasks from '@/components/Organisms/TaskGrid/TaskGridAllTasks'

export default {
  name: 'IndexTopHeader',
  components: { TaskGridAllTasks },
  props: {
    isLayoutStacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    allCurrentTabTasks() {
      return this.$store.state.tasks.allSingles
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
