<template>
  <div>
    <task-grid-all-tasks
      :labels="getLabels"
      :current-task-selected="currentTaskSelected"
      :current-task-running="currentTaskRunning"
      :tasks="tasks"
    />
  </div>
</template>

<script>
import { FAKER_TASK_STATUS_NAMES, TASK_STATUS_VALUES } from '@/constantes'
import TaskGridAllTasks from '@/components/Organisms/TaskGrid/TaskGridAllTasks'

export default {
  name: 'TaskGrid',
  components: { TaskGridAllTasks },
  data() {
    return {
      currentTaskSelected: {
        id: 2,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        status: {
          id: 1,
          value: TASK_STATUS_VALUES.DONE,
          name: FAKER_TASK_STATUS_NAMES.DONE,
        },
      },
      currentTaskRunning: {
        id: 3,
      },
      tasks: [
        {
          id: 441,
          status: {
            id: 3,
            value: TASK_STATUS_VALUES.IN_PROGRESS,
            name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
          },
          name: 'Complete Wireframes',
          deadline: '19.06.2021',
        },
        {
          id: 322,
          status: {
            id: 1,
            value: TASK_STATUS_VALUES.DONE,
            name: FAKER_TASK_STATUS_NAMES.DONE,
          },
          name: 'Fyl to Bangaloor',
          deadline: '19.06.2021',
        },
        {
          id: 343,
          status: {
            id: 3,
            value: TASK_STATUS_VALUES.TODO,
            name: FAKER_TASK_STATUS_NAMES.TODO,
          },
          name: 'Draw a car',
          deadline: '',
        },
        {
          id: 4654,
          status: {
            id: 1,
            value: TASK_STATUS_VALUES.DONE,
            name: FAKER_TASK_STATUS_NAMES.DONE,
          },
          name: 'Draw a car',
          deadline: '',
        },
      ],
    }
  },
  computed: {
    getLabels() {
      return {
        header: {
          all: 'All',
          status: 'Status',
          deadline: 'Deadline',
          description: 'Description',
          showCompletedTasks: 'Show completed tasks',
          showCompletedTasksCut: 'Show completed',
        },
        body: {
          taskName: 'Task name',
          taskStatusName: 'Task status',
          taskDescription: 'Task description',
          closeCalendar: 'Close',
        },
        general: {
          amountOfTasksToDisplay: 'Tasks to display',
        },
      }
    },
  },
}
</script>
