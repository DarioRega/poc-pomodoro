import TimerScreenExpander from '../../components/Organisms/TimerScreenExpander'

export default {
  title: 'Organisms/TimerScreenExpander',
  component: TimerScreenExpander,
}

const Template = (args, { argTypes }) => ({
  components: { TimerScreenExpander },
  props: Object.keys(argTypes),
  data() {
    return {
      timer: '25:00',
    }
  },
  computed: {
    mockSessionsSteps() {
      return [
        { status: 'DONE' },
        { status: 'DONE' },
        { status: 'CURRENT' },
        { status: 'PENDING' },
      ]
    },
  },
  template: `<timer-screen-expander :is-expanded='true' v-bind="$props" :current-timer="timer" current-session-end-time='15:32 AM' :session-steps='mockSessionsSteps' />`,
})

export const SessionPending = Template.bind({})

export const SessionStartedPomodoroPending = Template.bind({})

export const SessionPomodoroRunning = Template.bind({})

export const SessionSmallBreakPending = Template.bind({})

export const SessionPomodoroPaused = Template.bind({})
