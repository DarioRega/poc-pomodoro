<template>
  <div class="timer-sidebar__expander flex flex-col gap-y-4">
    <button
      class="timer-sidebar__expander__button"
      @click="$emit('onScreenExpand')"
    >
      <icon icon-name="expandScreen" class="w-5" />
    </button>
    <!-- TODO trigger tooltip here on mouse hover and display slot currentSessionInformations  -->
    <!--    <p-->
    <!--      v-show="isSessionCreated"-->
    <!--      class="text-sm text-dark-gray mb-6 font-bold px-2"-->
    <!--    >-->
    <!--      {{ $t('Current session will end at') }} {{ currentSessionEndTime }}-->
    <!--    </p>-->
    <button
      v-show="sessionState.isSessionStartedButHasPendingProcess"
      class="timer-sidebar__expander__button"
      @mouseenter="isInformationTooltipVisible = true"
      @onmouseleave="isInformationTooltipVisible = false"
    >
      <icon icon-name="informationRound" class="w-6" />
    </button>
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'TimerSidebarExpanderStacked',
  components: { Icon },
  data() {
    return {
      isInformationTooltipVisible: false,
    }
  },
  computed: {
    sessionState() {
      return this.$store.getters['sessions/getSessionState']
    },
  },
}
</script>
