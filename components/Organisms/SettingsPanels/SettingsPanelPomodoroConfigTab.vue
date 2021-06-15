<template>
  <section class="settings-panel w-full h-full">
    <!--    TIME PER POMODORO -->
    <div class="settings-panel__container">
      <div class="settings-panel__labels">
        <h6>{{ $t('Time per pomodoro') }}</h6>
        <p>{{ $t('Manage how long a pomodoro should last') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <input-slider
          :value="valuesWithDurationsInNumber.pomodoro_duration"
          :max="60"
          :min="15"
          @change="handleEmitValue($event, 'pomodoro_duration')"
        >
          <p class="settings-panel__sliderInput">
            {{
              `${valuesWithDurationsInNumber.pomodoro_duration} ${$t(
                'minutes'
              )}`
            }}
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
          :value="valuesWithDurationsInNumber.small_break_duration"
          :max="15"
          :min="1"
          :interval="1"
          @change="handleEmitValue($event, 'small_break_duration')"
        >
          <p class="settings-panel__sliderInput">
            {{
              `${valuesWithDurationsInNumber.small_break_duration} ${minuteOrMinutes}`
            }}
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
          :value="valuesWithDurationsInNumber.big_break_duration"
          :max="30"
          :min="10"
          :interval="1"
          @change="handleEmitValue($event, 'big_break_duration')"
        >
          <p class="settings-panel__sliderInput">
            {{
              `${valuesWithDurationsInNumber.big_break_duration} ${$t(
                'minute'
              )}`
            }}
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
          :value="valuesWithDurationsInNumber.pomodoro_quantity"
          :max="10"
          :min="2"
          :interval="1"
          @change="handleEmitValue($event, 'pomodoro_quantity')"
        >
          <p class="settings-panel__sliderInput">
            {{
              `${valuesWithDurationsInNumber.pomodoro_quantity} ${$t(
                'pomodoros'
              )}`
            }}
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
    <!--          :toggled="valuesWithDurationsInNumber.noise_notification_end_process"-->
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
    <!--          :toggled="valuesWithDurationsInNumber.start_pomodoro_auto"-->
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
    <!--          :toggled="valuesWithDurationsInNumber.start_small_break_auto"-->
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
    <!--          :toggled="valuesWithDurationsInNumber.start_big_break_auto"-->
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
import _ from 'lodash'

import InputSlider from '@/components/Atoms/Inputs/InputSlider'
import BrandInput from '@/components/Atoms/Inputs/BrandInput'
import BrandButton from '@/components/Atoms/BrandButton'
import {
  convertNumberInDuration,
  getTimeValuesInNumber,
} from '@/helpers/settings'

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
    }
  },
  computed: {
    valuesWithDurationsInNumber() {
      const valuesConverted = _.cloneDeep(this.values)
      Object.keys(valuesConverted).forEach((x) => {
        if (x.includes('duration')) {
          valuesConverted[x] = getTimeValuesInNumber(valuesConverted[x])
        }
      })
      return valuesConverted
    },
    minuteOrMinutes() {
      return this.localValues.pomodoro_quantity < 2
        ? this.$t('minute')
        : this.$t('minutes')
    },
  },
  methods: {
    handleEmitValue(newValue, property) {
      console.log('VALUE NEW', newValue)
      let value = newValue
      if (property.includes('duration')) {
        value = convertNumberInDuration(newValue)
      }
      console.log('VALUE FORMATED => ', value)
      this.$emit('onPomodoroConfigTabValueChange', value, property)
    },
  },
}
</script>
