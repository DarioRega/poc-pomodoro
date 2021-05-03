<template>
  <div class="input-container">
    <label
      :for="name"
      class="label block text-sm font-medium text-dark-gray"
      :class="[
        isHovered && 'hovered',
        isFocused && 'focused',
        hasErrors && 'has-errors',
      ]"
    >
      <slot name="label" />
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :type="type"
        :name="name"
        class="base-input"
        :class="[
          `base-input__${size}`,
          hasIcon && 'base-input--with-icon',
          hasErrors && 'has-errors',
        ]"
        oninput="validity.valid || (value = '')"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
        @focusin="isFocused = true"
        @focusout="isFocused = false"
      />
      <div
        v-if="hasIcon"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto"
      >
        <span
          class="input-icon h-5 w-5 text-dark-gray flex items-center focus:outline-none"
          :class="[
            isHovered && 'hovered',
            isFocused && 'focused',
            hasErrors && 'has-errors',
          ]"
        >
          <slot name="icon" />
        </span>
      </div>
    </div>
    <div
      v-if="hasErrors"
      class="text-right text-sm mt-1 mr-0.5 text-error italic"
    >
      <slot name="errors" />
    </div>
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'BrandInput',
  // eslint-disable-next-line vue/no-unused-components
  components: { Icon },
  props: {
    defaultValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'default',
    },
    allowFractions: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '',
      isFocused: false,
      isHovered: false,
    }
  },
  computed: {
    hasIcon() {
      return !!this.$slots.icon
    },
    hasErrors() {
      return !!this.$slots.errors
    },
  },
  mounted() {
    this.value = this.defaultValue
  },
}
</script>
<style lang="scss">
.base-input {
  @apply border border-dark-gray rounded-md block w-full bg-transparent text-dark-blue transition-colors duration-300;
  @apply dark:text-celeste;

  &:hover {
    @apply border-dark-blue;
    @apply dark:border-celeste;
  }

  &:focus {
    @apply outline-none ring-dark-indigo border-dark-indigo;
    @apply dark:ring-light-indigo dark:border-light-indigo;
  }

  &__default {
    @apply py-1.5 px-3;
  }
  &__large {
    @apply py-2 px-5;
  }
  &--with-icon {
    @apply pr-10;
  }
  &.has-errors {
    @apply text-error border-error;
  }
}

label,
.input-icon {
  @apply transition-colors duration-300;
  &.hovered {
    @apply text-dark-blue;
    @apply dark:text-celeste;
  }
  &.focused {
    @apply text-dark-indigo;
    @apply dark:text-light-indigo;
  }
  &.has-errors {
    @apply text-error;
    //@apply text-error #{!important};
  }
}
</style>
