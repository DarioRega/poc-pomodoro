<template>
  <notification-container>
    <div
      v-if="shouldShow"
      class="w-full max-w-md 
      rounded-lg ring-1 ring-opacity-5 shadow-lg 
      pointer-events-auto bg-light-white 
      dark:bg-dark-blue ring-lighter-white dark:ring-darker-blue"
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
            <icon :icon-name="type" class="w-10 h-10" />
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
              @onConfirm="$emit('onConfirm')"
              @onCancel="$emit('onClose')"
            >
              {{ actionText }}
            </notification-action>
          </div>
        </div>

        <div
          v-if="allowClose"
          class="flex absolute top-0 right-0 bottom-0 items-center mr-6"
        >
          <button class="btn-close" @click="$emit('onClose')">
            <span class="sr-only">Close</span>
            <icon icon-name="close" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </notification-container>
</template>
<script>
import NotificationContainer from './NotificationContainer'
import NotificationAction from './NotificationAction'
import Icon from '../Icon'
export default {
  name: 'Notification',
  components: { NotificationContainer, NotificationAction, Icon },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
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
      default: 'Confirm',
    },
    lifeTime: {
      type: Number,
      default: 6,
    },
  },
  computed: {
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
    autoCloseNotification() {
      setTimeout(() => {
        this.$emit('onClose')
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
