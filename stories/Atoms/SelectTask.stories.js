import TargetTask from '../../components/Atoms/TargetTask'

export default {
  title: 'Atoms/Task/TargetTask',
  component: TargetTask,
  argTypes: {
    isSelected: {
      control: { type: 'select', options: [true, false] },
    },
    isComplete: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TargetTask },
  template: '<target-task v-bind="$props" />',
})

export const DefaultUnselected = Template.bind({})

export const Selected = Template.bind({})
Selected.args = {
  isSelected: true,
}

export const Completed = Template.bind({})
Completed.args = {
  isComplete: true,
}
