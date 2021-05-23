import TimerSidebarExpanderStacked from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarExpanderStacked'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarExpanderStacked',
  component: TimerSidebarExpanderStacked,
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
  components: { TimerSidebarExpanderStacked },
  template: `
    <div class="w-24">
        <div class="timer-sidebar--stacked">
          <timer-sidebar-expander-stacked v-bind="$props" :labels="getLabels" />
        </div>  
    </div>`,
})

export const Default = Template.bind({})
Default.args = {}
