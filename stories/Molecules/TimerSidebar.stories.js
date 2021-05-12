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
    currentStatusEndTime: {
      control: {
        type: 'number',
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
  computed: {
    shouldStack() {
      return args.isStacked
    },
  },
  template: `
    <div :class="shouldStack && 'w-24'">
      <timer-sidebar v-bind="$props"/>
    </div>
`,
})

export const UnstackedSessionPending = Template.bind({})
UnstackedSessionPending.args = {
  status: POMODORO_STATUS.POMODORO.pending,
  startSessionText: 'Start session',
}

export const UnstackedSessionRunning = Template.bind({})
UnstackedSessionRunning.args = {
  status: POMODORO_STATUS.POMODORO.started,
  startSessionText: 'Start session',
  currentStatusEndTime: moment().add(20, 'minutes'),
}
