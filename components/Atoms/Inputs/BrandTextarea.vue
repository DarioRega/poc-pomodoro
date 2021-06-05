<template>
  <div class="brand-input" :class="hasErrors && 'brand-input--has-errors'">
    <div class="flex flex-col-reverse">
      <textarea
        :name="name"
        :value="value"
        :aria-label="name"
        :rows="type === 'task' ? 13 : 4"
        class="resize-none brand-input__textarea"
        :class="[
          `brand-input__textarea--${type}`,
          isSelected && 'selected',
          isCompleted && 'completed',
        ]"
        @input="$emit('input', $event.target.value)"
      ></textarea>
      <label v-if="label && type !== 'task'" class="brand-input__label">
        {{ label }}
      </label>
    </div>
    <transition-translate-y translate-y="-translate-y-4">
      <div
        v-show="hasErrors"
        class="mt-1 absolute text-right brand-input__errors w-full"
      >
        <p>{{ errorText }}</p>
      </div>
    </transition-translate-y>
  </div>
</template>

<script>
import TransitionTranslateY from '@/components/Atoms/Transitions/TransitionTranslateY'

export default {
  name: 'BrandTextarea',
  components: {
    TransitionTranslateY,
  },
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
    errorText: {
      type: String,
      default: '',
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
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
