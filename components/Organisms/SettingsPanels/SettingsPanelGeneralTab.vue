<template>
  <section class="settings-panel w-full h-full">
    <!--  TIME DISPLAY FORMAT  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Time display format') }}</h6>
        <p>{{ $t('Choose which format you would like to see the time') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="timeDisplayFormatValue"
          :options="timeDisplayFormatOptions"
          name="time-display-format"
          @change="
            $emit('onGeneralTabValueChange', $event, 'time_display_format')
          "
        />
      </div>
    </div>

    <!--  THEME  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Theme') }}</h6>
        <p>{{ $t('Select the application theme') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="themeValue"
          :options="themeOptions"
          :should-capitalize="true"
          name="theme"
          @change="$emit('onGeneralTabValueChange', $event, 'theme')"
        />
      </div>
    </div>

    <!--    SETTINGS CHOICES -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Pomodoro settings') }}</h6>
        <p>
          {{
            $t(
              'Select the pomodoro configuration you wish to run the sessions with'
            )
          }}
        </p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="selectedPomodoroConfiguration"
          :options="pomodoroSettingsOptions"
          name="settings choice"
          @change="
            $emit(
              'onGeneralTabValueChange',
              $event,
              'pomodoro_session_setting_id'
            )
          "
        />
      </div>
    </div>

    <!--    LANGUAGE v2 -->
    <!--    <div class="settings-panel__container">-->
    <!--      <div class="settings-panel__labels">-->
    <!--        <h6>{{ $t('Display language') }}</h6>-->
    <!--        <p>{{ $t('Set the language displayed in the application') }}</p>-->
    <!--      </div>-->
    <!--      <div class="settings-panel__configurations">-->
    <!--        <brand-select-->
    <!--          :value="values.displayLanguage"-->
    <!--          :options="options.displayLanguages"-->
    <!--          name="display-language"-->
    <!--          @change="$emit('onGeneralTabValueChange', $event, 'language')"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

    <!--  TIMEZONE  v2 -->
    <!--    <div class="settings-panel__container">-->
    <!--      <div class="settings-panel__labels">-->
    <!--        <h6>{{ $t('Time zone') }}</h6>-->
    <!--        <p>{{ $t('Select your current time zone') }}</p>-->
    <!--      </div>-->
    <!--      <div class="settings-panel__configurations">-->
    <!--        <brand-select-->
    <!--          :value="values.timezone"-->
    <!--          :options="options.timezones"-->
    <!--          name="timezone"-->
    <!--          @change="$emit('onGeneralTabValueChange', $event, 'timezone')"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

    <!--  BUG REPORTS v2  -->
    <!--    <div class="settings-panel__container">-->
    <!--      <div class="settings-panel__labels">-->
    <!--        <h6>{{ $t('Bug reports') }}</h6>-->
    <!--        <p>-->
    <!--          {{-->
    <!--            $t(-->
    <!--              'Automatically send anonymous reports to help us improve our products'-->
    <!--            )-->
    <!--          }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <div class="settings-panel__configurations">-->
    <!--        <toggle-->
    <!--          :toggled="values.bugReports"-->
    <!--          class="justify-end"-->
    <!--          @toggle="$emit('onGeneralTabValueChange', $event, 'bug_reports')"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

    <!--  ANALYTICS v2  -->
    <!--    <div class="settings-panel__container">-->
    <!--      <div class="settings-panel__labels">-->
    <!--        <h6>{{ $t('Analytics') }}</h6>-->
    <!--        <p>-->
    <!--          {{-->
    <!--            $t(-->
    <!--              'Enable anonymous analytics to help us improve user experience. This includes clicks, tabs visits, view mode selected, language used and sessions settings'-->
    <!--            )-->
    <!--          }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <div class="settings-panel__configurations">-->
    <!--        <toggle-->
    <!--          :toggled="values.analytics"-->
    <!--          class="justify-end"-->
    <!--          @toggle="$emit('onGeneralTabValueChange', $event, 'analytics')"-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->
  </section>
</template>

<script>
import BrandSelect from '@/components/Atoms/Inputs/BrandSelect'
import {
  DEFAULT_POMODORO_SETTINGS_OPTION,
  THEME_OPTIONS,
  TIME_DISPLAY_FORMATS_OPTIONS,
} from '@/constantes/settings'

export default {
  name: 'SettingsPanelGeneralTab',
  components: { BrandSelect },
  props: {
    values: {
      type: Object,
      required: true,
    },
    selectedPomodoroConfiguration: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /*
      Values
     */
    themeValue() {
      const { theme } = this.values
      return { id: theme, name: theme.toLowerCase() }
    },
    timeDisplayFormatValue() {
      const { time_display_format } = this.values
      return { id: time_display_format, name: time_display_format }
    },

    /*
      Options
     */
    pomodoroSettingsOptions() {
      return [
        DEFAULT_POMODORO_SETTINGS_OPTION(this.$i18n),
        ...this.$store.getters['user/getUserAllPomodoroSettingsValues'],
      ]
    },
    themeOptions() {
      return THEME_OPTIONS
    },
    timeDisplayFormatOptions() {
      return TIME_DISPLAY_FORMATS_OPTIONS
    },
  },
}
</script>
