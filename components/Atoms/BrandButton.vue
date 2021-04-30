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
    @apply text-celeste bg-dark-indigo dark:bg-light-indigo ring-offset-light-white dark:ring-offset-dark-blue ring-dark-indigo dark:ring-light-indigo;
  }

  &__secondary {
    @apply text-dark-gray dark:text-celeste dark:bg-darker-gray border border-rgba-dark-gray dark:border-transparent rounded-md ring-offset-light-white dark:ring-offset-dark-blue ring-dark-indigo dark:ring-darker-gray;
    &:hover {
      @apply bg-rgba-dark-gray dark:bg-darker-gray dark:opacity-80;
    }
  }

  &__naked {
    @apply bg-transparent text-dark-gray border-0 shadow-none;
    &:hover {
      @apply bg-rgba-dark-gray;
    }
  }

  &--disabled {
    @apply bg-light-gray text-dark-gray dark:text-dark-gray dark:bg-darker-gray border-0 opacity-80 cursor-not-allowed;
    &:hover {
      @apply opacity-80;
    }
  }
}
</style>
