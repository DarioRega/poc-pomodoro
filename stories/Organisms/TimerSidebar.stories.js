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
    isLayoutStacked: {
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
    }
  },
  mounted() {
    if (args.status === POMODORO_STATUS.POMODORO.IN_PROGRESS) {
      const interval = 1000
      this.interval = setInterval(() => {
        const diff = moment(args.end_time).unix() - moment().unix()
        this.timer = moment.unix(diff).format('mm:ss')
      }, interval)
    }
    if (args.status === POMODORO_STATUS.SESSION.PENDING) {
      this.timer = '25:00'
    }
    if (args.status === POMODORO_STATUS.SMALL_BREAK.PENDING) {
      this.timer = '05:00'
    }
    if (args.status === POMODORO_STATUS.BIG_BREAK.PENDING) {
      this.timer = '15:00'
    }
    if (args.status === POMODORO_STATUS.POMODORO.PAUSED) {
      this.timer = '12:43'
    }
    if (args.status === POMODORO_STATUS.POMODORO.PENDING) {
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
      return args.isLayoutStacked
    },
  },
  template: `
    <div :class="shouldStack ? 'w-24 mx-auto bg-lighter-white dark:bg-dark-blue' : 'w-72'">
      <timer-sidebar v-bind="$props" :current-timer="timer"  />
    </div>
`,
})

export const SessionPending = Template.bind({})
SessionPending.args = {
  status: POMODORO_STATUS.SESSION.PENDING,
  currentSessionEndTime: '15:35 AM',
  isSessionPending: true,
}

export const SessionStartedPomodoroPending = Template.bind({})
SessionStartedPomodoroPending.args = {
  status: POMODORO_STATUS.POMODORO.PENDING,
  currentSessionEndTime: '15:35 AM',
  isSessionStartedButPendingProcess: true,
}

export const SessionPomodoroRunning = Template.bind({})
SessionPomodoroRunning.args = {
  status: POMODORO_STATUS.POMODORO.IN_PROGRESS,
  currentSessionEndTime: '15:35 AM',
  isRunning: true,
  end_time: moment().add(28, 'minutes'),
}

export const SessionSmallBreakPending = Template.bind({})
SessionSmallBreakPending.args = {
  status: POMODORO_STATUS.SMALL_BREAK.PENDING,
  currentSessionEndTime: '15:35 AM',
  isSessionStartedButPendingProcess: true,
}

export const SessionPomodoroPaused = Template.bind({})
SessionPomodoroPaused.args = {
  status: POMODORO_STATUS.POMODORO.PAUSED,
  currentSessionEndTime: '15:35 AM',
  isPaused: true,
}

// STACKED EXAMPLES
export const StackedSessionPending = Template.bind({})
StackedSessionPending.args = {
  status: POMODORO_STATUS.SESSION.PENDING,
  currentSessionEndTime: '15:35 AM',
  isSessionPending: true,
  isLayoutStacked: true,
}

export const StackedSessionStartedPomodoroPending = Template.bind({})
StackedSessionStartedPomodoroPending.args = {
  status: POMODORO_STATUS.POMODORO.PENDING,
  currentSessionEndTime: '15:35 AM',
  isSessionStartedButPendingProcess: true,
  isLayoutStacked: true,
}

export const StackedSessionPomodoroRunning = Template.bind({})
StackedSessionPomodoroRunning.args = {
  status: POMODORO_STATUS.POMODORO.IN_PROGRESS,
  currentSessionEndTime: '15:35 AM',
  isRunning: true,
  end_time: moment().add(28, 'minutes'),
  isLayoutStacked: true,
}

export const StackedSessionSmallBreakPending = Template.bind({})
StackedSessionSmallBreakPending.args = {
  status: POMODORO_STATUS.SMALL_BREAK.PENDING,
  currentSessionEndTime: '15:35 AM',
  isSessionStartedButPendingProcess: true,
  isLayoutStacked: true,
}

export const StackedSessionPomodoroPaused = Template.bind({})
StackedSessionPomodoroPaused.args = {
  status: POMODORO_STATUS.POMODORO.PAUSED,
  currentSessionEndTime: '15:35 AM',
  isPaused: true,
  isLayoutStacked: true,
}
