import TimerSidebarControls from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarControls'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarControls',
  component: TimerSidebarControls,
  argTypes: {
    isLayoutStacked: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  computed: {
    shouldStack() {
      return args.isLayoutStacked
    },
  },
  components: { TimerSidebarControls },
  template: `
    <div :class="shouldStack ? 'w-24' : 'w-72'">
        <div :class="shouldStack ? 'timer-sidebar--stacked' : 'timer-sidebar'">
          <timer-sidebar-controls v-bind="$props"  />
        </div>
    </div>`,
})

export const Running = Template.bind({})
Running.args = {}

export const Paused = Template.bind({})
Paused.args = {}

export const SessionStartedButPendingProcess = Template.bind({})
SessionStartedButPendingProcess.args = {}

export const StackedRunning = Template.bind({})
StackedRunning.args = {
  isLayoutStacked: true,
}

export const StackedPaused = Template.bind({})
StackedPaused.args = {
  isLayoutStacked: true,
}

export const StackedSessionStartedButPendingProcess = Template.bind({})
StackedSessionStartedButPendingProcess.args = {
  isLayoutStacked: true,
}
