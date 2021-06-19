<template>
  <section>
    <div
      class="header flex overflow-hidden min-h-[2.5rem]"
      :class="isLayoutStacked && 'header--stacked'"
    >
      <div class="header__col task-name">
        <button
          class="
            task-grid-header-toggler
            inline-flex
            items-center
            justify-center
          "
          @click="$emit('onToggle')"
        >
          <icon
            v-show="isToggled"
            icon-name="nakedArrowDown"
            class="w-4 task-grid-header-toggler__icon"
          />
          <icon
            v-show="!isToggled"
            icon-name="nakedArrowUp"
            class="w-4 task-grid-header-toggler__icon"
          />
          <h6 class="ml-4">{{ $t('All') }}</h6>
        </button>
      </div>
      <div class="w-32 3xl:w-56 px-4 header__col header__col--center">
        <h6>{{ $t('Status') }}</h6>
      </div>

      <div class="w-24 3xl:w-32 px-2 flex-none header__col header__col--center">
        <h6>{{ $t('Deadline') }}</h6>
      </div>

      <div class="w-5/12 header__col pl-6">
        <div class="flex justify-between items-center w-full h-full">
          <h6 class="flex-none w-24">{{ $t('Description') }}</h6>
          <div class="flex-1 flex items-center justify-end h-full">
            <task-grid-header-actions
              class="w-full h-full ml-2 2xl:ml-4"
              :should-show-completed-task="shouldShowCompletedTask"
              :is-delete-enabled="isDeleteEnabled"
              :is-archive-box-enabled="isArchiveBoxEnabled"
              :label="
                clientWidth < 1400
                  ? $t('Show completed')
                  : $t('Show completed tasks')
              "
              @onArchiveBoxClick="$emit('onArchiveBoxClick')"
              @onTrashClick="$emit('onTrashClick')"
              @onToggleCompleteTasks="$emit('onToggleCompleteTasks')"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Icon from '@/components/Atoms/Icon'
import TaskGridHeaderActions from '@/components/Atoms/Task/TaskGridHeaderActions'

export default {
  name: 'TaskGridHeaderAllTasks',
  components: { Icon, TaskGridHeaderActions },
  props: {
    isToggled: {
      type: Boolean,
      default: false,
    },
    shouldShowCompletedTask: {
      type: Boolean,
      default: true,
    },
    isLayoutStacked: {
      type: Boolean,
      default: false,
    },
    isArchiveBoxEnabled: {
      type: Boolean,
      default: false,
    },
    isDeleteEnabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clientWidth: 0,
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleClientWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleClientWidth)
  },
  methods: {
    handleClientWidth() {
      this.clientWidth = window.innerWidth
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  @apply pb-1 border-b-2 border-dark-blue;
  @apply dark:border-celeste;

  .task-name {
    @apply flex-1;
  }

  &__col {
    @apply overflow-hidden flex items-center;
    @apply text-dark-blue;
    @apply dark:text-celeste;

    & svg:hover {
      @apply opacity-80;
      @apply dark:opacity-80;
    }

    &--center {
      @apply mx-auto text-center justify-center;
    }
    & h6 {
      @apply mb-0;
    }
  }
  &--stacked {
    .task-name {
      @apply w-1/4 flex-none;
    }
  }
}
</style>
