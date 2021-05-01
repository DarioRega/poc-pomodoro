<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
    <div v-for="color in colors" :key="color">
      <div class="shadow rounded">
        <div :class="color" class="p-16 rounded-t"></div>
        <div class="bg-gray-200 rounded-b text-center py-4">
          <pre>{{ color.slice('3') }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPalette',
  props: {
    colors: {
      type: Array,
      required: true,
    },
  },
}
</script>
