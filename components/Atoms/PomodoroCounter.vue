<template>
  <div class="inline-flex" :class="classes">
    <icon icon-name="pomodoro" class="w-full h-full" />
  </div>
</template>
<script>
import Icon from '~/components/Atoms/Icon'

export default {
  name: 'PomodoroCounter',
  components: { Icon },
  props: {
    status: {
      type: String,
      default: 'PENDING',
    },
  },
  computed: {
    classes() {
      return {
        'text-error': this.status === 'DONE',
        'text-success': this.status === 'CURRENT',
        'text-dark-gray': this.status === 'PENDING',
      }
    },
  },
}
</script>
