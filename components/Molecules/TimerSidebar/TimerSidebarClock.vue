<template>
  <button class="timer-sidebar__clock" @click="$emit('click')">
    <div v-if="isSessionPending" class="font-semibold">
      <p v-show="isStacked" class="text-base">
        {{ labels.start }}
      </p>
      <p v-show="!isStacked" class="text-lead">
        {{ labels.startSession }}
      </p>
    </div>
    <div
      v-else
      class="flex justify-center items-center timer-sidebar__clock--time-visible"
      :class="isStacked ? 'flex-col' : 'flex-row'"
    >
      <h2>
        {{ currentTimer | getOnlyHours }}
      </h2>
      <h2 v-if="!isStacked" class="mx-0.5">
        :
      </h2>
      <h2>
        {{ currentTimer | getOnlyMinutes }}
      </h2>
    </div>
    <p
      v-show="shouldShowStartText"
      class="mt-1 -mb-5 font-bold tracking-wide uppercase"
    >
      {{ labels.start }}
    </p>
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
    shouldShowStartText: {
      type: Boolean,
      default: false,
    },
    currentTimer: {
      type: String,
      required: true,
    },
    labels: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
