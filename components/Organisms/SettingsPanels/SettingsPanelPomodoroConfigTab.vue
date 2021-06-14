<template>
  <section class="settings-panel w-full h-full">
    <div class="settings-panel__container">
      <brand-input
        class="max-w-xs"
        :label="$t('Configuration name')"
        name="pomodoro setting choice"
        :placeholder="$t('Enter your configuration name')"
        :value="configurationName"
        error-text=""
        @change.native="configurationName = $event.target.value"
      />
    </div>
    <!--    TIME PER POMODORO -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Time per pomodoro') }}</h6>
        <p>{{ $t('Manage how long a pomodoro should last') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="values.pomodoro_duration"
          :max="60"
          :min="15"
          @change="$emit('onPomodoroDurationChange', $event)"
        >
          <p class="settings-panel__sliderInput">
            {{ `${values.pomodoro_duration} ${$t('minutes')}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!--    TIME PER SMALL BREAK -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Time per small break') }}</h6>
        <p>{{ $t('Manage how long a small break should last') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="values.small_break_duration"
          :max="15"
          :min="1"
          :interval="1"
          @change="$emit('onSmallBreakDurationChange', $event)"
        >
          <p class="settings-panel__sliderInput">
            {{ `${values.small_break_duration} ${minuteOrMinutes}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!--    TIME PER LONG BREAK -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Time per big break') }}</h6>
        <p>{{ $t('Manage how long a big break should last') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="values.big_break_duration"
          :max="30"
          :min="10"
          :interval="1"
          @change="$emit('onBigBreakDurationChange', $event)"
        >
          <p class="settings-panel__sliderInput">
            {{ `${values.big_break_duration} ${$t('minute')}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!--    POMODORO QUANTITY -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Pomodoro per session') }}</h6>
        <p>{{ $t('How many pomodoro you whis to do per session') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="values.pomodoro_quantity"
          :max="10"
          :min="2"
          :interval="1"
          @change="$emit('onPomodoroQuantityChange', $event)"
        >
          <p class="settings-panel__sliderInput">
            {{ `${values.pomodoro_quantity} ${$t('pomodoros')}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!--  NOISE NOTIFICATION END PROCESS  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Noise notification notice') }}</h6>
        <p>
          {{
            $t('Play a sound when a pomodoro, small break or long break ends')
          }}
        </p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.noise_notification_end_process"
          class="justify-end"
          @toggle="$emit('onNoiseNotificationChange', $event)"
        />
      </div>
    </div>

    <!--  START POMODORO AUTO  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Automatically start a pomodoro') }}</h6>
        <p>
          {{
            $t(
              'Skip the pending validation on pomodoro and start them automatically after your break ends'
            )
          }}
        </p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.start_pomodoro_auto"
          class="justify-end"
          @toggle="$emit('onStartPomodoroAutoChange', $event)"
        />
      </div>
    </div>

    <!--  START SMALL BREAK AUTO AUTO  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Automatically start small break') }}</h6>
        <p>
          {{
            $t(
              'Skip the pending validation on small break and start them automatically after your pomodoro ends'
            )
          }}
        </p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.start_small_break_auto"
          class="justify-end"
          @toggle="$emit('onStartSmallBreakAutoChange', $event)"
        />
      </div>
    </div>

    <!--  START LONG BREAK AUTO AUTO  -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Automatically start long break') }}</h6>
        <p>
          {{
            $t(
              'Skip the pending validation on long breaks and start them automatically after your pomodoro ends'
            )
          }}
        </p>
      </div>
      <div class="settings-panel__configurations">
        <toggle
          :toggled="values.start_big_break_auto"
          class="justify-end"
          @toggle="$emit('onStartBigBreakAutoChange', $event)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Toggle from '@/components/Atoms/Inputs/Toggle'
import InputSlider from '@/components/Atoms/Inputs/InputSlider'
import BrandInput from '@/components/Atoms/Inputs/BrandInput'

export default {
  name: 'SettingsPanelPomodoroConfigTab',
  components: {
    Toggle,
    InputSlider,
    BrandInput,
  },
  props: {
    values: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      configurationName: '',
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
    }
  },
  computed: {
    minuteOrMinutes() {
      return this.localValues.pomodoro_quantity < 2
        ? this.$t('minute')
        : this.$t('minutes')
    },
  },
  mounted() {
    this.localValues = this.values
  },
}
</script>
