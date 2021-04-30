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
  @apply inline-flex items-center text-sm tracking-wider px-4 py-2 border border-transparent font-medium rounded shadow-sm;
  &:hover {
    @apply opacity-90;
  }
  &:focus {
    @apply opacity-100 outline-none ring-2 ring-offset-2;
  }

  &__primary {
    @apply text-celeste bg-dark-indigo ring-offset-light-white ring-dark-indigo;
    @apply dark:bg-light-indigo dark:ring-offset-dark-blue dark:ring-light-indigo;
  }

  &__secondary {
    @apply text-dark-gray  border border-dark-gray-20 rounded-md ring-offset-light-white ring-dark-indigo;
    @apply dark:text-celeste dark:bg-darker-gray dark:border-transparent dark:ring-offset-dark-blue dark:ring-darker-gray;
    &:hover {
      @apply bg-dark-gray-20;
      @apply dark:bg-darker-gray dark:opacity-80;
    }
  }

  &__naked {
    @apply bg-transparent text-dark-gray border-0 shadow-none;
    &:hover {
      @apply bg-dark-gray-20;
    }
  }

  &--disabled {
    @apply bg-light-gray text-dark-gray border-0 opacity-80 cursor-not-allowed;
    @apply dark:text-dark-gray dark:bg-darker-gray;
    &:hover {
      @apply opacity-80;
    }
  }
}
</style>
