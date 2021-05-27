<template>
  <section
    class="
      h-screen
      w-screen
      flex flex-col
      justify-center
      items-center
      overflow-hidden
      bg-light-white
      dark:bg-dark-blue
    "
  >
    <transition-opacity>
      <div v-show="isLoading">
        <screen-loader>
          <h5 class="font-body tracking-wider text-dark-blue dark:text-celeste">
            {{ loadingLabel }}
          </h5>
        </screen-loader>
      </div>
    </transition-opacity>
    <h1
      class="
        text-dark-indigo
        dark:text-light-indigo
        font-bold
        uppercase
        tracking-wider
        text-3xl
        mb-16
      "
    >
      Pomodoro
    </h1>
    <slot />
  </section>
</template>

<script>
import ScreenLoader from '@/components/Atoms/Loaders/ScreenLoader'

export default {
  name: 'ContainerPage',
  components: { ScreenLoader },
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    loadingLabel: {
      type: String,
      required: true,
    },
  },
}
</script>
