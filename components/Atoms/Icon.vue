<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
    class="fill-current"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g>
      <component :is="componentFile"></component>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      required: true,
    },
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },
  },
  computed: {
    componentFile() {
      return () => import(`./Icons/Icon${this.capitalize(this.iconName)}.vue`)
    },
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
  },
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>
