import TimerSidebarExpanderUnstacked from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarExpanderUnstacked'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarExpanderUnstacked',
  component: TimerSidebarExpanderUnstacked,
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
  },
  components: { TimerSidebarExpanderUnstacked },
  template: `
    <div class="w-72">
        <div class="timer-sidebar">
          <timer-sidebar-expander-unstacked v-bind="$props" :labels="getLabels" />
        </div>  
    </div>`,
})

export const Default = Template.bind({})
Default.args = {}
