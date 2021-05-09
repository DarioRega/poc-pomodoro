<template>
  <span>
    <span
      :class="
        toggled
          ? 'opacity-0 ease-out duration-100'
          : 'opacity-100 ease-in duration-200'
      "
      class="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity"
      aria-hidden="true"
    >
      <icon
        icon-name="closeBold"
        class="icon-container icon-container--disabled"
      />
    </span>
    <span
      :class="
        toggled
          ? 'opacity-100 ease-in duration-200'
          : 'opacity-0 ease-out duration-100'
      "
      class="absolute inset-0 flex items-center justify-center w-full h-full transition-opacity"
      aria-hidden="true"
    >
      <icon
        icon-name="checkMarkBold"
        class="icon-container icon-container--enabled"
      />
    </span>
  </span>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'ToggleIcon',
  components: { Icon },
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss">
.icon-container {
  @apply w-3.5 h-3.5 bg-white rounded-full;
  @apply mb-0 #{!important};

  &--disabled {
    @apply text-dark-gray;
  }

  &--enabled {
    @apply text-dark-indigo;
    @apply dark:text-light-indigo;
  }
}
</style>
