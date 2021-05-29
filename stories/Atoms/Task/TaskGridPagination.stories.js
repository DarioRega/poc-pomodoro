import TaskGridPagination from '../../../components/Atoms/Task/TaskGridPagination'

export default {
  title: 'Atoms/Task/GridPagination',
  component: TaskGridPagination,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskGridPagination },
  template: `<div class="w-full max-w-sm"><task-grid-pagination v-bind="$props" /></div>`,
})

export const Default = Template.bind({})
Default.args = {}
