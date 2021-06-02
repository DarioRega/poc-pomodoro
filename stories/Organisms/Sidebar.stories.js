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
    getLabels() {
      return {
        resume: 'Resume',
        pause: 'Pause',
        stop: 'Stop',
        start: 'Start',
        startSession: 'Start session',
        restartCurrentSession: 'Restart session',
        currentSessionInformation: 'Current session will end at',
      }
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
      <timer-sidebar :is-stacked='stacked' :status='status.POMODORO.paused' :is-paused='true' current-session-end-time='15:35 AM' current-timer='23:00' :labels='getLabels' />
    </template>
    </sidebar>
  `,
})

export const Default = Template.bind({})
Default.args = {}
