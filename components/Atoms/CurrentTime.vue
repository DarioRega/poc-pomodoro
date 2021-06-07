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
        v-show="isUnStacked"
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
        <div v-show="!is24hFormat" class="flex-col items-center ml-3">
          <p class="am-pm" :class="isAM && 'active'">AM</p>
          <p class="am-pm" :class="!isAM && 'active'">PM</p>
        </div>
      </div>
    </transition-sidebar-content>

    <transition-sidebar-content>
      <div
        v-show="isStacked"
        class="heading-current-time__container text-center"
      >
        <h2>
          {{ currentTime | getOnlyHours }}
        </h2>
        <h2>
          {{ currentTime | getOnlyMinutes }}
        </h2>
        <div v-show="!is24hFormat" class="text-center mt-1">
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
import { SIDEBAR_TOGGLE_ANIMATION_TIMEOUT } from '@/constantes'

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
  data() {
    return {
      isUnStacked: true,
      isStacked: false,
    }
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
  watch: {
    /*
      Allow the time necessary to not have both element on the same time
      So we don't see them going down or going up during the animation process
      all files that implement this logic on sidebar, must have always the same code/duration
   */
    isLayoutStacked(isStackedTrue, oldValue) {
      if (isStackedTrue) {
        this.isUnStacked = false
        setTimeout(() => {
          this.isStacked = true
        }, SIDEBAR_TOGGLE_ANIMATION_TIMEOUT)
      } else {
        this.isStacked = false
        setTimeout(() => {
          this.isUnStacked = true
        }, SIDEBAR_TOGGLE_ANIMATION_TIMEOUT)
      }
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
