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
import { mapGetters } from 'vuex'

import TaskGridAllTasks from '@/components/Organisms/TaskGrid/All/TaskGridAllTasks'
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
    ...mapGetters({
      currentTaskRunning: 'tasks/getCurrentTaskRunning',
      currentTaskSelected: 'tasks/getSinglesCurrentTaskSelected',
      currentArchivedTaskSelected:
        'tasks/getSinglesCurrentArchivedTaskSelected',
      allCurrentTabTasks: 'tasks/getAllCurrentTabTasks',
      allCurrentTabTasksArchived: 'tasks/getAllCurrentTabTasksArchived',
    }),
  },
}
</script>
