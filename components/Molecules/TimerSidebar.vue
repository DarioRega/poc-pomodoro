<template>
  <div class="timer-sidebar">
    <!--    current session info-->
    <button
      class="timer-sidebar__clock w-32 h-32 rounded-full uppercase text-base font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-indigo dark:focus:ring-light-indigo"
      @click="handleClick"
    >
      <span v-if="isPomodoroPending">{{ startSessionText }}</span>
      <div
        v-else
        class="flex justify-center items-center heading-current-time__container"
        :class="isStacked ? 'flex-col' : 'flex-row'"
      >
        <h2>
          {{ currentTime | getOnlyHours }}
        </h2>
        <h2 v-if="!isStacked">
          :
        </h2>
        <h2>
          {{ currentTime | getOnlyMinutes }}
        </h2>
      </div>
    </button>
    <div class="timer-siderbar__expander">
      <!--      expander-->
    </div>
    <div class="timer-sidebar__controls flex justify-between flex-wrap">
      <!--      controls -->
    </div>
  </div>
</template>

<script>
import { POMODORO_STATUS } from '../../constantes'
import moment from 'moment-timezone'

export default {
  name: 'TimerSidebar',
  filters: {
    getOnlyHours(value) {
      if (value) {
        return value.split(':')[0]
      }
      return value
    },
    getOnlyMinutes(value) {
      if (value) {
        const minutes = value.split(':')[1]
        if (minutes.includes('AM')) {
          return minutes.split(' ')[0]
        }
        return minutes
      }
      return value
    },
  },
  props: {
    status: {
      type: String,
      default: POMODORO_STATUS.POMODORO.pending,
    },
    startSessionText: {
      type: String,
      required: true,
    },
    isStacked: {
      type: Boolean,
      default: false,
    },
    /**
     * The end time of current status Unix timestamp.
     * @currentStatusEndTime number, unix timestamp
     */
    currentStatusEndTime: 0,
  },
  computed: {
    currentTimer() {
      // if (this.timeZone) {
      //   const format = this.is24h ? 'HH:mm' : 'hh:mm A'
      //   return moment()
      //       .tz(this.timeZone)
      //       .format(format)
      // }
      return ''
    },
    isPomodoroPending() {
      if (this.status === POMODORO_STATUS.POMODORO.pending) {
        return true
      }
      return false
    },
  },
  mounted() {
    const ra = moment().add(5, 'days')
    const now = moment().valueOf()
    const ku = moment(new Date(2021, 5, 13)).valueOf()
    console.log('now', now)
    console.log('ku', ku)
    console.log('ra', ra.fromNow())
    console.log('now from now', moment(ku).fromNow())
    // console.log('ku from now', ku.fromNow())
    console.log('is pending ?', this.isPomodoroPending)
    console.log('status ?', this.status)
    console.log('status ?', this.statusText)
  },
  methods: {
    handleClick() {},
  },
}
</script>

<style scoped lang="scss">
.timer-sidebar {
  &__clock {
    @apply bg-dark-indigo text-celeste font-semibold font-timer;
    @apply dark:bg-light-indigo;
  }
}
</style>
