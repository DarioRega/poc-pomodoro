<template>
  <div class="inline-flex items-center">
    <h2 class="mb-0 heading-timer text-dark-blue dark:text-celeste">
      {{ currentTime | removeAmPm }}
    </h2>
    <div v-if="!is24h" class="flex-col items-center ml-3">
      <p class="am-pm" :class="isMorning && 'active'">
        AM
      </p>
      <p class="am-pm" :class="!isMorning && 'active'">
        PM
      </p>
    </div>
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
  },
  props: {
    timeZoneChoosen: {
      type: String,
    },
    is24h: {
      type: Boolean,
      default: true,
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
    isMorning() {
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
