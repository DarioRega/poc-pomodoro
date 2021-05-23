import PomodoroCounter from '../../components/Atoms/PomodoroCounter'

export default {
  title: 'Atoms/PomodoroCounter',
  component: PomodoroCounter,
  argTypes: {
    status: {
      control: { type: 'select', options: ['CURRENT', 'DONE', 'PENDING'] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PomodoroCounter },
  data() {
    return {
      list: [
        { status: 'DONE' },
        { status: 'DONE' },
        { status: 'CURRENT' },
        { status: 'PENDING' },
      ],
    }
  },
  template: `
    <div>
    <div v-if="${args.asList}">
      <pomodoro-counter v-for="(item,index) in list" :key="item" class="w-8 h-8" :class="index < list.length && 'mr-2'" v-bind="$props" :status="item.status" />
    </div>
      <pomodoro-counter v-else v-bind="$props" class="w-8 h-8" />
    </div>`,
})

export const DefaultPending = Template.bind({})

export const Done = Template.bind({})
Done.args = {
  status: 'DONE',
}

export const Current = Template.bind({})
Current.args = {
  status: 'CURRENT',
}

export const ExampleAsList = Template.bind({})
ExampleAsList.args = {
  asList: true,
}
