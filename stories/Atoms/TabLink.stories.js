import TabLink from '../../components/Atoms/TabLink'

export default {
  title: 'Atoms/TabLink',
  component: TabLink,
  argTypes: {
    type: {
      control: { type: 'radio', options: ['primary', 'default'] },
    },

    isActive: {
      control: { type: 'radio', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TabLink },
  template: '<tab-link v-bind="$props">{{ slotcontent }}</tab-link>',
})

export const Default = Template.bind({})
Default.args = {
  slotcontent: 'Subscription',
}

export const DefaultActive = Template.bind({})
DefaultActive.args = {
  slotcontent: 'Subscription',
  isActive: true,
}

export const Primary = Template.bind({})
Primary.args = {
  slotcontent: 'Subscription',
  type: 'primary',
}

export const PrimaryActive = Template.bind({})
PrimaryActive.args = {
  slotcontent: 'Subscription',
  type: 'primary',
  isActive: true,
}
