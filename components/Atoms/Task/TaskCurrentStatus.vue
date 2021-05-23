<template>
  <div
    ref="currentTaskStatus"
    tabindex="0"
    class="
      w-full
      rounded-full
      max-w-[9rem]
      min-w-[9rem]
      text-celeste
      py-2
      px-5
      text-center
      uppercase
      font-bold font-body
      tracking-wider
      text-sm
      hover:bg-opacity-80
      dark:hover:bg-opacity-80
    "
    :class="classes"
    @click="$emit('click', $event)"
    @keydown="$emit('keydown', $event)"
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
    shouldFocus: {
      type: Boolean,
      default: false,
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
  watch: {
    shouldFocus(newValue, oldValue) {
      if (newValue) {
        this.$refs.currentTaskStatus.focus()
      }
    },
  },
  methods: {
    handleKeyDown(evt) {
      if (evt.keyCode === 13) {
        this.$emit('click')
      }
    },
  },
}
</script>
