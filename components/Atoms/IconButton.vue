<template>
  <button
    class="btn-icon inline-flex items-center p-2 rounded-md
    transition-colors duration-100
    hover:bg-opacity-90 dark:hover:bg-opacity-90 focus:outline-none"
    :class="classes"
    @click="$emit('click')"
  >
    <icon
      :icon-name="iconName"
      class="btn-icon__icon"
      :class="`btn-icon__icon--${size}`"
    />
  </button>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'IconButton',
  components: { Icon },
  props: {
    iconName: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      default: 'text-celeste bg-dark-indigo dark:bg-light-indigo',
    },
    size: {
      type: String,
      default: 'medium',
    },
  },
}
</script>
<style lang="scss">
.btn-icon {
  &__icon {
    @apply mb-0 #{!important};
    &--small {
      @apply w-3 h-3;
    }
    &--medium {
      @apply w-4 h-4;
    }
    &--large {
      @apply w-6 h-6;
    }
  }
}
</style>
