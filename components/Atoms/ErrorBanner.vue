<template>
  <div
    class="
      w-full
      max-w-md
      mt-4
      mb-10
      rounded-lg
      shadow-lg
      bg-lighter-white
      dark:bg-darker-blue
    "
  >
    <div class="flex relative items-start p-4">
      <div class="flex w-full items-start">
        <div
          class="inline-flex flex-shrink-0 mx-auto mr-5 text-center text-error"
        >
          <icon icon-name="error" class="w-6 h-6" />
        </div>

        <div class="flex-1">
          <h6 class="tracking-wide text-dark-blue dark:text-celeste">
            {{ title }}
          </h6>
          <ul
            class="mt-2 text-sm text-dark-gray list-disc"
            v-html="errors"
          ></ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '@/components/Atoms/Icon'

export default {
  name: 'ErrorBanner',
  components: { Icon },
  props: {
    title: {
      type: String,
      required: true,
    },
    errors: {
      type: String,
      required: true,
    },
  },
}
</script>
