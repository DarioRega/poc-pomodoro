import { POMODORO_STATUS } from '@/constantes'
import TimerSidebarControls from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarControls'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarControls',
  component: TimerSidebarControls,
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
    isRunning: {
      control: { type: 'select', options: [true, false] },
    },
    isPaused: {
      control: { type: 'select', options: [true, false] },
    },
    isLayoutStacked: {
      control: { type: 'select', options: [true, false] },
    },
    isSessionPending: {
      control: { type: 'select', options: [true, false] },
    },
    currentSessionEndTime: {
      control: {
        type: 'text',
      },
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
Running.args = {
  isRunning: true,
}

export const Paused = Template.bind({})
Paused.args = {
  isPaused: true,
}

export const SessionStartedButPendingProcess = Template.bind({})
SessionStartedButPendingProcess.args = {
  isSessionStartedButPendingProcess: true,
}

export const StackedRunning = Template.bind({})
StackedRunning.args = {
  isLayoutStacked: true,
  isRunning: true,
}

export const StackedPaused = Template.bind({})
StackedPaused.args = {
  isLayoutStacked: true,
  isPaused: true,
}

export const StackedSessionStartedButPendingProcess = Template.bind({})
StackedSessionStartedButPendingProcess.args = {
  isLayoutStacked: true,
  isSessionStartedButPendingProcess: true,
}
