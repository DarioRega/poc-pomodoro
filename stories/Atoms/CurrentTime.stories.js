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
  template: '<current-time v-bind="$props"/>',
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
