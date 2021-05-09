import BrandTextarea from '../../components/Atoms/Inputs/BrandTextarea'

export default {
  title: 'Atoms/Inputs/Textarea',
  component: BrandTextarea,
  argTypes: {
    value: {
      control: { type: 'text' },
    },
    type: {
      control: { type: 'select', options: ['primary', 'task'] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BrandTextarea },
  computed: {
    hasErrors() {
      return args.errors
    },
  },
  template: `
    <div class="max-w-lg">
    <brand-textarea v-bind="$props">
      <template v-if="hasErrors" v-slot:errors>${args.errors}</template>
    </brand-textarea>
    </div>`,
})

export const Primary = Template.bind({})
Primary.args = {
  name: 'myTextarea',
  value:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export const TypeTaskWithSpacing = Template.bind({})
TypeTaskWithSpacing.args = {
  name: 'myTextarea',
  type: 'task',
  value: `
Step 1: Change the title and add a tag


-Create my first HackMD note (this one
-Change its title

-Add a tag
  `,
}

export const TypeTaskWithBlockText = Template.bind({})
TypeTaskWithBlockText.args = {
  name: 'myTextarea',
  type: 'task',
  value:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  value: 'Josef',
  label: 'Name',
  name: 'name',
}

export const HasError = Template.bind({})
HasError.args = {
  name: 'myName',
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}

export const HasErrorWithLabel = Template.bind({})
HasErrorWithLabel.args = {
  name: 'account',
  label: 'Account',
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}

export const HasErrorTypeTask = Template.bind({})
HasErrorTypeTask.args = {
  name: 'myName',
  type: 'task',
  errors: `
    <p>
      Field can't be empty
    </p>
`,
}
