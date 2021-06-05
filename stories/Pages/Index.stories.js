import PageIndex from '@/components/Pages/PageIndex'

export default {
  title: 'Pages/Index',
  component: PageIndex,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  components: {
    PageIndex,
  },
  template: '<page-index />',
})

export const Default = Template.bind({})
Default.parameters = {
  layout: 'fullscreen',
}
