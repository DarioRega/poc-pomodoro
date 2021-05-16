<template>
  <div class="mt-4">
    <button
      class="focus:outline-none timer-sidebar__expander__button h-auto"
      @click="$emit('click')"
    >
      <icon icon-name="expandScreen" class="w-5 h-5" />
    </button>
  </div>
</template>

<script>
import Icon from '../../Atoms/Icon'

export default {
  name: 'TimerSidebarExpanderUnstacked',
  components: { Icon },
}
</script>
