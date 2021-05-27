<template>
  <div
    class="
      mx-auto
      max-w-md
      w-full
      py-8
      px-12
      shadow-lg
      text-center
      rounded-md
      bg-lighter-white
      dark:bg-darker-blue
    "
  >
    <h3 class="mb-12 text-dark-blue dark:text-celeste">
      {{ greeting }}
    </h3>
    <p
      v-if="additionalInfo"
      class="mb-2 font-bold text-dark-blue dark:text-celeste"
    >
      {{ additionalInfo }}
    </p>

    <slot />
  </div>
</template>

<script>
export default {
  name: 'ContainerCard',
  props: {
    greeting: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: String,
      default: '',
    },
  },
}
</script>
