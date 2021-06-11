<template>
  <div class="app-layout">
    <index-sidebar @onScreenExpand="handleScreenExpand" />
    <section
      class="app-layout__main-content"
      :class="isLayoutStacked && 'app-layout__main-content--stacked'"
    >
      <div class="w-full">
        <index-top-header class="pb-32" />
        <current-tab-header class="flex justify-between" />
        <task-tables class="w-full pt-5" :is-layout-stacked="isLayoutStacked" />
      </div>
    </section>

    <!--    MODAL SELECT RUNNING TASK -->
    <modal-panel-select-running-task
      :is-open="currentModalOpen === modalsRefs.SELECT_RUNNING_TASK"
      @onClose="closeAnyModals"
    />

    <!--    MODAL SETTINGS -->
    <modal-settings-panel
      :is-open="currentModalOpen === modalsRefs.SETTINGS"
      @onClose="closeAnyModals"
    />

    <!--    TIMER SCREEN EXPANDER -->
    <timer-screen-expander
      :is-expanded="isTimerScreenExpanderOpen"
      @onClose="handleCloseScreenExpander"
    />
  </div>
</template>

<script>
import IndexTopHeader from '@/components/Templates/IndexPageComponentsGroup/IndexTopHeader'
import CurrentTabHeader from '@/components/Templates/IndexPageComponentsGroup/CurrentTabHeader'
import IndexSidebar from '@/components/Templates/IndexPageComponentsGroup/IndexSidebar'
import TaskTables from '@/components/Templates/IndexPageComponentsGroup/TaskTables'
import ModalPanelSelectRunningTask from '@/components/Organisms/PanelSelectRunningTask/ModalPanelSelectRunningTask'
import ModalSettingsPanel from '@/components/Organisms/SettingsPanels/ModalSettingsPanel'
import TimerScreenExpander from '@/components/Organisms/TimerScreenExpander'
// import { getCorsPermission } from '@/helpers/cors'
import Echo from 'laravel-echo'
import { ECHO_BROADCAST_URL } from '@/constantes/api'

export default {
  name: 'Index',
  components: {
    TaskTables,
    IndexSidebar,
    IndexTopHeader,
    CurrentTabHeader,
    ModalPanelSelectRunningTask,
    ModalSettingsPanel,
    TimerScreenExpander,
  },
  layout: 'main',
  middleware: 'auth',
  data() {
    return {
      isTimerScreenExpanderOpen: false,
    }
  },
  computed: {
    isLayoutStacked() {
      return this.$store.state.globalState.isLayoutStacked
    },
    currentModalOpen() {
      return this.$store.state.globalState.currentModalOpen
    },
    modalsRefs() {
      return this.$store.state.globalState.modalsRefs
    },
  },
  mounted() {
    window.Pusher = require('pusher-js')
    const userChannel = `user.${this.$auth.user.id}`

    const echo = new Echo({
      broadcaster: 'pusher',
      key: 'local', // .env
      wsHost: 'localhost',
      wsPort: 6001,
      // cluster: 'mt1',
      // authEndpoint: 'http://localhost:80/broadcasting/auth',
      authorizer: (channel, options) => {
        console.log('CHANNEL => ', channel)
        console.log('options => ', options)
        return {
          authorize: (socketId, callback) => {
            console.log('SOCKED ID', socketId)
            console.log('CALLBACK', callback)
            this.$axios
              .post(`${ECHO_BROADCAST_URL}`, {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => {
                // eslint-disable-next-line node/no-callback-literal
                callback(false, response.data)
              })
              .catch((error) => {
                // eslint-disable-next-line node/no-callback-literal
                callback(true, error)
              })
          },
        }
      },
      forceTLS: false,
      disableStats: true,
    })
    window.Echo = echo

    // const corsPermissionRespose = await getCorsPermission(this.$axios)
    // const xsrfToken = corsPermissionRespose.config.headers['X-XSRF-TOKEN']
    // window.Echo.connector.pusher.config.auth.headers['X-XSRF-TOKEN'] = xsrfToken

    // await window.Echo.connector.pusher.connect()
    //

    window.Echo.private(`${userChannel}`).listen(
      `.current.session`,
      (session) => {
        console.log('WEBSOCKET EVENT  => ', session.status)
      }
    )
  },
  methods: {
    handleToggleStacked() {
      this.$store.commit('globalState/TOGGLE_STACKED_LAYOUT')
    },
    handleScreenExpand() {
      this.closeAnyModals()
      this.isTimerScreenExpanderOpen = true
    },
    handleCloseScreenExpander() {
      this.isTimerScreenExpanderOpen = false
    },
    closeAnyModals() {
      this.$store.commit('globalState/RESET_CURRENT_MODAL_OPEN')
    },
  },
}
</script>
