<template>
  <div>
    <h6 class="mb-3 text-dark-blue dark:text-celeste">
      <slot name="label" />
    </h6>
    <div class="font-semibold text-dark-gray">
      <slot name="data" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LabelWithData',
}
</script>
