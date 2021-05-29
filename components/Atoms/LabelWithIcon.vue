<template>
  <div
    class="flex items-center mb-0 transition-colors duration-200"
    :class="[classes, isReverse ? 'flex-row-reverse' : 'flex-row']"
    :tabindex="clickable && '0'"
    @keydown="handleKeyDown"
    @click="handleClick"
  >
    <a
      role="button"
      class="label-with-icon focus:outline-none z-40"
      :class="isReverse ? 'ml-3' : 'mr-3'"
      tabindex="0"
      @keydown="handleKeyDownIcon"
      @click="handleClickIcon"
    >
      <icon :icon-name="iconName" class="w-4 h-4" />
    </a>
    <slot name="label" />
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'LabelWithIcon',
  components: { Icon },
  props: {
    label: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      default: '',
    },
    isReverse: {
      type: Boolean,
      default: false,
    },
    classes: {
      type: String,
      default: 'text-dark-gray hover:text-dark-blue dark:hover:text-celeste',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleKeyDown(evt) {
      if (evt.keyCode === 13 && this.clickable) {
        this.$emit('click')
      }
    },
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    },
    handleKeyDownIcon(evt) {
      if (evt.keyCode === 13 && this.clickable) {
        this.$emit('iconClick')
      }
    },
    handleClickIcon() {
      if (this.clickable) {
        this.$emit('iconClick')
      }
    },
  },
}
</script>
