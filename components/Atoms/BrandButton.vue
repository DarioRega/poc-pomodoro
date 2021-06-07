<template>
  <button
    class="btn"
    :class="[
      `btn__${type}`,
      isLoading && `btn__${type}--loading`,
      `${isDisabled ? 'btn--disabled' : ''}`,
      `btn--${size}`,
    ]"
    :disabled="isDisabled"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BrandButton',
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'default',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
<style lang="scss" scoped>
.btn {
  @apply inline-flex justify-center items-center text-sm font-medium tracking-wider rounded border border-transparent shadow-sm relative transition-colors duration-200;
  &--default {
    @apply py-2 px-4;
  }

  &--small {
    @apply py-1 px-2 text-xs font-semibold;
  }

  &:hover {
    @apply opacity-90;
  }
  &:focus {
    @apply ring-2 ring-offset-2 opacity-100 outline-none;
  }

  &__primary {
    @apply text-celeste bg-dark-indigo ring-offset-light-white ring-dark-indigo;
    @apply dark:bg-light-indigo dark:ring-offset-dark-blue dark:ring-light-indigo;

    &--loading {
      @apply text-dark-indigo bg-dark-indigo opacity-80 #{!important};
      @apply dark:text-light-indigo dark:bg-light-indigo #{!important};
    }
  }

  &__secondary {
    @apply rounded-md border text-dark-gray bg-light-white border-dark-gray-20 ring-offset-light-white ring-dark-gray;
    @apply dark:text-celeste dark:bg-darker-gray dark:border-transparent dark:ring-offset-dark-blue dark:ring-darker-gray;
    &:hover {
      @apply bg-dark-gray-20;
      @apply dark:bg-darker-gray dark:opacity-80;
    }
    &:focus {
      @apply ring-dark-gray;
    }

    &--loading {
      @apply text-light-white  #{!important};
      @apply dark:text-darker-gray dark:bg-darker-gray #{!important};

      &::after {
        border-top-color: #747c84 !important;
      }
    }
  }

  &__naked {
    @apply bg-transparent border-0 shadow-none text-dark-gray;
    &:hover {
      @apply bg-dark-gray-20;
    }
    &:focus {
      @apply ring-dark-gray ring-dark-gray-20;
    }

    &--loading {
      @apply text-dark-gray text-opacity-0 bg-dark-gray-20 #{!important};

      &::after {
        border-top-color: #182532 !important;
      }
    }
  }

  &--disabled {
    @apply border-0 opacity-80 cursor-not-allowed bg-light-gray text-dark-gray;
    @apply dark:text-dark-gray dark:bg-darker-gray;
    &:hover {
      @apply opacity-80;
    }
  }
}

button[class*='--loading'] {
  &::after {
    @apply w-6 h-6 absolute inset-0 m-auto border-4 border-transparent rounded-[50%] text-current fill-current;

    content: '';
    border-top-color: white;
    animation: small-loading-spinner 1s ease infinite;
  }
}
</style>
