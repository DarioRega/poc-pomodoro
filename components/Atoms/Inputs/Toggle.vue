<template>
  <div class="flex items-center">
    <button
      type="button"
      class="
        inline-flex
        relative
        flex-shrink-0
        rounded-full
        border-2 border-transparent
        transition-colors
        duration-200
        ease-in-out
        cursor-pointer
        focus:outline-none
        focus:ring-2 focus:ring-offset-2 focus:ring-dark-indigo
        dark:focus:ring-light-indigo dark:focus:ring-offset-dark-blue
      "
      :class="[
        toggled ? 'bg-dark-indigo dark:bg-light-indigo' : 'bg-dark-gray',
        size === 'small' ? 'w-8 h-4' : 'w-10 h-5',
      ]"
      role="switch"
      :aria-checked="toggled"
      @click="$emit('toggle', !toggled)"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="[
          toggled
            ? `translate-x-${size === 'small' ? '4' : '5'}`
            : 'translate-x-0',
          size === 'small' ? 'w-3 h-3' : 'w-4 h-4',
        ]"
        class="
          inline-block
          bg-white
          rounded-full
          ring-0
          shadow
          transition
          duration-200
          ease-in-out
          transform
          pointer-events-none
        "
      >
        <toggle-icon v-if="withIcon && size !== 'small'" :toggled="toggled" />
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
    size: {
      type: String,
      default: 'default',
    },
  },
}
</script>
