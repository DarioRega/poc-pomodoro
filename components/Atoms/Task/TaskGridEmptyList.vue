<template>
  <div class="flex justify-center items-center h-full">
    <h6 class="font-body text-dark-gray">
      {{ label ? label : $t('Your list is currently empty.') }}
    </h6>
  </div>
</template>

<script>
export default {
  name: 'TaskGridEmptyList',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
}
</script>
