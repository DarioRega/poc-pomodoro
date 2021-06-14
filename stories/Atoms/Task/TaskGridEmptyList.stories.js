import TaskGridEmptyList from '../../../components/Atoms/Task/TaskGridEmptyList'

export default {
  title: 'Atoms/Task/GridEmptyList',
  component: TaskGridEmptyList,
  argTypes: {
    label: {
      control: { type: 'text' },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskGridEmptyList },
  template: `
    <div class="min-h-[22rem] h-px relative">
      <task-grid-empty-list v-bind='$props' />
    </div>`,
})

export const Default = Template.bind({})
Default.args = {}

export const WithCustomLabel = Template.bind({})
WithCustomLabel.args = {
  label: 'A custom label',
}
