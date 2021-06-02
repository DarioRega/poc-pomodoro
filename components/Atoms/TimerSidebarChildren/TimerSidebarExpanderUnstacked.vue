<template>
  <div class="timer-sidebar__expander timer-sidebar__expander--default">
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
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'TimerSidebarExpanderUnstacked',
  components: { Icon },
}
</script>
