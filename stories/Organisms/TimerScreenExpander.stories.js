import moment from 'moment-timezone'
import TimerScreenExpander from '../../components/Organisms/TimerScreenExpander'
import { POMODORO_STATUS } from '../../constantes'

export default {
  title: 'Organisms/TimerScreenExpander',
  component: TimerScreenExpander,
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
  },
}

const Template = (args, { argTypes }) => ({
  components: { TimerScreenExpander },
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
  template: `<timer-screen-expander v-bind="$props" :current-timer="timer" current-session-end-time='15:32 AM' :session-steps='mockSessionsSteps' :labels="getLabels"/>`,
})

export const SessionPending = Template.bind({})
SessionPending.args = {
  status: POMODORO_STATUS.SESSION.pending,
  isSessionPending: true,
  isPending: true,
}

export const SessionStartedPomodoroPending = Template.bind({})
SessionStartedPomodoroPending.args = {
  status: POMODORO_STATUS.POMODORO.pending,
  isSessionStartedButPendingProcess: true,
  isPending: true,
}

export const SessionPomodoroRunning = Template.bind({})
SessionPomodoroRunning.args = {
  status: POMODORO_STATUS.POMODORO.started,
  isRunning: true,
  end_time: moment().add(28, 'minutes'),
}

export const SessionSmallBreakPending = Template.bind({})
SessionSmallBreakPending.args = {
  status: POMODORO_STATUS.SMALL_BREAK.pending,
  isSessionStartedButPendingProcess: true,
  isPending: true,
}

export const SessionPomodoroPaused = Template.bind({})
SessionPomodoroPaused.args = {
  status: POMODORO_STATUS.POMODORO.paused,
  isPaused: true,
}
