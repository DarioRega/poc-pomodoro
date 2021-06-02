import moment from 'moment-timezone'
import TimerSidebar from '../../components/Organisms/TimerSidebar'
import { POMODORO_STATUS } from '../../constantes'

export default {
  title: 'Organisms/TimerSidebar',
  component: TimerSidebar,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: [
          ...Object.values(POMODORO_STATUS.SESSION),
          ...Object.values(POMODORO_STATUS.POMODORO),
          ...Object.values(POMODORO_STATUS.SMALL_BREAK),
          ...Object.values(POMODORO_STATUS.BIG_BREAK),
        ],
      },
    },
    currentSessionEndTime: {
      control: {
        type: 'text',
      },
    },
    isStacked: {
      control: {
        type: 'radio',
        options: [true, false],
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  components: { TimerSidebar },
  props: Object.keys(argTypes),
  data() {
    return {
      interval: null,
      timer: '',
      getLabels: {
        resume: 'Resume',
        pause: 'Pause',
        stop: 'Stop',
        start: 'Start',
        startSession: 'Start session',
        restartCurrentSession: 'Restart session',
        currentSessionInformation: 'Current session will end at',
      },
    }
  },
  mounted() {
    if (args.status === POMODORO_STATUS.POMODORO.started) {
      const interval = 1000
      this.interval = setInterval(() => {
        const diff = moment(args.end_time).unix() - moment().unix()
        this.timer = moment.unix(diff).format('mm:ss')
      }, interval)
    }
    if (args.status === POMODORO_STATUS.SESSION.pending) {
      this.timer = '25:00'
    }
    if (args.status === POMODORO_STATUS.SMALL_BREAK.pending) {
      this.timer = '05:00'
    }
    if (args.status === POMODORO_STATUS.BIG_BREAK.pending) {
      this.timer = '15:00'
    }
    if (args.status === POMODORO_STATUS.POMODORO.paused) {
      this.timer = '12:43'
    }
    if (args.status === POMODORO_STATUS.POMODORO.pending) {
      this.timer = '25:00'
    }
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  computed: {
    shouldStack() {
      return args.isStacked
    },
  },
  template: `
    <div :class="shouldStack ? 'w-24 mx-auto bg-lighter-white dark:bg-dark-blue' : 'w-72'">
      <timer-sidebar v-bind="$props" :current-timer="timer" :labels="getLabels" />
    </div>
`,
})

export const SessionPending = Template.bind({})
SessionPending.args = {
  status: POMODORO_STATUS.SESSION.pending,
  currentSessionEndTime: '15:35 AM',
  isSessionPending: true,
  isPending: true,
}

export const SessionStartedPomodoroPending = Template.bind({})
SessionStartedPomodoroPending.args = {
  status: POMODORO_STATUS.POMODORO.pending,
  currentSessionEndTime: '15:35 AM',
  isSessionStartedButPendingProcess: true,
  isPending: true,
}

export const SessionPomodoroRunning = Template.bind({})
SessionPomodoroRunning.args = {
  status: POMODORO_STATUS.POMODORO.started,
  currentSessionEndTime: '15:35 AM',
  isRunning: true,
  end_time: moment().add(28, 'minutes'),
}

export const SessionSmallBreakPending = Template.bind({})
SessionSmallBreakPending.args = {
  status: POMODORO_STATUS.SMALL_BREAK.pending,
  currentSessionEndTime: '15:35 AM',
  isSessionStartedButPendingProcess: true,
  isPending: true,
}

export const SessionPomodoroPaused = Template.bind({})
SessionPomodoroPaused.args = {
  status: POMODORO_STATUS.POMODORO.paused,
  currentSessionEndTime: '15:35 AM',
  isPaused: true,
}

// STACKED EXAMPLES
export const StackedSessionPending = Template.bind({})
StackedSessionPending.args = {
  status: POMODORO_STATUS.SESSION.pending,
  currentSessionEndTime: '15:35 AM',
  isSessionPending: true,
  isPending: true,
  isStacked: true,
}

export const StackedSessionStartedPomodoroPending = Template.bind({})
StackedSessionStartedPomodoroPending.args = {
  status: POMODORO_STATUS.POMODORO.pending,
  currentSessionEndTime: '15:35 AM',
  isSessionStartedButPendingProcess: true,
  isPending: true,
  isStacked: true,
}

export const StackedSessionPomodoroRunning = Template.bind({})
StackedSessionPomodoroRunning.args = {
  status: POMODORO_STATUS.POMODORO.started,
  currentSessionEndTime: '15:35 AM',
  isRunning: true,
  end_time: moment().add(28, 'minutes'),
  isStacked: true,
}

export const StackedSessionSmallBreakPending = Template.bind({})
StackedSessionSmallBreakPending.args = {
  status: POMODORO_STATUS.SMALL_BREAK.pending,
  currentSessionEndTime: '15:35 AM',
  isSessionStartedButPendingProcess: true,
  isPending: true,
  isStacked: true,
}

export const StackedSessionPomodoroPaused = Template.bind({})
StackedSessionPomodoroPaused.args = {
  status: POMODORO_STATUS.POMODORO.paused,
  currentSessionEndTime: '15:35 AM',
  isPaused: true,
  isStacked: true,
}

// export const StackedSessionPending = Template.bind({})
// StackedSessionPending.args = {
//   status: POMODORO_STATUS.SESSION.pending,
// currentSessionEndTime: '15:35 AM',
//   currentSessionInformations: `
//   <div class="text-center max-w-full flex flex-col flex-wrap">
//     <p>Current session will end at 15:04 PM</p>
//     <p>Component showing on many pomodoro done and left</p>
//   </div>
//   `,
//   isStacked: true,
// }
//
// export const StackedSessionPomodoroPending = Template.bind({})
// StackedSessionPomodoroPending.args = {
//   status: POMODORO_STATUS.POMODORO.pending,
// currentSessionEndTime: '15:35 AM',
//   currentSessionInformations: `
//   <div class="text-center max-w-full flex flex-col flex-wrap">
//     <p>Current session will end at 15:04 PM</p>
//     <p>Component showing on many pomodoro done and left</p>
//   </div>
//   `,
//   isStacked: true,
// }
//
// export const StackedSessionPomodoroRunning = Template.bind({})
// StackedSessionPomodoroRunning.args = {
//   status: POMODORO_STATUS.POMODORO.started,
// currentSessionEndTime: '15:35 AM',
//   currentSessionInformations: `
//   <div class="text-center max-w-full flex flex-col flex-wrap">
//   <p>Current session will end at 15:04 PM</p>
//   <p>Component showing on many pomodoro done and left</p>
//   </div>
//   `,
//   isStacked: true,
//   currentStatusEndTime: moment().add(28, 'minutes'),
// }
//
// export const StackedSessionSmallBreakPending = Template.bind({})
// StackedSessionSmallBreakPending.args = {
//   status: POMODORO_STATUS.SMALL_BREAK.pending,
// currentSessionEndTime: '15:35 AM',
//   currentSessionInformations: `
//   <div class="text-center max-w-full flex flex-col flex-wrap">
//   <p>Current session will end at 15:04 PM</p>
//   <p>Component showing on many pomodoro done and left</p>
//   </div>
//   `,
//   isStacked: true,
//   currentStatusEndTime: moment().add(12, 'minutes'),
// }
//
// export const StackedSessionPaused = Template.bind({})
// StackedSessionPaused.args = {
//   status: POMODORO_STATUS.POMODORO.paused,
// currentSessionEndTime: '15:35 AM',
//   currentSessionInformations: `
//   <div class="text-center max-w-full flex flex-col flex-wrap">
//   <p>Current session will end at 15:04 PM</p>
//   <p>Component showing on many pomodoro done and left</p>
//   </div>
//   `,
//   isStacked: true,
// }
