<template>
  <button
    class="btn-icon inline-flex items-center rounded-md
    transition-colors duration-100
    focus:outline-none"
    :class="[applyClasses, withBackground && 'p-2']"
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
      default: '',
    },
    size: {
      type: String,
      default: 'large',
    },
    withBackground: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    applyClasses() {
      if (this.classes) {
        return this.classes
      }
      if (this.withBackground && !this.classes) {
        return 'text-celeste bg-dark-indigo dark:bg-light-indigo hover:bg-opacity-90 dark:hover:bg-opacity-90'
      }
      return 'text-dark-gray hover:text-dark-blue dark:hover:text-celeste focus:text-dark-indigo dark:focus:text-light-indigo '
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
      @apply w-5 h-5;
    }
    &--xlarge {
      @apply w-6 h-6;
    }
  }
}
</style>
