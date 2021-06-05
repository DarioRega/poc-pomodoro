import CurrentTime from '../../components/Atoms/CurrentTime'

export default {
  title: 'Atoms/CurrentTime',
  component: CurrentTime,
  argTypes: {
    timeZoneChoosen: {
      control: {
        type: 'select',
        options: ['America/New_York', 'Asia/Tokyo', ''],
      },
    },
    is24h: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CurrentTime },
  computed: {
    shouldStack() {
      return args.isLayoutStacked
    },
  },
  template: `
    <div :class="shouldStack && 'w-16'">
      <current-time v-bind="$props"/>
    </div>`,
})

export const AmPmDefault = Template.bind({})
AmPmDefault.args = {
  is24h: false,
  timeZoneChoosen: 'America/New_York',
}

export const AmPmDefaultEurope = Template.bind({})
AmPmDefaultEurope.args = {
  is24h: false,
}

export const NotAmPm = Template.bind({})
NotAmPm.args = {}

export const StackedAmPm = Template.bind({})
StackedAmPm.args = {
  isLayoutStacked: true,
  is24h: false,
}

export const StackedNotAmPm = Template.bind({})
StackedNotAmPm.args = {
  isLayoutStacked: true,
}
