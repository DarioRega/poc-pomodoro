<template>
  <div class="brand-input" :class="hasErrors && 'brand-input--has-errors'">
    <div class="flex flex-col-reverse">
      <input
        v-model.lazy="localValue"
        type="text"
        :aria-label="name"
        :name="name"
        class="brand-input__input"
        :class="[
          `brand-input__input--size-${size}`,
          `brand-input__input--${type}`,
        ]"
        @change="onChange"
      />
      <label v-if="label && type !== 'task'" class="brand-input__label">
        {{ label }}
      </label>
    </div>
    <div v-show="hasErrors" class="mt-1 text-right brand-input__errors">
      <slot name="errors" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BrandInput',
  // eslint-disable-next-line vue/no-unused-components
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'default',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localValue: '',
    }
  },
  computed: {
    hasErrors() {
      return !!this.$slots.errors
    },
  },
  mounted() {
    this.localValue = this.value
  },
  methods: {
    onChange(value) {
      this.$emit('change', value)
    },
  },
}
</script>
