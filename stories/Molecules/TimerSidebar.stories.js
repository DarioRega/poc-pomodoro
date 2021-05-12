import moment from 'moment-timezone'
import TimerSidebar from '../../components/Molecules/TimerSidebar'
import { POMODORO_STATUS } from '../../constantes'

export default {
  title: 'Molecules/TimerSidebar',
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
    startSessionText: {
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
      },
    }
  },
  mounted() {
    if (args.status === POMODORO_STATUS.POMODORO.started) {
      const interval = 1000
      this.interval = setInterval(() => {
        const diff = moment(args.currentStatusEndTime).unix() - moment().unix()
        this.timer = moment.unix(diff).format('mm:ss')
      }, interval)
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
    <div :class="shouldStack && 'w-24'">
      <timer-sidebar v-bind="$props" :current-timer="timer" :labels="getLabels"/>
    </div>
`,
})

export const UnstackedSessionPending = Template.bind({})
UnstackedSessionPending.args = {
  status: POMODORO_STATUS.SESSION.pending,
}

export const UnstackedSessionPomodoroPending = Template.bind({})
UnstackedSessionPomodoroPending.args = {
  status: POMODORO_STATUS.POMODORO.pending,
}

export const UnstackedSessionPomodoroRunning = Template.bind({})
UnstackedSessionPomodoroRunning.args = {
  status: POMODORO_STATUS.POMODORO.started,
  currentStatusEndTime: moment().add(28, 'minutes'),
}

export const UnstackedSessionSmallBreakPending = Template.bind({})
UnstackedSessionSmallBreakPending.args = {
  status: POMODORO_STATUS.SMALL_BREAK.pending,
  currentStatusEndTime: moment().add(12, 'minutes'),
}

export const UnstackedSessionPaused = Template.bind({})
UnstackedSessionPaused.args = {
  status: POMODORO_STATUS.POMODORO.paused,
}
