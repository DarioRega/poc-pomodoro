<template>
  <div>
    <h6 class="mb-3 text-dark-blue dark:text-celeste">
      {{ label }}
    </h6>
    <div class="font-semibold text-dark-gray">
      <slot name="data" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabelWithData',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
