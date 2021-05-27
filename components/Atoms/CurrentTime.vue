<template>
  <div
    class="
      inline-flex
      flex-wrap
      justify-center
      items-start
      max-w-full
      min-w-[5rem]
    "
  >
    <transition
      enter-active-class="transform transition-all duration-500 delay-500"
      enter-class="-translate-x-80"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in duration-200 delay-0"
      leave-class="translate-x-0"
      leave-to-class="-translate-x-80"
    >
      <div
        v-show="!isStacked"
        class="
          inline-flex
          justify-center
          items-center
          heading-current-time__container
          flex-row
        "
      >
        <h2>
          {{ currentTime | getOnlyHours }}
        </h2>
        <h2>:</h2>

        <h2>
          {{ currentTime | getOnlyMinutes }}
        </h2>
        <div v-show="!is24h && !isStacked" class="flex-col items-center ml-3">
          <p class="am-pm" :class="isAM && 'active'">AM</p>
          <p class="am-pm" :class="!isAM && 'active'">PM</p>
        </div>
      </div>
    </transition>

    <transition
      enter-active-class="transform transition-all duration-500 delay-500"
      enter-class="-translate-x-80"
      enter-to-class="translate-x-0"
      leave-active-class="transform transition ease-in duration-200 delay-0"
      leave-class="translate-x-0"
      leave-to-class="-translate-x-80"
    >
      <div v-show="isStacked" class="heading-current-time__container">
        <h2>
          {{ currentTime | getOnlyHours }}
        </h2>
        <h2>
          {{ currentTime | getOnlyMinutes }}
        </h2>
        <p v-show="!is24h && isStacked" class="am-pm active">
          {{ currentTime | getOnlyAmPm }}
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  name: 'CurrentTime',
  filters: {
    removeAmPm(value) {
      if (value.includes('AM') || value.includes('PM')) {
        return value.split(' ')[0]
      }
      return value
    },
    getOnlyHours(value) {
      if (value) {
        return value.split(':')[0]
      }
      return value
    },
    getOnlyMinutes(value) {
      if (value) {
        const minutes = value.split(':')[1]
        if (minutes.includes('AM') || minutes.includes('PM')) {
          return minutes.split(' ')[0]
        }
        return minutes
      }
      return value
    },
    getOnlyAmPm(value) {
      if (value) {
        return value.split(' ')[1]
      }
      return value
    },
  },
  props: {
    timeZoneChoosen: {
      type: String,
      default: '',
    },
    is24h: {
      type: Boolean,
      default: true,
    },
    isStacked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      timeZone: '',
    }
  },
  computed: {
    currentTime() {
      if (this.timeZone) {
        const format = this.is24h ? 'HH:mm' : 'hh:mm A'
        return moment().tz(this.timeZone).format(format)
      }
      return ''
    },
    isAM() {
      if (this.currentTime) {
        if (this.currentTime.includes('AM')) {
          return true
        }
      }
      return false
    },
  },
  mounted() {
    if (!this.timeZoneChoosen) {
      this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    } else {
      this.timeZone = this.timeZoneChoosen
    }
  },
}
</script>
<style lang="scss">
.heading-current-time__container {
  h2 {
    @apply mb-0 text-xl font-semibold leading-none font-timer text-dark-blue;
    @apply dark:text-celeste;

    @screen md {
      @apply text-2xl;
    }

    @screen xl {
      @apply text-3xl font-bold tracking-wide;
    }
  }
}
.am-pm {
  @apply text-xs font-bold font-timer text-dark-gray;
  &:not(.active) {
    @apply transition-colors duration-200;
  }
  @screen md {
    @apply text-sm;
  }
  @screen xl {
    @apply text-base;
  }
  &.active {
    @apply text-dark-blue dark:text-celeste;
  }
}
</style>
