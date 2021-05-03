<template>
  <div>
    <h6 class="text-dark-blue dark:text-celeste mb-3">
      <slot name="label" />
    </h6>
    <div class="text-dark-gray font-semibold">
      <slot name="data" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabelWithData',
}
</script>
