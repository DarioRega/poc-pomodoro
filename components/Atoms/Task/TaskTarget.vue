<template>
  <button
    class="
      task-target
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
    :disabled="isLoading"
    :class="[
      isSelected && !isCompleted
        ? 'text-dark-blue dark:text-celeste'
        : 'text-dark-gray',
      isCompleted && 'text-success',
      isLoading && 'task-target--loading',
    ]"
    @click="$emit('click')"
    @dblclick="$emit('dblclick')"
  >
    <!--   Archive enabled -->
    <icon
      v-show="isArchiveEnabled"
      icon-name="archiveBox"
      class="w-5 h-5 text-darker-gray"
    />
    <!--   Delete enabled -->
    <icon
      v-show="isDeleteEnabled"
      icon-name="trash"
      class="w-5 h-5 text-error"
    />
    <!--   Completed -->
    <icon
      v-show="!isArchiveEnabled && !isDeleteEnabled && isCompleted"
      icon-name="checkMarkRounded"
      class="w-5 h-5"
      :class="isLoading && 'invisible'"
    />
    <!--   Default -->
    <icon
      v-show="!isArchiveEnabled && !isDeleteEnabled && !isCompleted"
      icon-name="target"
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
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.task-target--loading {
  & > svg {
    @apply invisible;
  }

  &::after {
    @apply w-5 h-5 absolute left-0 m-auto border-4 border-transparent rounded-[50%] text-current fill-current;

    content: '';
    animation: small-loading-spinner 1s ease infinite;
    border-top-color: #182532;
  }
}
.dark .task-target--loading::after {
  border-top-color: white;
}
</style>
