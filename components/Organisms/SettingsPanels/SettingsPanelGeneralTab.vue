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
          :options="[]"
          name="time-display-format"
          @change="$emit('onTimeDisplayFormatChange', $event)"
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
          :options="options.themes"
          :should-capitalize="true"
          name="theme"
          @change="$emit('onThemeChange', $event)"
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
          :options="options.settingChoices"
          name="settings choice"
          @change="$emit('onSettingChoiceChange', $event)"
        />
      </div>
    </div>

    <!--  BUG REPORTS  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Bug reports') }}</h6>
        <p>
          {{
            $t(
              'Automatically send anonymous reports to help us improve our products'
            )
          }}
        </p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.bugReports"
          class="justify-end"
          @toggle="$emit('onBugReportsChange', $event)"
        />
      </div>
    </div>

    <!--  ANALYTICS  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Analytics') }}</h6>
        <p>
          {{
            $t(
              'Enable anonymous analytics to help us improve user experience. This includes clicks, tabs visits, view mode selected, language used and sessions settings'
            )
          }}
        </p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.analytics"
          class="justify-end"
          @toggle="$emit('onAnalyticsChange', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import BrandSelect from '@/components/Atoms/Inputs/BrandSelect'
import Toggle from '@/components/Atoms/Inputs/Toggle'

export default {
  name: 'SettingsPanelGeneralTab',
  components: { BrandSelect, Toggle },
  props: {
    values: {
      type: Object,
      required: true,
    },
    selectedPomodoroConfiguration: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
  computed: {
    themeValue() {
      const { theme } = this.values
      return { id: theme, name: theme.toLowerCase() }
    },
    timeDisplayFormatValue() {
      const { time_display_format } = this.values
      return { id: time_display_format, name: time_display_format }
    },
  },
}
</script>
