<template>
  <aside
    class="
      app-layout__sidebar
      py-2
      flex
      relative
      flex-shrink-0
      max-h-screen
      sidebar__content-container
      bg-light-white
      dark:bg-dark-blue
    "
    :class="isStacked ? 'stacked w-24' : 'w-52 xl:w-64 3xl:w-80'"
  >
    <button
      class="
        sidebar__stacked-toggler
        absolute
        text-dark-blue
        dark:text-celeste
        w-9
        xl:w-10
        focus:outline-none
      "
      @click="$emit('onToggleStacked', !isStacked)"
    >
      <icon
        v-show="!isStacked"
        icon-name="arrowCircleLeft"
        class="w-full h-full"
      />
      <icon
        v-show="isStacked"
        icon-name="arrowCircleRight"
        class="w-full h-full"
      />
    </button>
    <div
      class="flex overflow-auto flex-col py-6 w-full max-w-full"
      :class="isStacked ? 'px-2' : 'px-6'"
    >
      <slot name="currentTime" />
      <div class="mt-8">
        <slot name="timer" />
      </div>
      <slot name="general" />
      <slot name="tasks" />
      <slot name="archived-tasks" />
    </div>
  </aside>
</template>

<script>
import Icon from '../Atoms/Icon'

export default {
  name: 'Sidebar',
  components: { Icon },
  props: {
    isStacked: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 0;
}

::-webkit-scrollbar-track,
::-webkit-scrollbar-thumb {
  @apply bg-transparent;
}

.sidebar__stacked-toggler {
  @apply top-[7.2rem] right-[-1rem];
  @screen xl {
    @apply top-[9rem] right-[-1.25rem];
  }
  &:hover {
    @apply text-opacity-70;
  }
}

//whatinputfile
[data-whatinput='keyboard'] .sidebar__stacked-toggler:focus {
  @apply text-dark-indigo dark:text-light-indigo;
}
</style>
