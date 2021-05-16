import moment from 'moment-timezone'
import TimerSidebar from '../../components/Molecules/TimerSidebar/TimerSidebar'
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
    <div :class="shouldStack ? 'w-24 mx-auto bg-lighter-white dark:bg-dark-blue' : 'w-72'">
      <timer-sidebar v-bind="$props" :current-timer="timer" :labels="getLabels">
        <template v-if="${'currentSessionInformations' in
          args}" #currentSessionInformations>${
    args.currentSessionInformations
  }</template>
      </timer-sidebar>
    </div>
`,
})

export const UnstackedSessionPending = Template.bind({})
UnstackedSessionPending.args = {
  status: POMODORO_STATUS.SESSION.pending,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
}

export const UnstackedSessionPomodoroPending = Template.bind({})
UnstackedSessionPomodoroPending.args = {
  status: POMODORO_STATUS.POMODORO.pending,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
}

export const UnstackedSessionPomodoroRunning = Template.bind({})
UnstackedSessionPomodoroRunning.args = {
  status: POMODORO_STATUS.POMODORO.started,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
  currentStatusEndTime: moment().add(28, 'minutes'),
}

export const UnstackedSessionSmallBreakPending = Template.bind({})
UnstackedSessionSmallBreakPending.args = {
  status: POMODORO_STATUS.SMALL_BREAK.pending,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
  currentStatusEndTime: moment().add(12, 'minutes'),
}

export const UnstackedSessionPaused = Template.bind({})
UnstackedSessionPaused.args = {
  status: POMODORO_STATUS.POMODORO.paused,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
}

export const StackedSessionPending = Template.bind({})
StackedSessionPending.args = {
  status: POMODORO_STATUS.SESSION.pending,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
  isStacked: true,
}

export const StackedSessionPomodoroPending = Template.bind({})
StackedSessionPomodoroPending.args = {
  status: POMODORO_STATUS.POMODORO.pending,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
  isStacked: true,
}

export const StackedSessionPomodoroRunning = Template.bind({})
StackedSessionPomodoroRunning.args = {
  status: POMODORO_STATUS.POMODORO.started,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
  isStacked: true,
  currentStatusEndTime: moment().add(28, 'minutes'),
}

export const StackedSessionSmallBreakPending = Template.bind({})
StackedSessionSmallBreakPending.args = {
  status: POMODORO_STATUS.SMALL_BREAK.pending,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
  isStacked: true,
  currentStatusEndTime: moment().add(12, 'minutes'),
}

export const StackedSessionPaused = Template.bind({})
StackedSessionPaused.args = {
  status: POMODORO_STATUS.POMODORO.paused,
  currentSessionInformations: `
  <div class="text-center max-w-full flex flex-col flex-wrap">
  <p>Current session will end at 15:04 PM</p>
  <p>Component showing on many pomodoro done and left</p>
  </div>
  `,
  isStacked: true,
}
