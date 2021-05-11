<template>
  <div
    class="flex items-center mb-0 transition-colors duration-200"
    :class="classes"
    :tabindex="clickable && '0'"
    @keydown="handleKeyDown"
    @click="handleClick"
  >
    <icon icon-name="pin" class="mr-3 w-4 h-4" />
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
      if (evt.keyCode === 13) {
        this.$emit('click')
      }
    },
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    },
  },
}
</script>
