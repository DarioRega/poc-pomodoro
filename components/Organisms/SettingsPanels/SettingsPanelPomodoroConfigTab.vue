<template>
  <section class="settings-panel w-full h-full">
    <div class="settings-panel__container">
      <brand-input
        class="max-w-xs"
        name="pomodoro setting choice"
        :is-disabled="isDefaultConfiguration"
        :label="$t('Configuration name')"
        :placeholder="$t('Enter your configuration name')"
        :value="values.name"
        error-text=""
        @change.native="handleEmitValue($event.target.value, 'name')"
      />
      <div class="settings-panel__button-create">
        <brand-button
          type="naked"
          class="w-full"
          @click="$emit('onCreateCustomSettings')"
        >
          {{ $t('Create new') }}
        </brand-button>
      </div>
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
          @change="handleEmitValue($event, 'pomodoro_duration')"
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
          @change="handleEmitValue($event, 'small_break_duration')"
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
          @change="handleEmitValue($event, 'big_break_duration')"
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
          @change="handleEmitValue($event, 'pomodoro_quantity')"
        >
          <p class="settings-panel__sliderInput">
            {{ `${values.pomodoro_quantity} ${$t('pomodoros')}` }}
          </p>
        </input-slider>
      </div>
    </div>

    <!-- TODO REMOVE BEFORE GIVING TO TEACHER, CODE FOR v2  -->
    <!--  NOISE NOTIFICATION END PROCESS  -->
    <!--    <div class="settings-panel__container">-->
    <!--      <div class="settings-panel__labels">-->
    <!--        <h6>{{ $t('Noise notification notice') }}</h6>-->
    <!--        <p>-->
    <!--          {{-->
    <!--            $t('Play a sound when a pomodoro, small break or long break ends')-->
    <!--          }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <div class="settings-panel__configurations">-->
    <!--        <toggle-->
    <!--          :toggled="values.noise_notification_end_process"-->
    <!--          class="justify-end"-->
    <!--          @toggle="-->
    <!--            $emit('onPomodoroConfigTabValueChange', $event, 'pomodoro_duration')-->
    <!--          "-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

    <!--  START POMODORO AUTO  -->
    <!--    <div class="settings-panel__container">-->
    <!--      <div class="settings-panel__labels">-->
    <!--        <h6>{{ $t('Automatically start a pomodoro') }}</h6>-->
    <!--        <p>-->
    <!--          {{-->
    <!--            $t(-->
    <!--              'Skip the pending validation on pomodoro and start them automatically after your break ends'-->
    <!--            )-->
    <!--          }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <div class="settings-panel__configurations">-->
    <!--        <toggle-->
    <!--          :toggled="values.start_pomodoro_auto"-->
    <!--          class="justify-end"-->
    <!--          @toggle="-->
    <!--            handleEmitValue($event, 'pomodoro_duration')-->
    <!--          "-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

    <!--  START SMALL BREAK AUTO AUTO  -->
    <!--    <div class="settings-panel__container">-->
    <!--      <div class="settings-panel__labels">-->
    <!--        <h6>{{ $t('Automatically start small break') }}</h6>-->
    <!--        <p>-->
    <!--          {{-->
    <!--            $t(-->
    <!--              'Skip the pending validation on small break and start them automatically after your pomodoro ends'-->
    <!--            )-->
    <!--          }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <div class="settings-panel__configurations">-->
    <!--        <toggle-->
    <!--          :toggled="values.start_small_break_auto"-->
    <!--          class="justify-end"-->
    <!--          @toggle="-->
    <!--           handleEmitValue($event, 'pomodoro_duration')-->
    <!--          "-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->

    <!--  START LONG BREAK AUTO AUTO  -->
    <!--    <div class="settings-panel__container">-->
    <!--      <div class="settings-panel__labels">-->
    <!--        <h6>{{ $t('Automatically start long break') }}</h6>-->
    <!--        <p>-->
    <!--          {{-->
    <!--            $t(-->
    <!--              'Skip the pending validation on long breaks and start them automatically after your pomodoro ends'-->
    <!--            )-->
    <!--          }}-->
    <!--        </p>-->
    <!--      </div>-->
    <!--      <div class="settings-panel__configurations">-->
    <!--        <toggle-->
    <!--          :toggled="values.start_big_break_auto"-->
    <!--          class="justify-end"-->
    <!--          @toggle="-->
    <!--           handleEmitValue($event, 'pomodoro_duration')-->
    <!--          "-->
    <!--        />-->
    <!--      </div>-->
    <!--    </div>-->
  </section>
</template>

<script>
import InputSlider from '@/components/Atoms/Inputs/InputSlider'
import BrandInput from '@/components/Atoms/Inputs/BrandInput'
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'SettingsPanelPomodoroConfigTab',
  components: {
    InputSlider,
    BrandInput,
    BrandButton,
  },
  props: {
    values: {
      type: Object,
      required: true,
    },
    isDefaultConfiguration: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleEmitValue(value, property) {
      this.$emit('onPomodoroConfigTabValueChange', value, property)
    },
  },
}
</script>
