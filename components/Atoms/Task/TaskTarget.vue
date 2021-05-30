<template>
  <button
    class="
      flex
      items-center
      transition-colors
      duration-200
      focus:outline-none
      hover:text-dark-blue
      dark:hover:text-celeste
      focus:text-dark-indigo
      dark:focus:text-light-indigo
    "
    :class="[
      isSelected && !isCompleted
        ? 'text-dark-blue dark:text-celeste'
        : 'text-dark-gray',
      isCompleted && 'text-success',
    ]"
    @click="$emit('click')"
    @dblclick="$emit('dblclick')"
  >
    <icon
      v-show="isArchiveEnabled"
      icon-name="archiveBox"
      class="w-5 h-5 text-error"
    />
    <icon
      v-show="isDeleteEnabled"
      icon-name="trash"
      class="w-5 h-5 text-error"
    />
    <icon
      v-show="!isArchiveEnabled && !isDeleteEnabled"
      :icon-name="isCompleted ? 'checkMarkRounded' : 'target'"
      class="w-5 h-5"
    />
  </button>
</template>

<script>
import Icon from '../Icon'
export default {
  name: 'TaskTarget',
  components: { Icon },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    /*
      If the user enabled the archive task mode on header
    */
    isArchiveEnabled: {
      type: Boolean,
      default: false,
    },
    /*
      If the user enabled the delete task mode on header
    */
    isDeleteEnabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
