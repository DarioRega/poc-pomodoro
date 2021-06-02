<!--<template>-->
<!--  <section>-->
<!--    <div class="app-layout">-->
<!--      <sidebar-->
<!--        class="app-layout__sidebar"-->
<!--        v-bind="$props"-->
<!--        :is-stacked="isStacked"-->
<!--        @onToggleStacked="isStacked = $event"-->
<!--      >-->
<!--        <template #currentTime>-->
<!--          <current-time :is24h="false" :is-stacked="isStacked" />-->
<!--        </template>-->
<!--        <template #timer>-->
<!--          <timer-sidebar-->
<!--            :is-stacked="isStacked"-->
<!--            :status="status.POMODORO.started"-->
<!--            current-timer="23:00"-->
<!--            :labels="labels.clock"-->
<!--          >-->
<!--            <template #currentSessionInformations>-->
<!--              <div class="text-center">-->
<!--                <p>Current session will end at 14:30 PM</p>-->
<!--              </div>-->
<!--            </template>-->
<!--          </timer-sidebar>-->
<!--        </template>-->
<!--      </sidebar>-->
<!--      <section-->
<!--        class="app-layout__main-content"-->
<!--        :class="isStacked && 'app-layout__main-content&#45;&#45;stacked'"-->
<!--      >-->
<!--        <div class="w-full">-->
<!--          <task-grid-all-tasks v-bind="$props" :labels="labels" />-->
<!--        </div>-->
<!--      </section>-->
<!--    </div>-->
<!--  </section>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'PageIndex.vue',-->
<!--  data() {-->
<!--    return {-->
<!--      isStacked: false,-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    labels() {-->
<!--      return {-->
<!--        header: {-->
<!--          all: 'All',-->
<!--          status: 'Status',-->
<!--          deadline: 'Deadline',-->
<!--          description: 'Description',-->
<!--          showCompletedTasks: 'Show completed tasks',-->
<!--          showCompletedTasksCut: 'Show completed',-->
<!--        },-->
<!--        body: {-->
<!--          taskName: 'Task name',-->
<!--          taskStatusName: 'Task status',-->
<!--          taskDescription: 'Task description',-->
<!--          closeCalendar: 'Close',-->
<!--        },-->
<!--        general: {-->
<!--          amountOfTasksToDisplay: 'Tasks to display',-->
<!--        },-->
<!--        clock: {-->
<!--          resume: 'Resume',-->
<!--          pause: 'Pause',-->
<!--          stop: 'Stop',-->
<!--          start: 'Start',-->
<!--          startSession: 'Start session',-->
<!--          restartCurrentSession: 'Restart session',-->
<!--        },-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--}-->
<!--</script>-->
