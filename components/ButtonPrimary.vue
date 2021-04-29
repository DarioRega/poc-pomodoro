<template>
  <button
    :aria-label="label"
    class="inline-flex items-center text-sm tracking-wider px-4 py-2 border border-transparent font-medium rounded shadow-sm text-light-celeste bg-dark-indigo dark:bg-light-indigo hover:opacity-90 focus:outline-none focus:ring-2  focus:ring-offset-light-white dark:focus:ring-offset-dark-blue focus:ring-offset-2 focus:ring-dark-indigo dark:focus:ring-light-indigo"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'ButtonPrimary',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
