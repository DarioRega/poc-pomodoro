<template>
  <div
    class="
      fixed
      z-30
      bottom-0
      left-0
      bg-lighter-white
      dark:bg-darker-blue
      w-screen
      h-screen
      overflow-hidden
      transition-transform
      duration-[600ms]
      ease-in-out
    "
    :class="
      isExpanded
        ? 'transform translate-0 scale-1'
        : 'transform -translate-x-full translate-y-full scale-[0.1]'
    "
  >
    <div class="relative w-full h-full">
      <button
        class="
          screen-expander-button
          text-dark-blue
          flex
          items-center
          p-1
          dark:text-celeste
          absolute
          right-[2rem]
          top-[2rem]
          transform
          rotate-180
          focus:outline-none
        "
        @click="$emit('onClose')"
      >
        <icon icon-name="expandScreen" class="w-7 h-7" />
      </button>
      <div class="flex justify-center items-center w-full h-full">
        <div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '~/components/Atoms/Icon'

export default {
  name: 'ScreenExpander',
  components: {
    Icon,
  },
  props: {
    isExpanded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
