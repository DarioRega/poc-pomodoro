<template>
  <div class="h-full flex items-center justify-end mr-1 xl:mr-0">
    <ul class="flex flex-row justify-end items-center">
      <li
        v-show="withArchiveFunctionality"
        class="
          flex
          h-full
          justify-center
          items-center
          border-r-[2.5px] border-dark-gray
        "
      >
        <span
          tabindex="0"
          class="task-grid-header-actions w-4 xl:w-5"
          :class="isArchiveBoxEnabled && 'enabled'"
          @click="$emit('onArchiveBoxClick')"
        >
          <icon icon-name="archiveBox" />
        </span>
      </li>
      <li
        class="flex h-full justify-center items-center"
        :class="
          withShowCompletedFunctionality && 'border-r-[2.5px] border-dark-gray'
        "
      >
        <span
          tabindex="0"
          class="task-grid-header-actions w-4 xl:w-5"
          :class="isDeleteEnabled && 'enabled'"
          @click="$emit('onTrashClick')"
        >
          <icon icon-name="trash" />
        </span>
      </li>
      <li
        v-show="withShowCompletedFunctionality"
        class="toggler flex justify-start items-center pl-2"
      >
        <toggle
          :toggled="shouldShowCompletedTask"
          size="small"
          @toggle="$emit('onToggleCompleteTasks')"
        />
        <p
          class="
            hidden
            xl:block
            text-sm
            ml-2
            font-bold
            transition-colors
            duration-200
          "
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
      default: true,
    },
    label: {
      type: String,
      required: true,
    },
    withArchiveFunctionality: {
      type: Boolean,
      default: true,
    },
    withShowCompletedFunctionality: {
      type: Boolean,
      default: true,
    },
    isArchiveBoxEnabled: {
      type: Boolean,
      default: false,
    },
    isDeleteEnabled: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.task-grid-header-actions {
  @apply flex items-center text-dark-gray mx-2 cursor-pointer transition-colors duration-200;

  &.enabled {
    @apply text-dark-indigo dark:text-light-indigo;
  }

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
