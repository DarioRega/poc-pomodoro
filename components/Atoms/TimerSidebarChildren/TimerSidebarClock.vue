<template>
  <button
    class="timer-sidebar__clock font-bold uppercase rounded-full"
    @click="$emit('click')"
  >
    <!--    SESSION PENDING -->
    <div v-if="isSessionPending">
      <p v-show="isStacked" class="text-base font-bold">
        {{ labels.start }}
      </p>
      <p
        v-show="!isStacked"
        class="text-base px-4 xl:px-0 xl:text-lead font-bold"
      >
        {{ labels.startSession }}
      </p>
    </div>

    <div
      v-else
      class="
        flex
        justify-center
        items-center
        timer-sidebar__clock--time-visible
      "
      :class="isStacked ? 'flex-col' : 'flex-row'"
    >
      <h2>
        {{ currentTimer | getOnlyHours }}
      </h2>
      <h2 v-if="!isStacked" class="mx-0.5">:</h2>
      <h2>
        {{ currentTimer | getOnlyMinutes }}
      </h2>
    </div>
  </button>
</template>

<script>
export default {
  name: 'TimerSidebarClock',
  filters: {
    getOnlyHours(value) {
      if (value) {
        return value.split(':')[0]
      }
      return value
    },
    getOnlyMinutes(value) {
      if (value) {
        return value.split(':')[1]
      }
      return value
    },
  },
  props: {
    isStacked: {
      type: Boolean,
      default: false,
    },
    isSessionPending: {
      type: Boolean,
      default: false,
    },
    currentTimer: {
      type: String,
      required: true,
    },
    labels: {
      type: Object,
      required: true,
    },
  },
}
</script>
