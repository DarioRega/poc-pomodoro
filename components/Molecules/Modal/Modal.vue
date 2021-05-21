<template>
  <modal-container :is-open="isOpen">
    <div
      :class="`modal modal--${size}`"
      class="
        inline-block
        overflow-hidden
        text-left
        align-bottom
        bg-white
        rounded-lg
        shadow-xl
        transition-all
        transform
        sm:my-8
        sm:align-middle
      "
    >
      <div
        class="
          px-4
          pt-4
          pb-4
          modal__content
          sm:px-6
          md:px-8
          xl:px-10
          md:pt-5
          sm:pb-6
          md:pb-8
          xl:pb-12
        "
      >
        <div class="relative flex-col mt-2 sm:flex sm:items-start">
          <div class="mb-6">
            <slot name="header" />
          </div>
          <!-- allow user to close with icon if footer is not given -->
          <div v-if="!hasFooter" class="absolute top-0 right-0">
            <button
              class="
                text-dark-blue
                dark:text-celeste
                hover:text-dark-gray
                dark:hover:text-dark-gray
                focus:outline-none
                focus:text-dark-indigo
                dark:focus:text-light-indigo
              "
              @click="$emit('close')"
            >
              <icon icon-name="close" class="w-5 h-5" />
            </button>
          </div>
          <div class="min-h-[5rem] flex items-center">
            <slot name="body" />
          </div>
        </div>
      </div>
      <div
        v-if="hasFooter"
        class="
          px-4
          pt-3
          pb-2
          modal__footer
          sm:pt-4
          sm:pb-4
          sm:px-6
          md:px-8
          xl:px-10
        "
      >
        <slot name="footer" />
      </div>
    </div>
  </modal-container>
</template>
<script>
import Icon from '../../Atoms/Icon'
import ModalContainer from './ModalContainer'
export default {
  name: 'Modal',
  components: { ModalContainer, Icon },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  computed: {
    hasFooter() {
      return !!this.$slots.footer
    },
  },
}
</script>
<style lang="scss" scoped>
.modal {
  @apply w-full;
  &--default {
    @screen sm {
      @apply max-w-lg;
    }
    @screen md {
      @apply max-w-xl;
    }
    @screen xl {
      @apply max-w-2xl;
    }
  }

  &--large {
    @screen md {
      @apply max-w-2xl;
    }
    @screen xl {
      @apply max-w-4xl;
    }
  }

  &--extra-large {
    @screen md {
      @apply max-w-2xl;
    }
    @screen xl {
      @apply max-w-5xl;
    }
    @screen 2xl {
      @apply max-w-5xl;
    }
  }

  &__content,
  &__footer {
    @apply bg-light-white;
    @apply dark:bg-dark-blue;
  }
  &__footer {
    @apply border-t-2 border-dark-gray-20;
    @apply dark:border-dark-gray;
  }
}
</style>
