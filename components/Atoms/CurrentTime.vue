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
    <transition-sidebar-content>
      <div
        v-show="!isLayoutStacked"
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
        <div
          v-show="!is24hFormat && !isLayoutStacked"
          class="flex-col items-center ml-3"
        >
          <p class="am-pm" :class="isAM && 'active'">AM</p>
          <p class="am-pm" :class="!isAM && 'active'">PM</p>
        </div>
      </div>
    </transition-sidebar-content>

    <transition-sidebar-content>
      <div
        v-show="isLayoutStacked"
        class="heading-current-time__container text-center"
      >
        <h2>
          {{ currentTime | getOnlyHours }}
        </h2>
        <h2>
          {{ currentTime | getOnlyMinutes }}
        </h2>
        <div v-show="!is24hFormat && isLayoutStacked" class="text-center mt-1">
          <p class="am-pm active">
            {{ currentTime | getOnlyAmPm }}
          </p>
        </div>
      </div>
    </transition-sidebar-content>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import TransitionSidebarContent from '@/components/Atoms/Transitions/Sidebar/TransitionSidebarContent'

export default {
  name: 'CurrentTime',
  components: { TransitionSidebarContent },
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
    isLayoutStacked: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentTime() {
      if (this.getTimezone) {
        const format = this.is24hFormat ? 'HH:mm' : 'hh:mm A'
        return moment().tz(this.getTimezone).format(format)
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
    is24hFormat() {
      return this.$store.getters[
        'settings/getIsUserSettings24hTimeFormatDisplay'
      ]
    },
    getTimezone() {
      return this.$store.getters['settings/getUserSettingTimezone']
    },
  },
}
</script>
<style lang="scss">
.heading-current-time__container {
  h2 {
    @apply mb-0 text-xl font-semibold leading-none font-timer text-dark-blue;
    @apply dark:text-celeste;

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
  @screen xl {
    @apply text-base;
  }
  &.active {
    @apply text-dark-blue dark:text-celeste;
  }
}
</style>
