import ScreenExpander from '../../components/Molecules/ScreenExpander'
import Icon from '~/components/Atoms/Icon'

export default {
  title: 'Molecules/ScreenExpander',
  component: ScreenExpander,
  argTypes: {
    isExpanded: {
      control: {
        type: 'radio',
        options: [true, false],
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  components: { ScreenExpander, Icon },
  props: Object.keys(argTypes),
  data() {
    return {
      show: true,
    }
  },
  methods: {
    handleClose() {
      this.show = false
      setTimeout(() => {
        this.show = true
      }, 1000)
    },
  },
  template: `
    <div class='w-full h-full'>
      <screen-expander :is-expanded='show' @onClose='handleClose'>
        <template v-if="${'withSlot' in args}">${args.withSlot}</template>
      </screen-expander>
    </div>`,
})

export const DefaultExpanded = Template.bind({})
DefaultExpanded.args = {
  isExpanded: true,
}

export const WithSlotExpanded = Template.bind({})
WithSlotExpanded.args = {
  isExpanded: true,
  withSlot: `
    <h3 class='text-dark-blue dark:text-celeste'>Hello World</h3>
  `,
}
