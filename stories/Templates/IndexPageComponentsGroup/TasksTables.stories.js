import TaskTables from '@/components/Templates/IndexPageComponentsGroup/TaskTables'

export default {
  title: 'Templates/IndexPage/TaskTables',
  component: TaskTables,
  argType: {
    isLayoutStacked: {
      control: {
        type: 'radio',
        options: [true, false],
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskTables },
  data() {
    return {
      stacked: true,
    }
  },
  template: `<task-tables v-bind='$props'
              :is-layout-stacked="isLayoutStacked"
  />`,
})

export const Default = Template.bind({})
