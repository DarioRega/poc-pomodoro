import TimerSidebarClock from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarClock'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarClock',
  component: TimerSidebarClock,
  argTypes: {
    currentTimer: {
      control: { type: 'text' },
    },
    isLayoutStacked: {
      control: { type: 'select', options: [true, false] },
    },
    isSessionPending: {
      control: { type: 'select', options: [true, false] },
    },
    shouldShowStartText: {
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
  components: { TimerSidebarClock },
  template: `
    <div :class="shouldStack ? 'w-24' : 'w-72'">
        <div :class="shouldStack ? 'timer-sidebar--stacked' : 'timer-sidebar'">
          <timer-sidebar-clock v-bind="$props" />
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
  isLayoutStacked: true,
  currentTimer: '20:00',
}

export const StackedPending = Template.bind({})
StackedPending.args = {
  isLayoutStacked: true,
  isSessionPending: true,
  currentTimer: '20:00',
}
