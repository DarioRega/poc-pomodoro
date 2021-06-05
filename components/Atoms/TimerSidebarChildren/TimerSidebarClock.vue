<template>
  <button
    class="timer-sidebar__clock font-bold uppercase rounded-full"
    @click="$emit('click')"
  >
    <!--    SESSION PENDING -->
    <div v-if="getTimerState.isSessionPending">
      <p v-show="isLayoutStacked" class="text-base font-bold">
        {{ $t('Start') }}
      </p>
      <p
        v-show="!isLayoutStacked"
        class="text-base px-4 xl:px-0 xl:text-lead font-bold"
      >
        {{ $t('Start session') }}
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
      :class="isLayoutStacked ? 'flex-col' : 'flex-row'"
    >
      <h2>
        {{ getCurrentTimer | getOnlyHours }}
      </h2>
      <h2 v-if="!isLayoutStacked" class="mx-0.5">:</h2>
      <h2>
        {{ getCurrentTimer | getOnlyMinutes }}
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
    isLayoutStacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getTimerState() {
      return this.$store.getters['sessions/getTimerState']
    },
    getCurrentTimer() {
      return this.$store.getters['sessions/getCurrentTimer']
    },
  },
}
</script>
