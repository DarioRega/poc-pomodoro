import TimerSidebarClock from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarClock'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarClock',
  component: TimerSidebarClock,
  argTypes: {
    type: {
      control: { type: 'select', options: ['primary', 'secondary', 'naked'] },
    },
    isDisabled: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  computed: {
    getLabels() {
      return {
        resume: 'Resume',
        pause: 'Pause',
        stop: 'Stop',
        start: 'Start',
        startSession: 'Start session',
        restartCurrentSession: 'Restart session',
      }
    },
    shouldStack() {
      return args.isStacked
    },
  },
  components: { TimerSidebarClock },
  template: `
    <div :class="shouldStack ? 'w-24' : 'w-72'">
        <div :class="shouldStack ? 'timer-sidebar--stacked' : 'timer-sidebar'">
          <timer-sidebar-clock v-bind="$props" :labels="getLabels" />
        </div>  
    </div>`,
})

export const Default = Template.bind({})
Default.args = {
  currentTimer: '20:00',
}

export const SessionPending = Template.bind({})
SessionPending.args = {
  isSessionPending: true,
  currentTimer: '25:00',
}

export const ShowStartText = Template.bind({})
ShowStartText.args = {
  shouldShowStartText: true,
  currentTimer: '05:00',
}

export const StackedDefault = Template.bind({})
StackedDefault.args = {
  isStacked: true,
  currentTimer: '20:00',
}

export const StackedPending = Template.bind({})
StackedPending.args = {
  isStacked: true,
  isSessionPending: true,
  currentTimer: '20:00',
}
