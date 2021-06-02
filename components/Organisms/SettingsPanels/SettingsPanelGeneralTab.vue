<template>
  <section class="settings-panel w-full h-full">
    <!--    LANGUAGE -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.language.title }}</h6>
        <p>{{ labels.language.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="values.displayLanguage"
          :options="options.displayLanguages"
          name="display-language"
          :error-text="errors.displayLanguage"
          @change="localValues.displayLanguage = $event"
        />
      </div>
    </div>

    <!--  TIMEZONE  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.timezone.title }}</h6>
        <p>{{ labels.timezone.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="values.timezone"
          :options="options.timezones"
          name="timezone"
          :error-text="errors.timezone"
          @change="localValues.timezone = $event"
        />
      </div>
    </div>

    <!--  TIME DISPLAY FORMAT  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.timeDisplayFormat.title }}</h6>
        <p>{{ labels.timeDisplayFormat.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="values.timeDisplayFormat"
          :options="options.timeDisplayFormats"
          name="time-display-format"
          :error-text="errors.timeDisplayFormat"
          @change="localValues.timeDisplayFormat = $event"
        />
      </div>
    </div>

    <!--  THEME  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.theme.title }}</h6>
        <p>{{ labels.theme.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-select
          :value="values.theme"
          :options="options.themes"
          name="theme"
          :error-text="errors.theme"
          @change="localValues.theme = $event"
        />
      </div>
    </div>

    <!--  BUG REPORTS  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.bugReports.title }}</h6>
        <p>{{ labels.bugReports.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.bugReports"
          class="justify-end"
          @toggle="localValues.bugReports = $event"
        />
      </div>
    </div>

    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.analytics.title }}</h6>
        <p>{{ labels.analytics.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.analytics"
          class="justify-end"
          @toggle="localValues.analytics = $event"
        />
      </div>
    </div>
    <settings-panel-save-or-reset-settings
      :has-reset="isDefaultSettingsConfiguration"
      :is-loading="isLoading"
      :save-changes-label="commonLabels.saveChanges"
      :reset-default-label="commonLabels.resetDefault"
      @onSave="handleSave"
      @onResetDefault="handleResetDefault"
    />
  </section>
</template>

<script>
import BrandSelect from '@/components/Atoms/Inputs/BrandSelect'
import Toggle from '@/components/Atoms/Inputs/Toggle'
import SettingsPanelSaveOrResetSettings from '@/components/Organisms/SettingsPanels/SettingsPanelSaveOrResetSettings'

export default {
  name: 'SettingsPanelGeneralTab',
  components: { BrandSelect, Toggle, SettingsPanelSaveOrResetSettings },
  props: {
    labels: {
      type: Object,
      required: true,
    },
    commonLabels: {
      type: Object,
      required: true,
    },
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
      isLoading: false,
      errors: {
        displayLanguage: '',
        timezone: '',
        timeDisplayFormat: '',
        theme: '',
      },
    }
  },
  computed: {
    isDefaultSettingsConfiguration() {
      // TODO verify how to know if it's the default config or user one
      return true
    },
  },
  beforeMount() {
    this.localValues = this.values
  },
  methods: {
    handleSave() {
      // TODO handle verify with renato how we manage update
    },
    handleResetDefault() {
      // TODO pop confirm
      // reset to default general settings to show only on default configuration not user config
    },
  },
}
</script>
