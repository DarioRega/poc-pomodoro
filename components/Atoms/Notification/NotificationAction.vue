<template>
  <div class="flex mt-6">
    <brand-button type="primary" @click="$emit('onConfirm')">
      <slot />
    </brand-button>
    <brand-button
      type="secondary"
      class="
        inline-flex
        items-center
        py-2
        px-3
        ml-5
        text-sm
        font-medium
        leading-4
        text-gray-700
        bg-white
        rounded-md
        border border-gray-300
        shadow-sm
        hover:bg-gray-50
        focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
      "
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
