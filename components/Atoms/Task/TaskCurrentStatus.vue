<template>
  <div
    class="w-full max-w-[9rem] text-celeste py-2 px-5 text-center uppercase rounded-full font-bold font-body tracking-wider text-sm hover:bg-opacity-80 dark:hover:bg-opacity-80"
    :class="classes"
  >
    {{ statusText }}
  </div>
</template>

<script>
import { TASK_STATUS } from '../../../constantes'

export default {
  name: 'TaskCurrentStatus',
  props: {
    currentStatus: {
      type: String,
      required: true,
    },
    statusText: {
      type: String,
      required: true,
    },
  },
  computed: {
    classes() {
      return {
        'bg-success': this.currentStatus === TASK_STATUS.COMPLETED,
        'bg-darker-gray': this.currentStatus === TASK_STATUS.ARCHIVED,
        'bg-dark-indigo dark:bg-light-indigo':
          this.currentStatus === TASK_STATUS.IN_PROGRESS ||
          this.currentStatus === TASK_STATUS.TODO,
      }
    },
  },
}
</script>
