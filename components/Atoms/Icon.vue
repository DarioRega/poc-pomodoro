<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :aria-labelledby="iconName"
    role="presentation"
    class="fill-current"
  >
    <title :id="iconName" lang="en">{{ capitalize(iconName) }}</title>
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
  data() {
    return {
      viewBox: '0 0 24 24',
    }
  },
  computed: {
    componentFile() {
      return () => import(`./Icons/Icon${this.capitalize(this.iconName)}.vue`)
    },
  },
  mounted() {
    this.componentFile().then((c) => {
      this.viewBox = c.default.viewBox || '0 0 24 24'
    })
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
