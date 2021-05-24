<template>
  <div
    class="brand-input relative"
    :class="hasErrors && 'brand-input--has-errors'"
  >
    <div class="flex flex-col-reverse">
      <input
        v-model.lazy="localValue"
        :type="inputType"
        :aria-label="name"
        :name="name"
        class="brand-input__input"
        :placeholder="placeholder"
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
    <div
      v-show="hasErrors"
      class="mt-1 absolute text-right brand-input__errors w-full"
    >
      <p>{{ errorText }}</p>
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
    inputType: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    errorText: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      localValue: '',
    }
  },
  computed: {
    hasErrors() {
      return this.errorText.length > 0
    },
  },
  mounted() {
    this.localValue = this.value
  },
  methods: {
    onChange(evt) {
      this.$emit('change', evt.target.value)
    },
  },
}
</script>
