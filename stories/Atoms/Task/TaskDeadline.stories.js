import dateFormat from 'dateformat'
import TaskDeadline from '../../../components/Atoms/Task/TaskDeadline'

export default {
  title: 'Atoms/Task/Deadline',
  component: TaskDeadline,
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    locale: {
      control: { type: 'select', options: ['fr', 'en'] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TaskDeadline },
  computed: {
    isTaskSelected() {
      return args.isSelected
    },
  },
  methods: {
    handleChange(dateTime, dateString) {
      console.log(dateTime)
      // NOTE format is yyyy-mm-dd, keep it in mind when formatting the value on main component afterward
      console.log(dateString)
      this.value = dateFormat(dateString, 'dd.mm.yyyy')
    },
  },
  template: `
    <div class="w-full max-w-lg mx-auto flex justify-center" :class="isTaskSelected && 'task--selected'">
    <task-deadline v-bind="$props" @onChange="handleChange" />
    </div>`,
})

export const WithoutValue = Template.bind({})
WithoutValue.args = {
  closeButtonText: 'Close',
}

export const WithValue = Template.bind({})
WithValue.args = {
  closeButtonText: 'Close',
  value: '17.02.2020',
}

export const Selected = Template.bind({})
Selected.args = {
  closeButtonText: 'Close',
  isSelected: true,
  value: '17.02.2020',
}

export const WithDifferentLocale = Template.bind({})
WithDifferentLocale.args = {
  closeButtonText: 'Close',
  locale: 'fr',
  value: '17.02.2020',
}
