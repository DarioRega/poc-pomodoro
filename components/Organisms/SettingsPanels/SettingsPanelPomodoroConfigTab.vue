<template>
  <section class="settings-panel w-full h-full">
    <!--    TIME PER POMODORO -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.pomodoroDuration.title }}</h6>
        <p>{{ labels.pomodoroDuration.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="values.pomodoro_duration"
          :max="60"
          :min="15"
          @change="localValues.pomodoro_duration = $event"
        >
          <p class="settings-panel__sliderInput">
            {{ `${localValues.pomodoro_duration} ${commonLabels.minutes}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!--    TIME PER SMALL BREAK -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.smallBreakDuration.title }}</h6>
        <p>{{ labels.smallBreakDuration.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="values.small_break_duration"
          :max="15"
          :min="1"
          :interval="1"
          @change="localValues.small_break_duration = $event"
        >
          <p class="settings-panel__sliderInput">
            {{ `${localValues.small_break_duration} ${minuteOrMinutes}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!--    TIME PER LONG BREAK -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.bigBreakDuration.title }}</h6>
        <p>{{ labels.bigBreakDuration.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="values.big_break_duration"
          :max="30"
          :min="10"
          :interval="1"
          @change="localValues.big_break_duration = $event"
        >
          <p class="settings-panel__sliderInput">
            {{ `${localValues.big_break_duration} ${commonLabels.minutes}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!--    POMODORO QUANTITY -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.pomodoroQuantity.title }}</h6>
        <p>{{ labels.pomodoroQuantity.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="values.pomodoro_quantity"
          :max="10"
          :min="2"
          :interval="1"
          @change="localValues.pomodoro_quantity = $event"
        >
          <p class="settings-panel__sliderInput">
            {{ `${localValues.pomodoro_quantity} ${commonLabels.pomodoros}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!--  NOISE NOTIFICATION END PROCESS  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.noiseNotificationEndProcess.title }}</h6>
        <p>{{ labels.noiseNotificationEndProcess.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.noise_notification_end_process"
          class="justify-end"
          @toggle="localValues.noise_notification_end_process = $event"
        />
      </div>
    </div>

    <!--  START POMODORO AUTO  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.startPomodoroAuto.title }}</h6>
        <p>{{ labels.startPomodoroAuto.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.start_pomodoro_auto"
          class="justify-end"
          @toggle="localValues.start_pomodoro_auto = $event"
        />
      </div>
    </div>

    <!--  START SMALL BREAK AUTO AUTO  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.startSmallBreakAuto.title }}</h6>
        <p>{{ labels.startSmallBreakAuto.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.start_small_break_auto"
          class="justify-end"
          @toggle="localValues.start_small_break_auto = $event"
        />
      </div>
    </div>

    <!--  START LONG BREAK AUTO AUTO  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ labels.startLongBreakAuto.title }}</h6>
        <p>{{ labels.startLongBreakAuto.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.start_big_break_auto"
          class="justify-end"
          @toggle="localValues.start_big_break_auto = $event"
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
import Toggle from '@/components/Atoms/Inputs/Toggle'
import SettingsPanelSaveOrResetSettings from '@/components/Organisms/SettingsPanels/SettingsPanelSaveOrResetSettings'
import InputSlider from '@/components/Atoms/Inputs/InputSlider'

export default {
  name: 'SettingsPanelPomodoroConfigTab',
  components: {
    Toggle,
    SettingsPanelSaveOrResetSettings,
    InputSlider,
  },
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
  },
  data() {
    return {
      localValues: {
        pomodoro_duration: 0,
        small_break_duration: 0,
        big_break_duration: 0,
        pomodoro_quantity: 0,
        noise_notification_end_process: true,
        start_pomodoro_auto: false,
        start_small_break_auto: false,
        start_big_break_auto: false,
      },
      isLoading: false,
    }
  },
  computed: {
    isDefaultSettingsConfiguration() {
      // TODO verify how to know if it's the default config or user one
      return true
    },
    minuteOrMinutes() {
      return this.localValues.pomodoro_quantity < 2
        ? this.commonLabels.minute
        : this.commonLabels.minutes
    },
  },
  beforeMount() {
    this.localValues = this.values
  },
  methods: {
    handleSave() {
      // TODO verify with Renato how we manage this
    },
    handleResetDefault() {
      // TODO pop confirm
      // reset to default general settings to show only on default configuration not user config
    },
  },
}
</script>
