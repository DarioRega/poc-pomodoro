<template>
  <div class="inline-flex" :class="classes">
    <icon icon-name="pomodoro" class="w-full h-full" />
  </div>
</template>
<script>
import { STEPS_STATUS } from '@/constantes'
import Icon from '~/components/Atoms/Icon'

export default {
  name: 'PomodoroCounter',
  components: { Icon },
  props: {
    status: {
      type: String,
      default: STEPS_STATUS.PENDING,
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'text-error':
          this.status === STEPS_STATUS.DONE ||
          this.status === STEPS_STATUS.SKIPPED,
        'text-success':
          (this.status === STEPS_STATUS.IN_PROGRESS ||
            this.status === STEPS_STATUS.PENDING ||
            this.status === STEPS_STATUS.PAUSED) &&
          this.isCurrent,
        'text-dark-gray':
          this.status === STEPS_STATUS.PENDING && !this.isCurrent,
      }
    },
  },
}
</script>
