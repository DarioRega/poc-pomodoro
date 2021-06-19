<template>
  <ul
    class="
      w-48
      flex flex-row
      items-center
      justify-center
      divide-x-2 divide-dark-gray
    "
  >
    <li
      v-for="action in actions"
      :key="action.name"
      class="flex justify-center items-center px-2"
    >
      <button
        class="
          btn-grid-actions
          w-6
          h-6
          text-dark-blue
          dark:text-celeste
          hover:opacity-80
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
const ACTIONS = [
  {
    name: 'settings',
    icon: 'cog',
    emitter: 'onSettingsClick',
  },
  // v2
  // {
  //   name: 'sound',
  //   hasToggle: true,
  //   emitter: 'onSoundClick',
  // },
  // {
  //   name: 'help',
  //   icon: 'questionMarkRounded',
  //   emitter: 'onHelpClick',
  // },
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
