<template>
  <button
    class="btn"
    :class="[`btn__${type}`, `${isDisabled ? 'btn--disabled' : ''}`]"
    :disabled="isDisabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.btn {
  @apply inline-flex items-center py-2 px-4 text-sm font-medium tracking-wider rounded border border-transparent shadow-sm;
  &:hover {
    @apply opacity-90;
  }
  &:focus {
    @apply ring-2 ring-offset-2 opacity-100 outline-none;
  }

  &__primary {
    @apply text-celeste bg-dark-indigo ring-offset-light-white ring-dark-indigo;
    @apply dark:bg-light-indigo dark:ring-offset-dark-blue dark:ring-light-indigo;
  }

  &__secondary {
    @apply rounded-md border text-dark-gray border-dark-gray-20 ring-offset-light-white ring-dark-indigo;
    @apply dark:text-celeste dark:bg-darker-gray dark:border-transparent dark:ring-offset-dark-blue dark:ring-darker-gray;
    &:hover {
      @apply bg-dark-gray-20;
      @apply dark:bg-darker-gray dark:opacity-80;
    }
    &:focus {
      @apply ring-dark-gray;
    }
  }

  &__naked {
    @apply bg-transparent border-0 shadow-none text-dark-gray;
    &:hover {
      @apply bg-dark-gray-20;
    }
    &:focus {
      @apply ring-dark-gray ring-dark-gray-20;
    }
  }

  &--disabled {
    @apply border-0 opacity-80 cursor-not-allowed bg-light-gray text-dark-gray;
    @apply dark:text-dark-gray dark:bg-darker-gray;
    &:hover {
      @apply opacity-80;
    }
  }
}
</style>
