<template>
  <div class="flex flex-wrap lg:max-w-3xl mx-auto">
    <div v-for="color in colors" :key="color" class="mx-auto lg:w-1/3">
      <div class="shadow rounded-lg m-2">
        <div :class="color" class="p-10 rounded-t"></div>
        <div class="bg-gray-200 text-center p-4">
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
