<template>
  <div class="mt-6 flex">
    <brand-button type="primary" @click="$emit('onConfirm')">
      <slot />
    </brand-button>
    <brand-button
      type="secondary"
      class="ml-5 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click="$emit('onCancel')"
    >
      Cancel
    </brand-button>
  </div>
</template>
<script>
import BrandButton from '../BrandButton'

export default {
  name: 'NotificationAction',
  components: { BrandButton },
}
</script>
