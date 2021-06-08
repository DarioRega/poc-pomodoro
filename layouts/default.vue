<template>
  <div>
    <Nuxt />
    <transition-translate-y
      duration-amount="500"
      translate-y="-translate-y-full"
    >
      <launch-session-timer v-if="isLaunchTimerVisible" />
    </transition-translate-y>
  </div>
</template>
<script>
import LaunchSessionTimer from '@/components/Atoms/LaunchSessionTimer'
import TransitionTranslateY from '@/components/Atoms/Transitions/TransitionTranslateY'

export default {
  components: { LaunchSessionTimer, TransitionTranslateY },
  computed: {
    isLaunchTimerVisible() {
      return this.$store.state.globalState.isLaunchTimerVisible
    },
  },
}
</script>
