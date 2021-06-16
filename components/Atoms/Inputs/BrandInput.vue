<template>
  <div
    class="brand-input relative"
    :class="hasErrors && 'brand-input--has-errors'"
  >
    <div class="flex flex-col-reverse">
      <input
        :type="inputType"
        :aria-label="name"
        :value="value"
        :name="name"
        :disabled="isDisabled"
        class="brand-input__input"
        :placeholder="placeholder"
        :class="[
          `brand-input__input--size-${size}`,
          `brand-input__input--${type}`,
          isSelected && 'selected',
          isCompleted && 'completed',
          isDisabled && 'cursor-not-allowed',
        ]"
        @input="$emit('input', $event.target.value)"
      />
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
  name: 'BrandInput',
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
    isDisabled: {
      type: Boolean,
      default: false,
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
}
</script>
