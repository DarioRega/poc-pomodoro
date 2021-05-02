<template>
  <notification-container>
    <div
      v-if="shouldShow"
      class="max-w-md w-full bg-light-white dark:bg-dark-blue shadow-lg rounded-lg pointer-events-auto ring-1 ring-lighter-white dark:ring-darker-blue ring-opacity-5"
    >
      <div class="p-4 relative flex items-start">
        <div
          class="flex w-full"
          :class="[
            description ? 'items-start' : 'items-center',
            allowClose && 'pr-6',
          ]"
        >
          <div
            class="flex-shrink-0 inline-flex mr-5 mx-auto text-center"
            :class="textType"
          >
            <icon :icon-name="type" class="w-10 h-10" />
          </div>

          <div class="flex-1">
            <h6
              class="text-dark-blue dark:text-celeste tracking-wide"
              :class="!description && 'mb-0'"
            >
              {{ title }}
            </h6>
            <p
              v-show="description"
              class="mt-1 text-sm text-dark-gray"
            >
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
          class="absolute right-0 bottom-0 top-0 flex items-center mr-6"
        >
          <button class="btn-close" @click="$emit('onClose')">
            <span class="sr-only">Close</span>
            <icon icon-name="close" class="w-4 h-4">
            </icon>
            </icon>
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
  @apply text-dark-blue dark:text-celeste rounded-md inline-flex text-current;
  &:hover {
    @apply text-dark-gray;
  }
  &:focus {
    @apply outline-none;
  }
}
</style>
