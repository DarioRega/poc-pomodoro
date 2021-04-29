<template>
  <button
    :aria-label="label"
    :class="`btn btn__${type} ${isDisabled && 'btn--disabled'}`"
    :disabled="isDisabled"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'ButtonPrimary',
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
    @apply opacity-100 outline-none ring-2  ring-offset-2;
  }

  &__primary {
    @apply text-celeste dark:text-light-celeste bg-dark-indigo dark:bg-light-indigo ring-offset-light-white dark:ring-offset-dark-blue ring-dark-indigo dark:ring-light-indigo;
  }
}
</style>
