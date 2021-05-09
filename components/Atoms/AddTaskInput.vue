<template>
  <div class="inline-flex flex-col max-w-full">
    <div
      class="relative pb-1 border-b transition-colors duration-300 add-task-container border-dark-gray text-dark-gray"
      :class="[value.length > 0 && 'active', errorText && 'has-error']"
    >
      <input
        v-model="value"
        type="text"
        :name="name"
        :placeholder="placeholder"
        class="pr-8 max-w-full text-base text-current bg-transparent transition-colors duration-300 focus:outline-none"
        :class="[errorText && 'has-error', value.length > 0 && 'active']"
        @keydown="handleKeyDown"
        @click="$emit('click')"
      />

      <button
        ref="addTaskIcon"
        :aria-label="placeholder"
        class="absolute right-0 focus:outline-none"
        :class="[errorText && 'has-error', value.length > 0 && 'active']"
        @click="$emit('onAddTask', value)"
      >
        <icon icon-name="plus" class="w-5 h-5" />
      </button>
    </div>
    <p v-show="errorText" class="mt-1 text-xs italic text-right text-error">
      {{ errorText }}
    </p>
  </div>
</template>

<script>
import Icon from './Icon'

export default {
  name: 'AddTaskInput',
  components: { Icon },
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    errorText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    handleKeyDown(evt) {
      if (evt.keyCode === 13) {
        this.$refs.addTaskIcon.focus()
        this.$emit('onAddTask', this.value)
      }
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
</style>
