<template>
  <div class="inline-flex flex-wrap justify-center items-center max-w-full">
    <div
      class="inline-flex justify-center items-center heading-current-time__container"
      :class="isStacked ? 'flex-col' : 'flex-row'"
    >
      <h2>
        {{ currentTime | getOnlyHours }}
      </h2>
      <h2 v-if="!isStacked">
        :
      </h2>
      <h2>
        {{ currentTime | getOnlyMinutes }}
      </h2>
    </div>
    <div v-if="!is24h && !isStacked" class="flex-col items-center ml-3">
      <p class="am-pm" :class="isAM && 'active'">
        AM
      </p>
      <p class="am-pm" :class="!isAM && 'active'">
        PM
      </p>
    </div>
    <p v-if="!is24h && isStacked" class="am-pm active">
      {{ currentTime | getOnlyAmPm }}
    </p>
  </div>
</template>

<script>
import moment from 'moment-timezone'
export default {
  name: 'CurrentTime',
  filters: {
    removeAmPm(value) {
      if (value.includes('AM')) {
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
        if (minutes.includes('AM')) {
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
        return moment()
          .tz(this.timeZone)
          .format(format)
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
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      this.timeZone = timezone
    } else {
      this.timeZone = this.timeZoneChoosen
    }
  },
}
</script>
<style lang="scss" scoped>
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
  @apply text-xs font-bold transition-colors duration-200 font-timer text-dark-gray;

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
