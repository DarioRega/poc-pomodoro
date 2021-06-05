<template>
  <section class="settings-panel w-full h-full">
    <!--    LANGUAGE -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Display language') }}</h6>
        <p>{{ $t('Set the language displayed in the application') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="values.displayLanguage"
          :options="options.displayLanguages"
          name="display-language"
          @change="$emit('onDisplayLanguageChange', $event)"
        />
      </div>
    </div>

    <!--  TIMEZONE  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Time zone') }}</h6>
        <p>{{ $t('Select your current time zone') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="values.timezone"
          :options="options.timezones"
          name="timezone"
          @change="$emit('onTimezoneChange', $event)"
        />
      </div>
    </div>

    <!--  TIME DISPLAY FORMAT  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Time display format') }}</h6>
        <p>{{ $t('Choose which format you would like to see the time') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="values.timeDisplayFormat"
          :options="options.timeDisplayFormats"
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
          :value="values.theme"
          :options="options.themes"
          name="theme"
          @change="$emit('onThemeChange', $event)"
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
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localValues: {},
    }
  },
  mounted() {
    this.localValues = this.values
  },
}
</script>
