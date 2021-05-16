import TimerSidebarControls from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarControls'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarControls',
  component: TimerSidebarControls,
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
  components: { TimerSidebarControls },
  template: `
    <div :class="shouldStack ? 'w-24' : 'w-72'">
        <div :class="shouldStack ? 'timer-sidebar--stacked' : 'timer-sidebar'">
          <timer-sidebar-controls v-bind="$props" :labels="getLabels" />
        </div>  
    </div>`,
})

export const Running = Template.bind({})
Running.args = {
  isRunning: true,
}

export const Paused = Template.bind({})
Paused.args = {
  isPaused: true,
}

export const StatusPendingAndSessionAlreadyStarted = Template.bind({})
StatusPendingAndSessionAlreadyStarted.args = {
  isStatusPendingAndSessionAlreadyStarted: true,
}

export const StackedRunning = Template.bind({})
StackedRunning.args = {
  isStacked: true,
  isRunning: true,
}

export const StackedPaused = Template.bind({})
StackedPaused.args = {
  isStacked: true,
  isPaused: true,
}

export const StackedStatusPendingAndSessionAlreadyStarted = Template.bind({})
StackedStatusPendingAndSessionAlreadyStarted.args = {
  isStacked: true,
  isStatusPendingAndSessionAlreadyStarted: true,
}
