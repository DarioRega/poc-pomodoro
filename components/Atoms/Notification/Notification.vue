<template>
  <div
    v-if="shouldShow"
    class="
      w-full
      rounded-lg
      ring-1 ring-opacity-5
      shadow-lg
      pointer-events-auto
      bg-light-white
      dark:bg-dark-blue
      ring-lighter-white
      dark:ring-darker-blue
    "
  >
    <div class="flex relative items-start p-4">
      <div
        class="flex w-full"
        :class="[
          description ? 'items-start' : 'items-center',
          allowClose && 'pr-6',
        ]"
      >
        <div
          class="inline-flex flex-shrink-0 mx-auto mr-5 text-center"
          :class="textType"
        >
          <icon :icon-name="type" class="w-6 h-6" />
        </div>

        <div class="flex-1">
          <h6
            class="tracking-wide text-dark-blue dark:text-celeste"
            :class="!description && 'mb-0'"
          >
            {{ title }}
          </h6>
          <p v-show="description" class="mt-1 text-sm text-dark-gray">
            {{ description }}
          </p>

          <notification-action
            v-if="actionRequired"
            @onConfirm="handleConfirm"
            @onCancel="handleClose"
          >
            {{ defaultActionText }}
          </notification-action>
        </div>
      </div>

      <div
        v-if="allowClose"
        class="flex absolute top-0 right-0 bottom-0 items-center mr-6"
      >
        <button class="btn-close" @click="handleClose">
          <span class="sr-only">Close</span>
          <icon icon-name="close" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Icon from '../Icon'
import NotificationAction from './NotificationAction'

export default {
  name: 'Notification',
  components: { NotificationAction, Icon },
  props: {
    notificationId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    selfCloseDispatch: {
      type: Function,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    shouldShow: {
      type: Boolean,
      default: false,
    },
    allowClose: {
      type: Boolean,
      default: false,
    },
    actionRequired: {
      type: Boolean,
      default: false,
    },
    actionText: {
      type: String,
      default: '',
    },
    lifeTime: {
      type: Number,
      default: 6,
    },
  },
  computed: {
    defaultActionText() {
      return this.actionText ? this.actionText : this.$t('Confirm')
    },
    textType() {
      return {
        'text-success': this.type === 'success',
        'text-error': this.type === 'error',
        'text-dark-indigo dark:text-light-indigo': this.type === 'info',
      }
    },
  },
  mounted() {
    if (!this.actionRequired) {
      this.autoCloseNotification()
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('onConfirm')
      this.selfCloseDispatch()
    },
    handleClose() {
      this.selfCloseDispatch()
      this.$emit('onClose')
    },
    autoCloseNotification() {
      setTimeout(() => {
        this.selfCloseDispatch()
      }, this.lifeTime * 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
.btn-close {
  @apply inline-flex text-current rounded-md text-dark-blue dark:text-celeste;
  &:hover {
    @apply text-dark-gray;
  }

  &:focus {
    @apply outline-none;
  }
}
</style>
