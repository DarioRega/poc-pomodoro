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
        currentSessionInformation: 'Current session will end at',
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
