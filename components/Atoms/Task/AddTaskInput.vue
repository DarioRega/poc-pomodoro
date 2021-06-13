<template>
  <div class="inline-flex flex-col max-w-full">
    <div
      class="
        relative
        border-b
        pb-0.5
        transition-colors
        duration-300
        add-task-container
        border-dark-gray
        text-dark-gray
      "
      :class="[value.length > 0 && 'active', inputError && 'has-error']"
    >
      <input
        v-model.trim="value"
        type="text"
        :name="name"
        :placeholder="placeholder"
        class="
          pr-8
          max-w-full
          text-base text-current
          bg-transparent
          transition-colors
          duration-300
          focus:outline-none
        "
        :class="[inputError && 'has-error', value.length > 0 && 'active']"
        @keydown="handleKeyDown"
      />

      <button
        ref="addTaskIcon"
        :aria-label="placeholder"
        :disabled="isLoading"
        class="add-task-btn w-4 absolute right-0 h-4 focus:outline-none"
        :class="[
          inputError && 'has-error',
          value.length > 0 && 'active',
          isLoading && 'loading',
        ]"
        @click="validateTask"
      >
        <icon v-show="!isLoading" icon-name="plus" class="w-full h-full" />
      </button>
    </div>
    <p v-show="inputError" class="mt-1 text-xs italic text-right text-error">
      {{ inputError }}
    </p>
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'AddTaskInput',
  components: { Icon },
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    errorText: {
      type: String,
      default: '',
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: '',
      error: '',
    }
  },
  computed: {
    inputError() {
      return this.errorText ? this.errorText : this.error
    },
  },
  watch: {
    isLoading(newValue, oldValue) {
      if (!newValue) {
        // reset value once the api call has been done
        this.value = ''
        this.error = ''
      }
    },
  },
  methods: {
    handleKeyDown(evt) {
      if (!this.isLoading) {
        if (evt.keyCode === 13) {
          this.$refs.addTaskIcon.focus()
          this.validateTask()
        }
      }
    },
    validateTask() {
      if (!this.value) {
        return (this.error = this.$t('Field required'))
      } else if (this.value.length < 3) {
        return (this.error = this.$t("Name's too short"))
      }
      this.error = ''
      this.$emit('onAddTask', this.value)
    },
  },
}
</script>
<style lang="scss" scoped>
input::placeholder {
  @apply italic;
}
.active {
  @apply border-dark-blue text-dark-blue;
  @apply dark:border-celeste dark:text-celeste;

  button:focus {
    @apply text-dark-indigo;
    @apply dark:text-light-indigo;
  }
}

button:focus {
  @apply text-dark-indigo;
  @apply dark:text-light-indigo;
}

.has-error {
  @apply text-error border-error placeholder-error #{!important};

  button:focus {
    @apply text-dark-indigo #{!important};
    @apply dark:text-light-indigo #{!important};
  }
}

button.loading {
  &::after {
    @apply w-4 h-4 absolute inset-0 m-auto border-4 border-transparent rounded-[50%] text-current fill-current;

    content: '';
    animation: small-loading-spinner 1s ease infinite;
    border-top-color: #182532;
  }
}
.dark button.loading::after {
  border-top-color: white;
}
</style>
