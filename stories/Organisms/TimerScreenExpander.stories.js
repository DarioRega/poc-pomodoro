import moment from 'moment-timezone'
import TimerScreenExpander from '../../components/Organisms/TimerScreenExpander'
import { POMODORO_STATUS } from '../../constantes'

export default {
  title: 'Organisms/TimerScreenExpander',
  component: TimerScreenExpander,
  argTypes: {
    currentStatus: {
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
  },
}

const Template = (args, { argTypes }) => ({
  components: { TimerScreenExpander },
  props: Object.keys(argTypes),
  data() {
    return {
      interval: null,
      timer: '',
    }
  },
  computed: {
    mockSessionsSteps() {
      return [
        { status: 'DONE' },
        { status: 'DONE' },
        { status: 'CURRENT' },
        { status: 'PENDING' },
      ]
    },
  },
  mounted() {
    if (args.currentStatus === POMODORO_STATUS.POMODORO.IN_PROGRESS) {
      const interval = 1000
      this.interval = setInterval(() => {
        const diff = moment(args.end_time).unix() - moment().unix()
        this.timer = moment.unix(diff).format('mm:ss')
      }, interval)
    }
    if (args.currentStatus === POMODORO_STATUS.SESSION.PENDING) {
      this.timer = '25:00'
    }
    if (args.currentStatus === POMODORO_STATUS.SMALL_BREAK.PENDING) {
      this.timer = '05:00'
    }
    if (args.currentStatus === POMODORO_STATUS.BIG_BREAK.PENDING) {
      this.timer = '15:00'
    }
    if (args.currentStatus === POMODORO_STATUS.POMODORO.IN_PROGRESS) {
      this.timer = '12:43'
    }
    if (args.currentStatus === POMODORO_STATUS.POMODORO.PENDING) {
      this.timer = '25:00'
    }
  },
  destroyed() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  template: `<timer-screen-expander :is-expanded='true' v-bind="$props" :current-timer="timer" current-session-end-time='15:32 AM' :session-steps='mockSessionsSteps' />`,
})

export const SessionPending = Template.bind({})
SessionPending.args = {
  currentStatus: POMODORO_STATUS.SESSION.PENDING,
  isSessionPending: true,
}

export const SessionStartedPomodoroPending = Template.bind({})
SessionStartedPomodoroPending.args = {
  currentStatus: POMODORO_STATUS.POMODORO.PENDING,
  isSessionStartedButPendingProcess: true,
}

export const SessionPomodoroRunning = Template.bind({})
SessionPomodoroRunning.args = {
  currentStatus: POMODORO_STATUS.POMODORO.IN_PROGRESS,
  isRunning: true,
  end_time: moment().add(28, 'minutes'),
}

export const SessionSmallBreakPending = Template.bind({})
SessionSmallBreakPending.args = {
  currentStatus: POMODORO_STATUS.SMALL_BREAK.PENDING,
  isSessionStartedButPendingProcess: true,
}

export const SessionPomodoroPaused = Template.bind({})
SessionPomodoroPaused.args = {
  currentStatus: POMODORO_STATUS.POMODORO.PAUSED,
  isPaused: true,
}
