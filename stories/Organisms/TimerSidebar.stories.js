import TimerSidebar from '../../components/Organisms/TimerSidebar'

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
      timer: '25',
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
