<template>
  <div class="timer-sidebar__expander timer-sidebar__expander--stacked">
    <button
      class="
        focus:outline-none
        timer-sidebar__expander__button
        h-auto
        inline-flex
      "
      @click="$emit('click')"
    >
      <icon icon-name="expandScreen" class="w-5 h-5" />
    </button>
    <!-- TODO trigger tooltip here on mouse hover and display slot currentSessionInformations  -->
    <button
      v-show="shouldShowSessionInformation && hasInformations"
      class="
        focus:outline-none
        timer-sidebar__expander__button
        h-auto
        inline-flex
      "
      @mouseenter="isInformationTooltipVisible = true"
      @onmouseleave="isInformationTooltipVisible = false"
    >
      <icon icon-name="informationRound" class="w-5 h-5" />
    </button>
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'TimerSidebarExpanderStacked',
  components: { Icon },
  props: {
    shouldShowSessionInformation: {
      type: Boolean,
      default: false,
    },
    hasInformations: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isInformationTooltipVisible: false,
    }
  },
}
</script>
