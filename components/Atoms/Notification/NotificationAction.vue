<template>
  <div class="mt-4 flex">
    <button
      type="button"
      class="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="$emit('onConfirm')"
    >
      <slot />
    </button>
    <button
      type="button"
      class="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="$emit('onCancel')"
    >
      Cancel
    </button>
  </div>
</template>
<script>
export default {
  name: 'NotificationAction',
}
</script>
