<template>
  <div
    class="mt-4 pt-4 border-t border-dark-gray-20 flex justify-center gap-x-4"
  >
    <nuxt-link
      :to="primaryActionRedirect"
      class="cursor-pointer text-current hover:opacity-80"
    >
      {{ primaryLabel }}</nuxt-link
    >
    <p v-show="secondaryLabel" class="text-dark-gray">-</p>
    <nuxt-link
      v-show="secondaryLabel"
      :to="secondaryActionRedirect"
      class="cursor-pointer text-current hover:opacity-80"
      >{{ secondaryLabel }}</nuxt-link
    >
  </div>
</template>

<script>
export default {
  name: 'RedirectActionsFooter',
  props: {
    primaryLabel: {
      type: String,
      required: true,
    },
    secondaryLabel: {
      type: String,
      default: '',
    },
    primaryActionRedirect: {
      type: String,
      required: true,
    },
    secondaryActionRedirect: {
      type: String,
      default: '',
    },
  },
}
</script>
