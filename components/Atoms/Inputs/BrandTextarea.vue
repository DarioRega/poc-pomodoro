<template>
  <div class="brand-input" :class="hasErrors && 'brand-input--has-errors'">
    <div class="flex flex-col-reverse">
      <textarea
        v-model.lazy="localValue"
        :name="name"
        :aria-label="name"
        :rows="type === 'task' ? 10 : 4"
        class="resize-none brand-input__textarea"
        :class="[
          `brand-input__textarea--${type}`,
          isSelected && 'selected',
          isComplete && 'completed',
        ]"
        @change="onChange"
      ></textarea>
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
  name: 'BrandTextarea',
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'primary',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    isComplete: {
      type: Boolean,
      default: false,
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
    isSelected() {
      return this.type === 'task'
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
