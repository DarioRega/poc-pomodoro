<template>
  <section>
    <div
      class="header flex overflow-hidden"
      :class="isStacked && 'header--stacked'"
    >
      <div class="header__col task-name">
        <button class="inline-flex items-center justify-center">
          <icon v-if="isToggled" icon-name="info" class="w-4" />
          <icon v-else icon-name="close" class="w-4" />
          <h6 class="ml-4">{{ labels.all }}</h6>
        </button>
      </div>
      <div class="w-40 header__col header__col--center">
        <h6>{{ labels.status }}</h6>
      </div>

      <div class="w-28 flex-none header__col header__col--center">
        <h6>{{ labels.deadline }}</h6>
      </div>

      <div class="w-4/12 header__col pl-6">
        <div class="flex justify-between items-center w-full">
          <h6>{{ labels.description }}</h6>
          <div class="flex items-center justify-end">actions</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Icon from '@/components/Atoms/Icon'

export default {
  name: 'TaskGridHeaderAllTasks',
  components: { Icon },
  props: {
    isToggled: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object,
      required: true,
    },
    isStacked: {
      type: Boolean,
      default: false,
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
