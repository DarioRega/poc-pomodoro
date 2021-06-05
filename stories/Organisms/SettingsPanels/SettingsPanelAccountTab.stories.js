import SettingsPanelAccountTab from '@/components/Organisms/SettingsPanels/SettingsPanelAccountTab'

export default {
  title: 'Organisms/SettingsPanels/AccountTab',
  component: SettingsPanelAccountTab,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SettingsPanelAccountTab },
  computed: {
    mockValues() {
      return {
        fullName: 'Dario Regazzoni',
        email: 'dario.regazzoni@outlook.fr',
        password: 'proutkaka',
      }
    },
  },
  template: `
    <div class='max-w-3xl mx-auto bg-light-white dark:bg-darker-blue'>
    <div class="bg-lighter-white dark:bg-dark-blue p-6">
      <settings-panel-account-tab :values='mockValues' />
    </div>
    </div>
  `,
})

export const Default = Template.bind({})
