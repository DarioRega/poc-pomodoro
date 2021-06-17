<template>
  <div id="input-slider" class="flex flex-col">
    <vue-slider
      v-model="localValue"
      :min="min"
      :max="max"
      :interval="interval"
      :silent="true"
      :tooltip="hasTooltip ? 'active' : 'none'"
      @change="$emit('change', $event)"
    />
    <div v-if="hasSlot" class="mt-3 text-right">
      <slot />
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'InputSlider',
  components: {
    VueSlider,
  },
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      required: true,
    },
    hasTooltip: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      localValue: 2,
    }
  },
  computed: {
    hasSlot() {
      return !!this.$slots.default
    },
  },
  watch: {
    value(newValue, oldValue) {
      this.localValue = newValue
    },
  },
  mounted() {
    this.localValue = this.value
  },
}
</script>

<style lang="scss">
#input-slider {
  .vue-slider-rail {
    @apply bg-dark-gray rounded-[18px];
  }

  .vue-slider-process {
    @apply bg-dark-indigo;
    @apply dark:bg-light-indigo;
  }

  .vue-slider-dot {
    @apply w-[17px] h-[17px] #{!important};
  }

  .vue-slider-dot-tooltip-inner {
    @apply border-dark-indigo bg-dark-indigo text-celeste;
    @apply dark:border-light-indigo dark:bg-light-indigo;
  }
}
</style>
