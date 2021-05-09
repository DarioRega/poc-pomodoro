import Modal from '../../components/Molecules/Modal/Modal'
import BrandButton from '../../components/Atoms/BrandButton'

export default {
  title: 'Molecules/Modal',
  component: Modal,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['default', 'large', 'extra-large'],
      },
    },
    withFooter: {
      control: {
        type: 'radio',
        options: [true, false],
      },
    },
  },
  parameters: {
    docs: {
      page: null,
    },
  },
}

const Template = (args, { argTypes }) => ({
  components: { Modal, BrandButton },
  props: Object.keys(argTypes),
  data() {
    return {
      show: true,
    }
  },
  computed: {
    hasFooter() {
      if (args.withFooter === false) {
        return false
      }
      return true
    },
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
    <div>
      <modal v-bind="$props" :is-open="show" @close="handleClose">
        <template v-slot:header>
          <h5 class="text-dark-blue dark:text-celeste">Settings</h5>
        </template>
        <template v-slot:body>
          <div class="w-full">
            <p class="text-dark-gray">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p>
          </div>
        </template>
        <template v-slot:footer v-if="hasFooter">
          <div class="flex justify-end">
            <brand-button type="primary" @click="handleClose">Close</brand-button>
          </div>
        </template>
      </modal>
    </div>
`,
})

export const Default = Template.bind({})
Default.args = {
  size: 'default',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
}

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  size: 'extra-large',
}

export const WithoutFooter = Template.bind({})
WithoutFooter.args = {
  withFooter: false,
}
