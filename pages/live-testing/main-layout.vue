<template>
  <div class="app-layout">
    <sidebar
      class="app-layout__sidebar"
      :is-stacked="isStacked"
      @onToggleStacked="isStacked = $event"
    >
      <template #currentTime>
        <current-time :is24h="false" :is-stacked="isStacked" />
      </template>
      <template #timer>
        <timer-sidebar
          :is-stacked="isStacked"
          :status="status.POMODORO.started"
          current-timer="23:00"
          :labels="getLabels.clock"
        >
          <template #currentSessionInformations>
            <div class="text-center">
              <p>Current session will end at 14:30 PM</p>
            </div>
          </template>
        </timer-sidebar>
      </template>
    </sidebar>
    <section
      class="app-layout__main-content"
      :class="isStacked && 'app-layout__main-content--stacked'"
    >
      <div class="w-full pt-5">
        <task-grid-all-tasks
          :current-task-running="currentTaskRunning"
          :current-task-selected="currentTaskSelected"
          :tasks="tasks"
          :is-stacked="isStacked"
          :labels="getLabels"
        />
      </div>
    </section>
  </div>
</template>

<script>
import {
  FAKER_TASK_STATUS_NAMES,
  POMODORO_STATUS,
  TASK_STATUS_VALUES,
} from '@/constantes'
import TaskGridAllTasks from '@/components/Organisms/TaskGrid/TaskGridAllTasks'
import Sidebar from '@/components/Organisms/Sidebar'
import CurrentTime from '@/components/Atoms/CurrentTime'
import TimerSidebar from '@/components/Organisms/TimerSidebar'

export default {
  name: 'TaskGrid',
  components: { TaskGridAllTasks, Sidebar, CurrentTime, TimerSidebar },
  data() {
    return {
      isStacked: false,
      currentTaskSelected: {
        id: 342,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        status: {
          id: 2,
          value: TASK_STATUS_VALUES.TODO,
          name: FAKER_TASK_STATUS_NAMES.TODO,
        },
      },
      currentTaskRunning: {
        id: 1231,
      },
      tasks: [
        {
          id: 1231,
          status: {
            id: 2,
            value: TASK_STATUS_VALUES.IN_PROGRESS,
            name: FAKER_TASK_STATUS_NAMES.IN_PROGRESS,
          },
          name: 'Complete Wireframes',
          deadline: '19.06.2021',
        },
        {
          id: 342,
          status: {
            id: 3,
            value: TASK_STATUS_VALUES.TODO,
            name: FAKER_TASK_STATUS_NAMES.TODO,
          },
          name: 'Fyl to Bangaloor',
          deadline: '19.06.2021',
        },
        {
          id: 5453,
          status: {
            id: 3,
            value: TASK_STATUS_VALUES.TODO,
            name: FAKER_TASK_STATUS_NAMES.TODO,
          },
          name: 'Draw a car',
          deadline: '',
        },
        {
          id: 4563,
          status: {
            id: 1,
            value: TASK_STATUS_VALUES.DONE,
            name: FAKER_TASK_STATUS_NAMES.DONE,
          },
          name: 'Lorem Ipsum',
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
        clock: {
          resume: 'Resume',
          pause: 'Pause',
          stop: 'Stop',
          start: 'Start',
          startSession: 'Start session',
          restartCurrentSession: 'Restart session',
        },
      }
    },
    status() {
      return POMODORO_STATUS
    },
  },
}
</script>
