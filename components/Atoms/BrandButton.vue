<template>
  <button
    :aria-label="label"
    class="btn"
    :class="[`btn__${type}`, `${isDisabled ? 'btn--disabled' : ''}`]"
    :disabled="isDisabled"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true,
    },
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
    @apply text-celeste dark:text-light-celeste bg-dark-indigo dark:bg-light-indigo ring-offset-light-white dark:ring-offset-dark-blue ring-dark-indigo dark:ring-light-indigo;
  }

  &__secondary {
    @apply text-dark-gray dark:text-dark-gray bg-lighter-white dark:bg-dark-blue border border-darker-gray dark:border-dark-gray rounded-md ring-offset-light-white dark:ring-offset-dark-blue ring-dark-indigo dark:ring-darker-gray;
    &:hover {
      @apply bg-rgba-dark-gray;
    }
  }

  &__naked {
    @apply bg-transparent text-dark-gray border-0 shadow-none;
    &:hover {
      @apply bg-rgba-dark-gray opacity-90;
    }
  }

  &--disabled {
    @apply bg-light-gray text-dark-gray dark:text-dark-gray dark:bg-rgba-dark-gray border-0 opacity-60 cursor-not-allowed;
    &:hover {
      @apply opacity-60;
    }
  }
}
</style>
