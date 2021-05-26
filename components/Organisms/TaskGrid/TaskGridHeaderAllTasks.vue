<template>
  <section>
    <div class="header flex overflow-hidden">
      <div class="header__col flex-1">
        <button class="inline-flex items-center justify-center">
          <icon v-if="isToggled" icon-name="info" class="w-4" />
          <icon v-else icon-name="close" class="w-4" />
          <h6 class="ml-4">{{ labels.all }}</h6>
        </button>
      </div>
      <div class="w-36 header__col header__col--center">
        <h6>{{ labels.status }}</h6>
      </div>

      <div class="w-24 flex-none header__col header__col--center">
        <h6>{{ labels.deadline }}</h6>
      </div>

      <div class="w-1/6 header__col pl-6">
        <h6>{{ labels.description }}</h6>
      </div>

      <div class="w-1/4 header__col justify-end">
        <div class="flex items-center justify-end">actions</div>
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
  },
}
</script>
<style lang="scss" scoped>
.header {
  &__col {
    @apply overflow-hidden flex items-center;
    &--center {
      @apply mx-auto text-center;
    }
    & h6 {
      @apply mb-0;
    }
  }
}
</style>
