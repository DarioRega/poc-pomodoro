<template>
  <transition
    enter-active-class="duration-300 ease-out"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="duration-200 ease-in"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="isOpen"
      class="overflow-y-auto fixed inset-0 z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="
          flex
          justify-center
          items-center
          px-4
          min-h-screen
          text-center
          sm:block
          md:p-0
        "
      >
        <transition
          enter-active-class="duration-300 ease-out"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="duration-200 ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-show="isOpen"
            class="
              fixed
              inset-0
              bg-opacity-20
              transition-opacity
              bg-darker-blue
              dark:bg-opacity-40
            "
            aria-hidden="true"
          ></div>
        </transition>
        <transition
          enter-active-class="duration-300 ease-out"
          enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="duration-200 ease-in"
          leave-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div v-show="isOpen" class="w-full">
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
              >&#8203;</span
            >
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'ModalContainer',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
