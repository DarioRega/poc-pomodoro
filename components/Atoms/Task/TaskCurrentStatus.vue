<template>
  <div
    ref="currentTaskStatus"
    tabindex="0"
    class="
      task-current-status
      w-full
      rounded-full
      max-w-[8rem]
      min-w-[6rem]
      text-celeste
      py-1
      text-center
      uppercase
      font-bold font-body
      tracking-wider
      text-xs
      hover:bg-opacity-80
      dark:hover:bg-opacity-80
      focus:outline-none
    "
    :class="classes"
    @click="$emit('click', $event)"
    @keydown="$emit('keydown', $event)"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    {{ statusText }}
  </div>
</template>

<script>
import { TASK_STATUS_VALUES } from '../../../constantes'

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
        'bg-success': this.currentStatus === TASK_STATUS_VALUES.DONE,
        'bg-darker-gray': this.currentStatus === TASK_STATUS_VALUES.ARCHIVED,
        'bg-dark-indigo dark:bg-light-indigo':
          this.currentStatus === TASK_STATUS_VALUES.IN_PROGRESS ||
          this.currentStatus === TASK_STATUS_VALUES.TODO,
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
