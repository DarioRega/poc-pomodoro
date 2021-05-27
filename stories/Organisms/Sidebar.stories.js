import TimerSidebar from '@/components/Organisms/TimerSidebar'
import { POMODORO_STATUS } from '@/constantes'
import Sidebar from '../../components/Organisms/Sidebar'
import CurrentTime from '../../components/Atoms/CurrentTime'

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  argTypes: {
    isStacked: {
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
      return POMODORO_STATUS
    },
  },
  mounted() {
    this.stacked = args.isStacked
  },
  template: `
    <sidebar v-bind='$props' :is-stacked='stacked' @onToggleStacked='stacked = $event'>
    <template #currentTime>
      <current-time :is24h='false' :is-stacked='stacked' />
    </template>
    <template #timer>
      <timer-sidebar :is-stacked='stacked' :status='status.POMODORO.started' current-timer='23:00'>
        <template #currentSessionInformations>
          <div class='text-center'>
            <p>Current session will end at 14:30 PM</p>
          </div>
        </template>
      </timer-sidebar>
    </template>
    </sidebar>
  `,
})

export const Default = Template.bind({})
Default.args = {}
