<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
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
  },
  computed: {
    componentFile() {
      return () => import(`./Icons/Icon${this.iconName}.vue`)
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
