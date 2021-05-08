import IconButton from '../../components/Atoms/IconButton'

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  argTypes: {
    iconName: {
      control: { type: 'text' },
    },
    classes: {
      control: { type: 'text' },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large', 'xlarge'],
      },
    },
    withBackground: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { IconButton },
  template: '<icon-button v-bind="$props" />',
})

export const DefaultLarge = Template.bind({})
DefaultLarge.args = {
  iconName: 'eye',
}
export const WithoutBackgroundSmall = Template.bind({})
WithoutBackgroundSmall.args = {
  iconName: 'eye',
  size: 'small',
}
export const WithoutBackgroundMedium = Template.bind({})
WithoutBackgroundMedium.args = {
  iconName: 'eye',
  size: 'medium',
}
export const WithoutBackgroundXLarge = Template.bind({})
WithoutBackgroundXLarge.args = {
  iconName: 'eye',
  size: 'xlarge',
}

export const WithBackgroundSmall = Template.bind({})
WithBackgroundSmall.args = {
  iconName: 'arrowRight',
  size: 'small',
  classes: 'text-celeste bg-dark-indigo dark:bg-light-indigo',
  withBackground: true,
}

export const WithBackgroundMedium = Template.bind({})
WithBackgroundMedium.args = {
  iconName: 'checkMark',
  size: 'medium',
  withBackground: true,
  classes: 'text-celeste bg-success hover:bg-opacity-90',
}

export const WithBackgroundLarge = Template.bind({})
WithBackgroundLarge.args = {
  iconName: 'checkMark',
  size: 'large',
  classes: 'text-celeste bg-success',
  withBackground: true,
}

export const WithBackgroundXLarge = Template.bind({})
WithBackgroundXLarge.args = {
  iconName: 'checkMark',
  size: 'xlarge',
  classes: 'text-celeste bg-success',
  withBackground: true,
}

export const WithBackgroundDefaultClasses = Template.bind({})
WithBackgroundDefaultClasses.args = {
  iconName: 'arrowRight',
  size: 'medium',
  withBackground: true,
}
