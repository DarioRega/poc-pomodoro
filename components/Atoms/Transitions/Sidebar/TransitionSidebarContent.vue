<template>
  <transition
    enter-active-class="transform transition linear duration-500 delay-0"
    enter-class="-translate-x-80"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition linear duration-500 delay-0"
    leave-class="translate-x-0"
    leave-to-class="-translate-x-80"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'TransitionSidebarContent',
}
</script>
