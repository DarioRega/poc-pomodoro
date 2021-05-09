<template>
  <div>
    <button
      type="button"
      class="inline-flex relative flex-shrink-0 w-10 h-5 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-indigo dark:focus:ring-light-indigo"
      :class="toggled ? 'bg-dark-indigo dark:bg-light-indigo' : 'bg-dark-gray'"
      role="switch"
      :aria-checked="toggled"
      @click="$emit('toggle', !toggled)"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="toggled ? 'translate-x-5' : 'translate-x-0'"
        class="inline-block w-4 h-4 bg-white rounded-full ring-0 shadow transition duration-200 ease-in-out transform pointer-events-none"
      >
        <toggle-icon v-if="withIcon" :toggled="toggled" />
      </span>
    </button>
  </div>
</template>

<script>
import ToggleIcon from './ToggleIcon'

export default {
  name: 'Toggle',
  components: { ToggleIcon },
  props: {
    toggled: {
      type: Boolean,
      default: false,
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
