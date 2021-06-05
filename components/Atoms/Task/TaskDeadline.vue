<template>
  <div
    class="
      inline-flex
      flex-col
      justify-center
      items-center
      self-center
      h-full
      task-deadline
    "
    :class="[
      value && 'relative',
      isSelected && 'selected',
      isCompleted && 'completed',
    ]"
  >
    <p v-if="value" class="text-sm border-0 task-deadline__value">
      {{ value }}
    </p>
    <button
      v-if="!value"
      tabindex="0"
      class="task-deadline__icon inline-flex focus:outline-none"
      @click="isOpen = true"
    >
      <icon icon-name="addCalendar" />
    </button>

    <button
      v-show="!showActions && value"
      class="task-deadline__toggler absolute top-[1.2rem] inline-flex"
      @click="showActions = !showActions"
    >
      <icon icon-name="threeDots" class="w-4" />
    </button>
    <div
      v-if="showActions"
      class="
        task-deadline__actions
        absolute
        top-[1.7rem]
        z-20
        bg-light-white
        dark:bg-dark-blue
        py-2
        px-1
      "
    >
      <button
        tabindex="0"
        class="task-deadline__icon mr-2 focus:outline-none"
        @click="isOpen = true"
      >
        <icon icon-name="editCalendar" />
      </button>
      <button
        tabindex="0"
        class="task-deadline__icon ml-2 focus:outline-none"
        @click="handleRemoveValue"
      >
        <icon icon-name="removeCalendar" />
      </button>
    </div>
    <div class="absolute calendar-container">
      <div v-show="isOpen" :class="value ? '-mt-4' : '-mt-8'">
        <flat-pickr
          :id="`task-deadline-calendar-${uniqueKey}`"
          v-model="date"
          :config="config"
          @on-change="onChange"
        />
        <div class="mt-3 text-center">
          <brand-button
            type="primary"
            tabindex="0"
            @click="handleCloseActionsCalendar"
          >
            {{ closeButtonText }}
          </brand-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { fr } from '@/constantes/calendarLocales/fr'
import Icon from '../Icon'
import BrandButton from '../BrandButton'

// TODO Invalid locale warning message in browser
const calendarLocales = {
  fr,
}
export default {
  name: 'TaskDeadline',
  components: {
    BrandButton,
    flatPickr,
    Icon,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    closeButtonText: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showActions: false,
      date: null,
      calendar: undefined,
      isOpen: false,
      config: {
        inline: true,
        locale: this.$i18n.locale || this.$i18n.fallbackLocale,
      },
    }
  },
  computed: {
    uniqueKey() {
      return Math.floor(Math.random() * 99999)
    },
  },
  mounted() {
    this.setCalendarInstance()
    window.document.addEventListener('click', this.handleWindowClick)
  },
  beforeDestroy() {
    window.document.removeEventListener('click', this.handleWindowClick)
  },
  methods: {
    handleRemoveValue() {
      this.showActions = false
      this.$emit('change', null, null)
    },
    handleCloseActionsCalendar() {
      this.showActions = false
      this.isOpen = false
    },
    onChange(dateTime, dateString) {
      this.$emit('change', dateTime, dateString)
      this.handleCloseActionsCalendar()
    },
    setCalendarInstance() {
      const calendar = document.querySelector(
        `#task-deadline-calendar-${this.uniqueKey}`
      )
      if (this.locale !== this.$i18n.fallbackLocale) {
        this.config.locale = calendarLocales[this.$i18n.locale]
      }
      this.calendar = calendar._flatpickr
    },
    handleWindowClick(evt) {
      if (!this.$el.contains(evt.target)) {
        this.showActions = false
        this.isOpen = false
      }
    },
  },
}
</script>

<style lang="scss">
.task-deadline {
  &__value {
    @apply text-dark-gray;
  }

  &__icon,
  &__toggler {
    @apply transition-colors text-dark-gray;
    &:hover {
      @apply text-dark-blue;
      @apply dark:text-celeste;
    }
    &:focus {
      @apply text-dark-indigo;
      @apply dark:text-light-indigo;
    }
    &:not(.task-deadline__toggler) > svg {
      @apply w-5 h-5;
    }
  }
}

.task-deadline.selected {
  .task-deadline {
    &__value,
    &__icon,
    &__toggler {
      @apply text-dark-blue  #{!important};
      @apply dark:text-celeste #{!important};
      &:focus {
        @apply text-dark-indigo #{!important};
        @apply dark:text-light-indigo #{!important};
      }
    }
  }
}

.task-deadline.completed {
  .task-deadline {
    &__value,
    &__icon,
    &__toggler {
      @apply text-success;
      &:focus {
        @apply text-success;
      }
    }
  }
}

// FLATPICKR
.calendar-container {
  @apply top-[3.3rem] right-0 left-[50%] flex justify-center z-[60] mx-auto;

  .flatpickr-input {
    @apply invisible w-0 h-0;
    &:focus {
      @apply outline-none;
    }
  }

  .flatpickr-calendar {
    @apply bg-lighter-white font-body;
    @apply dark:bg-darker-blue;
    @apply font-body;
  }

  // days, body section
  .flatpickr-day.selected {
    @apply bg-dark-indigo text-celeste;
    @apply dark:bg-light-indigo;
    &:hover {
      @apply bg-opacity-70 border-transparent bg-dark-indigo border-dark-indigo;
      @apply dark:bg-light-indigo dark:border-light-indigo dark:bg-opacity-70 dark:border-transparent;
    }
  }
  .flatpickr-weekday,
  .flatpickr-day {
    @apply font-semibold capitalize text-dark-gray;
  }
  .flatpickr-day {
    &:hover {
      @apply bg-opacity-10 border-transparent bg-dark-gray border-dark-gray;
      @apply dark:bg-opacity-50 dark:border-opacity-50;
    }
  }
  .flatpickr-day.prevMonthDay {
    @apply text-opacity-50;
  }

  .flatpickr-day.today {
    @apply text-dark-blue border-dark-blue;
    @apply dark:text-celeste dark:border-celeste;

    &:hover {
      @apply bg-dark-indigo text-celeste border-dark-indigo;
      @apply dark:bg-light-indigo dark:border-light-indigo;
    }
  }

  // months, header section
  .flatpickr-current-month {
    @apply font-heading text-dark-blue;
    @apply dark:text-celeste;
  }

  .flatpickr-monthDropdown-months {
    @apply capitalize;
  }
  .flatpickr-next-month,
  .flatpickr-prev-month {
    @apply text-dark-blue;
    @apply dark:text-celeste;

    &:hover {
      @apply text-dark-indigo;
      @apply dark:text-light-indigo;
    }
    & > svg {
      @apply text-current fill-current #{!important};
    }
  }
  .flatpickr-current-month
    .flatpickr-monthDropdown-months
    .flatpickr-monthDropdown-month {
    @apply text-base font-light bg-lighter-white text-dark-blue;
    @apply dark:bg-darker-blue dark:text-celeste;
  }
  .arrowUp,
  .arrowDown {
    @apply bg-dark-gray;
    &:hover {
      @apply bg-dark-gray;
      @apply bg-opacity-70;
    }
  }
  .arrowUp::after,
  .arrowDown::after {
    border-top-color: #edf2fb !important;
    border-bottom-color: #edf2fb !important;
  }
}
</style>
