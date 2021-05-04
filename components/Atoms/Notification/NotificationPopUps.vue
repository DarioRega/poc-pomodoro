<template>
  <div
    aria-live="assertive"
    class="flex fixed inset-0
    items-end py-6 px-4 pointer-events-none sm:p-6 sm:items-start max-w-md ml-auto"
  >
    <div class="flex flex-col items-center space-y-4 w-full sm:items-end">
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="opacity-100 translate-y-0 sm:translate-x-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <slot />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationContainer',
}
</script>
