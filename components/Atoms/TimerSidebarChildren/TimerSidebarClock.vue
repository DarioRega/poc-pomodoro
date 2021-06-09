<template>
  <button
    class="timer-sidebar__clock font-bold uppercase rounded-full"
    @click="$emit('click')"
  >
    <!--    SESSION NOT CREATED -->
    <div v-if="!sessionState.isSessionCreated">
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
        {{ currentStepTimer | getOnlyHours }}
      </h2>
      <h2 v-if="!isLayoutStacked" class="mx-0.5">:</h2>
      <h2>
        {{ currentStepTimer | getOnlyMinutes }}
      </h2>
    </div>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'

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
    ...mapGetters({
      sessionState: 'sessions/getSessionState',
      currentStepTimer: 'timers/getCurrentStepTimer',
    }),
  },
}
</script>
