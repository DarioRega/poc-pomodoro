import SettingsPanelPomodoroConfigTab from '@/components/Organisms/SettingsPanels/SettingsPanelPomodoroConfigTab'

export default {
  title: 'Organisms/SettingsPanels/PomodoroConfig',
  component: SettingsPanelPomodoroConfigTab,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SettingsPanelPomodoroConfigTab },
  computed: {
    mockValues() {
      return {
        pomodoro_duration: 25,
        small_break_duration: 5,
        big_break_duration: 15,
        pomodoro_quantity: 5,
        noise_notification_end_process: false,
        start_pomodoro_auto: true,
        start_small_break_auto: true,
        start_big_break_auto: false,
      }
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <settings-panel-pomodoro-config-tab :values='mockValues' />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
