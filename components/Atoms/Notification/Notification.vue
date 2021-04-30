<template>
  <notification-container>
    <div
      v-if="shouldShow"
      class="max-w-sm w-full bg-light-white dark:bg-dark-blue shadow-lg rounded-lg pointer-events-auto ring-1 ring-lighter-white dark:ring-darker-blue ring-opacity-5"
    >
      <div class="p-4">
        <div class="flex" :class="description ? 'items-start' : 'items-center'">
          <div class="flex-shrink-0">
            ICON HERE
          </div>

          <div class="ml-5 w-0 flex-1">
            <h6
              class="text-dark-blue dark:text-light-celeste tracking-wide"
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

        <div v-if="allowClose" class="ml-4 flex-shrink-0 flex">
          <button
            class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="$emit('onClose')"
          >
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
export default {
  name: 'Notification',
  components: { NotificationContainer },
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
      default: 'info',
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
      default: 'Ok',
    },
    lifeTime: {
      type: Number,
      default: 6,
    },
  },
  computed: {
    defaultTitle() {
      switch (this.type) {
        case 'success':
          return 'All good!'
        case 'error':
          return 'Oops, something went wrong'
        case 'info':
          return 'Just to know!'
        default:
          return 'Just to know!'
      }
    },
  },
}
</script>
