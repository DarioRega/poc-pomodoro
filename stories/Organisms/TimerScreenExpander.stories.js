import moment from 'moment-timezone'
import TimerScreenExpander from '../../components/Organisms/TimerScreenExpander'
import { POMODORO_STATUS, STEPS_STATUS } from '../../constantes'

export default {
  title: 'Organisms/TimerScreenExpander',
  component: TimerScreenExpander,
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
    if (args.currentStatus) {
      if (args.currentStatus === STEPS_STATUS.IN_PROGRESS) {
        const interval = 1000
        this.interval = setInterval(() => {
          const diff = moment(args.end_time).unix() - moment().unix()
          this.timer = moment.unix(diff).format('mm:ss')
        }, interval)

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
      }
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

export const SessionStartedPomodoroPending = Template.bind({})

export const SessionPomodoroRunning = Template.bind({})

export const SessionSmallBreakPending = Template.bind({})

export const SessionPomodoroPaused = Template.bind({})
