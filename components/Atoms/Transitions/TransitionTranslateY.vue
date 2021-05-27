<template>
  <transition
    :enter-active-class="`transition duration-${durationAmount} ease-out transform`"
    :enter-class="`opacity-0 ${translateY}`"
    enter-to-class="opacity-100 translate-y-0"
    :leave-active-class="`transition duration-${durationAmount} ease-in transform`"
    leave-class="opacity-100 translate-y-0"
    :leave-to-class="`opacity-0 ${translateY} `"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    translateY: {
      type: String,
      default: '-translate-y-6',
    },
    durationAmount: {
      type: String,
      default: '300',
    },
  },
}
</script>
