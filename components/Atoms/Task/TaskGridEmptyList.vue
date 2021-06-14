<template>
  <div class="flex justify-center items-center h-full">
    <h5 class="font-body text-dark-gray">
      {{ label ? label : $t('Your list is currently empty... take a day off') }}
    </h5>
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
