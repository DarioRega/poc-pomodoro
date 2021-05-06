<template>
  <div>
    <label
      class="block text-sm font-medium tracking-wide base-label text-dark-gray"
      :class="[
        isHovered && 'hovered',
        isFocused && 'focused',
        hasErrors && 'has-errors',
      ]"
    >
      <slot name="label" />
    </label>
    <slot name="input" />
    <div
      v-if="hasErrors"
      class="text-right input-errors mt-1 mr-0.5 text-error italic"
    >
      <slot name="errors" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    isFocused: {
      type: Boolean,
      default: false,
    },
    isHovered: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hasErrors() {
      return !!this.$slots.errors
    },
  },
}
</script>
