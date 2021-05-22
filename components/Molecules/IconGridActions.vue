<template>
  <ul
    class="grid divide-x-[3px] divide-dark-gray items-center"
    :class="`grid-cols-${actions.length}`"
  >
    <li
      v-for="action in actions"
      :key="action.name"
      class="flex col-span-1 justify-center items-center"
    >
      <button
        class="
          w-6
          h-6
          text-dark-blue
          dark:text-celeste
          hover:text-opacity-80
          focus:outline-none
        "
        @click="$emit(action.emitter)"
      >
        <icon
          v-if="!action.hasToggle"
          :icon-name="action.icon"
          class="w-full h-full"
        />
        <template v-else>
          <icon v-if="isMuted" icon-name="soundMuted" class="w-full h-full" />
          <icon v-else icon-name="soundOpen" class="w-full h-full" />
        </template>
      </button>
    </li>
  </ul>
</template>

<script>
import Icon from '@/components/Atoms/Icon'
// TODO add focus what input
const ACTIONS = [
  {
    name: 'settings',
    icon: 'cog',
    emitter: 'onSettingsClick',
  },
  {
    name: 'sound',
    hasToggle: true,
    emitter: 'onSoundClick',
  },
  {
    name: 'help',
    icon: 'questionMarkRounded',
    emitter: 'onHelpClick',
  },
  {
    name: 'logout',
    icon: 'arrowRightRounded',
    emitter: 'onLogout',
  },
]

export default {
  name: 'IconGridActions',
  components: { Icon },
  props: {
    isMuted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    actions() {
      return ACTIONS
    },
  },
}
</script>
