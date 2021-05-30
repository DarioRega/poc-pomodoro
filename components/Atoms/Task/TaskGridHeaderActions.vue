<template>
  <div>
    <ul class="flex flex-row justify-end items-center">
      <li class="inline-flex h-full justify-center items-center">
        <span
          class="task-grid-header-actions"
          tabindex="0"
          @click="$emit('onArchiveBoxClick')"
        >
          <icon icon-name="archiveBox" />
        </span>
      </li>
      <li class="inline-flex h-full justify-center items-center">
        <span
          class="task-grid-header-actions"
          tabindex="0"
          @click="$emit('onTrashClick')"
        >
          <icon icon-name="trash" />
        </span>
      </li>
      <li class="toggler flex justify-start items-center pl-2">
        <toggle
          :toggled="shouldShowCompletedTask"
          @toggle="$emit('onToggleCompleteTasks')"
        />
        <p
          class="text-sm ml-2 font-bold transition-colors duration-200"
          :class="
            shouldShowCompletedTask
              ? 'text-dark-indigo dark:text-light-indigo'
              : 'text-dark-gray'
          "
        >
          {{ label }}
        </p>
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
    shouldShowCompletedTask: {
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
li:not(.toggler) {
  @apply border-r-[2.5px] border-dark-gray;
}

.task-grid-header-actions {
  @apply text-dark-gray mx-2 w-5 h-5 cursor-pointer transition-colors duration-200;
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
