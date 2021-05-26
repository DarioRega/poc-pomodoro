import TaskTarget from '@/components/Atoms/Task/TaskTarget'

export default {
  title: 'Atoms/Task/TaskTarget',
  component: TaskTarget,
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
  components: { TaskTarget },
  template: '<task-target v-bind="$props" />',
})

export const DefaultUnselected = Template.bind({})

export const Selected = Template.bind({})
Selected.args = {
  isSelected: true,
}

export const Done = Template.bind({})
Done.args = {
  isComplete: true,
}
