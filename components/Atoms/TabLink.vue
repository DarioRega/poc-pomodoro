<template>
  <button
    class="py-2 px-3 font-semibold rounded-md tab-link text-dark-gray focus:outline-none"
    :class="[`tab-link__${type}`, isActive && 'active']"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'TabLink',
  props: {
    type: {
      type: String,
      default: 'default',
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.tab-link {
  @apply transition-colors duration-300 ease-in-out;
  &__primary {
    &:hover:not(.active) {
      @apply bg-opacity-30 bg-dark-gray;
      @apply dark:bg-opacity-50;
    }

    &.active {
      @apply bg-opacity-30 bg-dark-indigo text-dark-indigo;
      @apply dark:bg-light-indigo dark:text-light-indigo dark:bg-opacity-25;
    }
  }
  &__default {
    &:hover {
      @apply text-dark-blue;
      @apply dark:text-celeste;
    }

    &.active {
      @apply text-dark-blue;
      @apply dark:text-celeste;
    }
  }
}
</style>
