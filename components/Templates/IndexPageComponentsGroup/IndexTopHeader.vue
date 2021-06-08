<template>
  <div class="flex justify-between items-center">
    <h2 class="font-bold text-dark-blue dark:text-celeste tracking-wide">
      Pomodoro
    </h2>
    <icon-grid-actions
      :is-muted="isAppMuted"
      @onSettingsClick="handleSettingsClick"
      @onSoundClick="handleToggleMute"
      @onHelpClick="handleHelpClick"
      @onLogout="handleLogout"
    />
  </div>
</template>

<script>
import IconGridActions from '@/components/Molecules/IconGridActions'

export default {
  name: 'IndexTopHeader',
  components: { IconGridActions },
  computed: {
    isAppMuted() {
      return this.$store.getters['settings/isAppMuted']
    },
    modalsRefs() {
      return this.$store.state.globalState.modalsRefs
    },
  },
  methods: {
    handleSettingsClick() {
      this.$store.commit(
        'globalState/SET_CURRENT_MODAL_OPEN',
        this.modalsRefs.SETTINGS
      )
    },
    handleToggleMute() {
      // TODO HANDLE
    },
    handleHelpClick() {
      // TODO HANDLE
    },
    handleLogout() {
      this.$store.dispatch('globalState/logout')
    },
  },
}
</script>
