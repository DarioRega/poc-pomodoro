<template>
  <aside
    class="
      app-layout__sidebar
      flex
      relative
      flex-shrink-0
      max-h-screen
      sidebar__content-container
      bg-light-white
      dark:bg-dark-blue
    "
    :class="isLayoutStacked ? 'stacked w-24' : 'w-52 xl:w-64 3xl:w-80'"
  >
    <button
      ref="sidebarToggler"
      tabindex="0"
      class="
        sidebar__stacked-toggler
        absolute
        text-dark-blue
        dark:text-celeste
        w-9
        xl:w-10
        focus:outline-none
      "
      @click="handleToggleStacked"
    >
      <icon
        v-show="!isLayoutStacked"
        icon-name="arrowCircleLeft"
        class="w-full h-full"
      />
      <icon
        v-show="isLayoutStacked"
        icon-name="arrowCircleRight"
        class="w-full h-full"
      />
    </button>
    <div
      class="flex overflow-auto flex-col py-6 w-full max-w-full"
      :class="isLayoutStacked ? 'px-2' : 'px-6'"
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
import { SIDEBAR_TOGGLE_ANIMATION_TIMEOUT } from '@/constantes'
import Icon from '../Atoms/Icon'

export default {
  name: 'Sidebar',
  components: { Icon },
  props: {
    isLayoutStacked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isTogglerDisabled: false,
    }
  },
  watch: {
    /*
      Disable the button to avoid animations misbehavior if user spamm the click, cause of the setTimeouts used
      Disabling the button will lose the focus on it, to be able to re-focus it and have the user won't notice he lost it,
      we must to wait at least 100ms to trigger the focus on it with the $refs. That's why there is a second setTimeout inside.
    */
    isLayoutStacked(newValue, oldValue) {
      this.isTogglerDisabled = true
      setTimeout(() => {
        this.isTogglerDisabled = false

        setTimeout(() => {
          this.$refs.sidebarToggler.focus()
        }, 100)
      }, SIDEBAR_TOGGLE_ANIMATION_TIMEOUT)
    },
  },
  methods: {
    handleToggleStacked() {
      this.$store.commit('globalState/TOGGLE_STACKED_LAYOUT')
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
  &:focus {
    @apply text-dark-indigo dark:text-light-indigo;
  }
}

//whatinputfile
[data-whatinput='keyboard'] .sidebar__stacked-toggler:focus {
  @apply text-dark-indigo dark:text-light-indigo;
}
</style>
