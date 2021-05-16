<template>
  <div class="mb-3">
    <button
      class="focus:outline-none timer-sidebar__expander__button h-auto"
      @click="$emit('click')"
    >
      <icon icon-name="expandScreen" class="w-5 h-5" />
    </button>
    <!-- TODO trigger tooltip here on mouse hover and display slot currentSessionInformations  -->
    <button
      class="focus:outline-none timer-sidebar__expander__button h-auto"
      @mouseenter="isInformationTooltipVisible = true"
      @onmouseleave="isInformationTooltipVisible = false"
    >
      <icon icon-name="informationRound" class="w-5 h-5" />
    </button>
  </div>
</template>

<script>
import Icon from '../../Atoms/Icon'

export default {
  name: 'TimerSidebarExpanderStacked',
  components: { Icon },
  data() {
    return {
      isInformationTooltipVisible: false,
    }
  },
}
</script>
