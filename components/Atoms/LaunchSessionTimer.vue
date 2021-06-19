<template>
  <section
    class="
      fixed
      inset-0
      bg-lighter-white
      dark:bg-darker-blue
      flex flex-col
      items-center
      justify-center
      z-[99]
    "
  >
    <h3 class="text-dark-blue dark:text-celeste pb-6">
      {{ $t('Session will start in') }}
    </h3>
    <h1 class="text-dark-blue dark:text-celeste font-bold">{{ timer }}</h1>
    <div class="flex flex-col justify-center mt-4">
      <brand-button class="mb-4" @click="handleStart">
        {{ $t('Start now') }}
      </brand-button>
      <brand-button type="secondary" @click="handleAbort">
        {{ $t('Abort') }}
      </brand-button>
    </div>
  </section>
</template>

<script>
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'LaunchSessionTimer',
  components: { BrandButton },
  data() {
    return {
      timer: 5,
      hasSentProcess: false,
      interval: null,
    }
  },
  watch: {
    timer(newValue, oldValue) {
      if (newValue === 0) {
        this.handleStart()
      }
    },
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.timer > 0) {
        this.timer = this.timer - 1
      }
    }, 1000)
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    async handleStart() {
      if (!this.hasSentProcess) {
        this.$store.commit('globalState/SET_CREATE_SESSION_LOADER', true)
        this.$store.commit('globalState/SET_LAUNCH_TIMER_VISIBILITY', false)

        await this.$store.dispatch('sessions/createAndStartSession')

        this.$store.commit('globalState/SET_CREATE_SESSION_LOADER', false)
        this.hasSentProcess = true
      }
    },
    handleAbort() {
      this.$store.commit('globalState/SET_LAUNCH_TIMER_VISIBILITY', false)
    },
  },
}
</script>
