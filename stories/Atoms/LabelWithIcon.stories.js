import Icon from '../../components/Atoms/Icon'
import LabelWithIcon from '../../components/Atoms/LabelWithIcon'

export default {
  title: 'Atoms/LabelWithIcon',
  component: LabelWithIcon,
  argTypes: {
    clickable: {
      control: { type: 'radio', options: [true, false] },
    },
    iconName: {
      control: { type: 'text' },
    },
    label: {
      control: { type: 'text' },
    },
    classes: {
      control: { type: 'text' },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LabelWithIcon, Icon },
  computed: {
    shouldApplySelectedClass() {
      return args.isSelected
    },
  },
  template: `
    <div class="max-w-sm">
    <label-with-icon v-bind="$props" :class="shouldApplySelectedClass && 'selected'">
      <template v-slot:label>${args.label}</template>
    </label-with-icon>
    </div>`,
})

export const Default = Template.bind({})
Default.args = {
  label: `<p>Email verified</p>`,
  iconName: 'checkMarkBold',
}

export const WithCustomClasses = Template.bind({})
WithCustomClasses.args = {
  label: `<p class="font-bold">Email verified</p>`,
  iconName: 'checkMark',
  classes: 'text-success',
}

export const Clickable = Template.bind({})
Clickable.args = {
  label: `<a role="button" class="label-with-icon__slot">Deployment API</a>`,
  iconName: 'pin',
  clickable: true,
  classes: 'label-with-icon--clickable',
}

export const ClickableSelected = Template.bind({})
ClickableSelected.args = {
  label: `<a role="button" class="label-with-icon__slot">Deployment API</a>`,
  iconName: 'pin',
  isSelected: true,
  clickable: true,
  classes: 'label-with-icon--clickable',
}
