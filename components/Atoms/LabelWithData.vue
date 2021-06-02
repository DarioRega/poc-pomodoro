<template>
  <div>
    <p v-if="isSmall" class="text-sm text-dark-blue dark:text-celeste">
      {{ label }}
    </p>
    <h6 v-else class="mb-3 text-dark-blue dark:text-celeste">
      {{ label }}
    </h6>
    <div
      class="font-semibold text-dark-gray"
      :class="isSmall ? 'mt-1' : 'mt-6'"
    >
      <slot />
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
    isSmall: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
