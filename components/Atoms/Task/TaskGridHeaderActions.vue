<template>
  <div>
    <ul class="grid divide-x-[3px] grid-cols-5 divide-dark-gray items-center">
      <li class="flex col-span-1 justify-center items-center">
        <icon
          tabindex="0"
          icon-name="archiveBox"
          class="task-grid-header-actions"
        />
      </li>
      <li class="flex col-span-1 h-full justify-center items-center">
        <icon
          tabindex="0"
          icon-name="archiveBox"
          class="task-grid-header-actions"
        />
      </li>
      <li class="flex col-span-3 justify-center items-center">
        <toggle :toggled="isToggled" @click="$emit('onToggle')" />
        <p class="ml-3 font-bold text-dark-gray">{{ label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/Atoms/Icon'
import Toggle from '@/components/Atoms/Inputs/Toggle'

export default {
  name: 'TaskGridHeaderActions',
  components: { Icon, Toggle },
  props: {
    isToggled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.task-grid-header-actions {
  @apply text-dark-gray w-5 h-5 cursor-pointer transition-colors duration-200;
  &:hover {
    @apply text-dark-blue;
    @apply dark:text-celeste;
  }
  &:focus {
    @apply text-dark-indigo outline-none;
    @apply dark:text-light-indigo;
  }
}
</style>
