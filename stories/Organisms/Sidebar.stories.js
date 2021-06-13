import TimerSidebar from '@/components/Organisms/TimerSidebar'
import { STEPS_STATUS } from '@/constantes'
import Sidebar from '../../components/Organisms/Sidebar'
import CurrentTime from '../../components/Atoms/CurrentTime'

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  argTypes: {
    isLayoutStacked: {
      control: { type: 'select', options: [true, false] },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Sidebar, CurrentTime, TimerSidebar },
  data() {
    return {
      stacked: false,
    }
  },
  computed: {
    status() {
      return STEPS_STATUS
    },
  },
  mounted() {
    this.stacked = args.isLayoutStacked
  },
  template: `
    <sidebar v-bind='$props' :is-layout-stacked='stacked' @onToggleStacked='stacked = $event'>
    <template #currentTime>
      <current-time :is-layout-stacked='stacked' />
    </template>
    <template #timer>
      <timer-sidebar :is-layout-stacked='stacked' />
    </template>
    </sidebar>
  `,
})

export const Default = Template.bind({})
Default.args = {}
