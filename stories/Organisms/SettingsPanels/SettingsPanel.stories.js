import Modal from '@/components/Molecules/Modal/Modal'
import BrandButton from '@/components/Atoms/BrandButton'
import SettingsPanel from '@/components/Organisms/SettingsPanels/SettingsPanel'

export default {
  title: 'Organisms/SettingsPanels',
  component: SettingsPanel,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Modal, BrandButton, SettingsPanel },
  template: `
    <modal :is-open='true' size='large'>
    <template v-slot:header>
      <h5 class="text-dark-blue dark:text-celeste">Settings</h5>
    </template>
    <template v-slot:body>
      <settings-panel />
    </template>
    <template v-slot:footer >
      <div class="flex justify-end">
        <brand-button type="primary" >Close</brand-button>
      </div>
    </template>
    </modal>
  `,
})

export const Default = Template.bind({})
Default.args = {}
