<template>
  <base-input :is-hovered="isHovered" :is-focused="isFocused">
    <template v-slot:label>
      <slot name="label" />
    </template>
    <template v-slot:input>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
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
    </template>
    <template v-slot:errors>
      <slot name="errors" />
    </template>
  </base-input>
</template>

<script>
import Icon from './Icon'
import BaseInput from './BaseInput'

export default {
  name: 'BrandInput',
  // eslint-disable-next-line vue/no-unused-components
  components: { BaseInput, Icon },
  props: {
    defaultValue: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      default: 'text',
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
  &--with-icon {
    @apply pr-10;
  }
}
</style>
