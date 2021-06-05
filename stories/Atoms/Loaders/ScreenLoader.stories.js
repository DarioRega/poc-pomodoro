import ScreenLoader from '@/components/Atoms/Loaders/ScreenLoader'

export default {
  title: 'Atoms/Loaders/Screen',
  component: ScreenLoader,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ScreenLoader },
  template: `
    <div class='bg-lighter-white dark:bg-dark-blue h-screen w-screen flex items-center justify-center'>
      <screen-loader v-bind="$props">
        <template v-if="${'content' in args}">
          ${args.content}
        </template>
      </screen-loader>
    </div>`,
})

export const Default = Template.bind({})

export const WithSlot = Template.bind({})
WithSlot.args = {
  content: `<h5>Loading your environnment</h5>`,
}
