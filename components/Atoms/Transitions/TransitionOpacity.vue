<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-300 ease-in"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'TransitionOpacity',
}
</script>
