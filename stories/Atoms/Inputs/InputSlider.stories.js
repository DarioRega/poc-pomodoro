import InputSlider from '../../../components/Atoms/Inputs/InputSlider'

export default {
  title: 'Atoms/Inputs/Slider',
  component: InputSlider,
  argTypes: {
    value: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    hasTooltip: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { InputSlider },
  methods: {
    handleChange(value) {
      this.value = value
    },
  },
  template: `<div class="w-48 mt-10">
      <input-slider v-bind="$props" @change="handleChange">
        <div v-if="${'hint' in args}">${args.hint}</div>
      </input-slider>
    </div>`,
})

export const Default = Template.bind({})
Default.args = {
  value: 20,
  min: 5,
  max: 60,
}

export const WithToolTip = Template.bind({})
WithToolTip.args = {
  value: 20,
  min: 5,
  max: 60,
  hasTooltip: true,
}

export const WithCustomSlot = Template.bind({})
WithCustomSlot.args = {
  value: 20,
  min: 5,
  max: 60,
  hint: `<p class="text-sm">{{ value }} minutes</p>`,
}
