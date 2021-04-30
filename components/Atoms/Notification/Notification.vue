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
            class="flex-shrink-0 flex-none w-14 mx-auto text-center"
            :class="textType"
          >
            {{ type }}
          </div>

          <div class="ml-5 w-0 flex-1">
            <h6
              class="text-dark-blue dark:text-celeste tracking-wide"
              :class="!description && 'mb-0'"
            >
              {{ title }}
            </h6>
            <p
              v-show="description"
              class="mt-1 text-sm text-dark-gray dark:text-dark-gray"
            >
              {{ description }}
            </p>

            <notification-action
              v-if="actionRequired"
              @onConfirm="$emit('onConfirm')"
              @onCancel="$emit('onCancel')"
            >
              {{ actionText }}
            </notification-action>
          </div>
        </div>

        <div
          v-if="allowClose"
          class="absolute right-0 bottom-0 top-0 flex items-center mr-6"
        >
          <button class="btn-close" @click="$emit('onCancel')">
            <span class="sr-only">Close</span>
            x
          </button>
        </div>
      </div>
    </div>
  </notification-container>
</template>
<script>
import NotificationContainer from './NotificationContainer'
import NotificationAction from './NotificationAction'
export default {
  name: 'Notification',
  components: { NotificationContainer, NotificationAction },
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
      default: true,
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
}
</script>
<style lang="scss" scoped>
.btn-close {
  @apply text-dark-blue dark:text-celeste rounded-md inline-flex text-current;
  &:hover {
    @apply text-darker-blue dark:text-dark-gray;
  }
  &:focus {
    @apply outline-none;
  }
}
</style>
