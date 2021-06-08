import moment from 'moment-timezone'
import TimerSidebar from '../../components/Organisms/TimerSidebar'
import { POMODORO_STATUS, STEPS_STATUS } from '../../constantes'

export default {
  title: 'Organisms/TimerSidebar',
  component: TimerSidebar,
  argTypes: {
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
    if (args.currentStatus) {
      if (args.currentStatus === STEPS_STATUS.IN_PROGRESS) {
        const interval = 1000
        this.interval = setInterval(() => {
          const diff = moment(args.end_time).unix() - moment().unix()
          this.timer = moment.unix(diff).format('mm:ss')
        }, interval)

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
      }
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

export const SessionStartedPomodoroPending = Template.bind({})

export const SessionPomodoroRunning = Template.bind({})

export const SessionSmallBreakPending = Template.bind({})

export const SessionPomodoroPaused = Template.bind({})

// STACKED EXAMPLES
export const StackedSessionPending = Template.bind({})
StackedSessionPending.args = {
  isLayoutStacked: true,
}
export const StackedSessionStartedPomodoroPending = Template.bind({})
StackedSessionStartedPomodoroPending.args = {
  isLayoutStacked: true,
}

export const StackedSessionPomodoroRunning = Template.bind({})
StackedSessionPomodoroRunning.args = {
  isLayoutStacked: true,
}

export const StackedSessionSmallBreakPending = Template.bind({})
StackedSessionSmallBreakPending.args = {
  isLayoutStacked: true,
}

export const StackedSessionPomodoroPaused = Template.bind({})
StackedSessionPomodoroPaused.args = {
  isLayoutStacked: true,
}
