import TimerSidebarExpanderUnstacked from '../../../components/Atoms/TimerSidebarChildren/TimerSidebarExpanderUnstacked'

export default {
  title: 'Atoms/TimerSidebarChildren/TimerSidebarExpanderUnstacked',
  component: TimerSidebarExpanderUnstacked,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: { TimerSidebarExpanderUnstacked },
  template: `
    <div class="w-72">
        <div class="timer-sidebar">
          <timer-sidebar-expander-unstacked />
        </div>
    </div>`,
})

export const Default = Template.bind({})
