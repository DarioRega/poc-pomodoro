<template>
  <button
    type="button"
    :class="classes"
    class=""
    :style="style"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script>
  import './button.css'

  export default {
    name: 'Button',

    props: {
      label: {
        type: String,
        required: true,
      },
      primary: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: 'medium',
        validator(value) {
          return ['small', 'medium', 'large'].indexOf(value) !== -1
        },
      },
      backgroundColor: {
        type: String,
        default: '',
      },
    },

    computed: {
      classes() {
        return {
          'storybook-button': true,
          'storybook-button--primary': this.primary,
          'storybook-button--secondary': !this.primary,
          [`storybook-button--${this.size}`]: true,
        }
      },
      style() {
        return {
          backgroundColor: this.backgroundColor,
        }
      },
    },

    methods: {
      onClick() {
        this.$emit('onClick')
      },
    },
  }
</script>
