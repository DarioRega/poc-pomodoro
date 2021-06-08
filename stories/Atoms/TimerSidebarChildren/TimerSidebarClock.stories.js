import TimerSidebarClock from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarClock'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarClock',
  component: TimerSidebarClock,
  argTypes: {},
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
        <timer-sidebar-clock v-bind='$props' />
      </div>
      </div>`,
})

export const Default = Template.bind({})

export const SessionPending = Template.bind({})

export const ShowStartText = Template.bind({})

export const StackedDefault = Template.bind({})

export const StackedPending = Template.bind({})
