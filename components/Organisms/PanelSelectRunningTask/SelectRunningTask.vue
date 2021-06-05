<template>
  <div
    class="brand-input relative"
    :class="[`brand-input__select-container--size-${size}`]"
  >
    <div class="flex flex-col-reverse">
      <div class="relative">
        <div
          ref="triggerDropdown"
          class="
            relative
            w-full
            text-left
            cursor-pointer
            brand-input__select
            focus:outline-none
          "
          aria-haspopup="listbox"
          :aria-expanded="isOpen"
          :class="[`brand-input__select--${type}`]"
          aria-labelledby="listbox-label"
        >
          <input
            v-model="inputValue"
            class="
              block
              text-current
              truncate
              w-full
              h-full
              py-2
              px-2
              rounded-md
              bg-transparent
              transition-colors
              duration-300
              focus:outline-none
            "
            :placeholder="placeholder"
            @click="toggleVisibility"
            @keydown="toggleVisibility"
          />
          <span
            class="
              flex
              absolute
              inset-y-0
              right-0
              items-center
              transition-colors
              duration-300
              pointer-events-none
              select-toggle
              text-dark-gray
              pr-3
            "
          >
            <icon
              icon-name="select"
              class="w-5 text-current"
              aria-hidden="false"
            ></icon>
          </span>
        </div>

        <transition
          enter-active-class=""
          enter-class=""
          enter-to-class=""
          leave-active-class="transition duration-100 ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ul
            v-show="isOpen"
            class="
              overflow-auto
              absolute
              z-10
              mt-2
              w-full
              max-h-60
              rounded-md
              shadow-lg
              list-options
              focus:outline-none
            "
            tabindex="-1"
            role="listbox"
            :aria-expanded="isOpen"
            aria-labelledby="listbox-label"
          >
            <li
              v-if="selectOptions.length < 1 && !localSelectValue.id"
              class="
                relative
                py-2
                px-3
                cursor-default
                select-none
                single-option
                text-dark-gray
                bg-light-white
                dark:bg-dark-blue
              "
            >
              <p
                v-if="hasNoTasksYet"
                class="block font-semibold truncate option-name mb-0"
              >
                {{ $t('No tasks created yet') }}
              </p>
              <p v-else class="block font-semibold truncate option-name mb-0">
                {{ $t('No results founds for') }}: <em>{{ inputValue }}</em>
              </p>
            </li>
            <li
              v-for="(item, index) in selectOptions"
              :id="`listbox-option-${item.id}`"
              :ref="`listbox-option-${item.id}`"
              :key="item.id"
              tabindex="0"
              class="
                relative
                py-2
                cursor-default
                select-none
                single-option
                text-dark-gray
                px-3
                text-left
              "
              :class="[
                isHighlighted(item.id) && 'highlighted',
                index % 2 === 0
                  ? 'bg-light-white dark:bg-darker-blue'
                  : 'bg-lighter-white dark:bg-dark-blue',
              ]"
              role="option"
              @focusin="currentFocusedElementId = item.id"
              @keydown="handleListKeyDown($event, item)"
              @mouseenter="highlightedItemId = item.id"
              @mouseleave="highlightedItemId = ''"
              @click="selectOption(item)"
            >
              <select-dropdown-option
                :is-highlighted="isHighlighted(item.id)"
                :is-selected="localSelectValue.id === item.id"
                :should-show-selected="true"
                :name="formatOptionText(item)"
              />
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import SelectDropdownOption from '@/components/Atoms/Inputs/SelectDropdownOption'
import Icon from '@/components/Atoms/Icon'
import {
  DOWN_ARROW_KEY_CODE,
  ENTER_KEY_CODE,
  ESCAPE_KEY_CODE,
  SPACEBAR_KEY_CODE,
  UP_ARROW_KEY_CODE,
} from '~/constantes'

export default {
  name: 'SelectRunningTask',
  components: { SelectDropdownOption, Icon },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: 'primary',
    },
    size: {
      type: String,
      default: 'default',
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      hasNoTasksYet: false,
      highlightedItemId: '',
      currentFocusedElementId: 0,
      isOpen: false,
      inputValue: '',
      localSelectValue: {
        id: null,
      },
    }
  },
  computed: {
    selectOptions() {
      if (this.inputValue && !this.localSelectValue.id) {
        return this.filteredOptions
      }
      return this.options
    },
    filteredOptions() {
      if (this.options.length < 1) {
        return this.options
      } else {
        return this.options.filter((x) =>
          x.name.toLowerCase().includes(this.inputValue.toLowerCase())
        )
      }
    },
  },
  watch: {
    inputValue(newValue, oldValue) {
      if (newValue) {
        this.isOpen = true
      }
      if (newValue !== this.localSelectValue.name) {
        this.localSelectValue = {}
        this.currentFocusedElementId = 0
        this.$emit('change', null)
      }
    },
  },
  mounted() {
    // TODO Open once,without tasks, then create a task and reopen to verify if hasNopTasksYet has changed to false
    if (this.options.length < 1) {
      this.hasNoTasksYet = true
    } else {
      this.hasNoTasksYet = false
    }
  },
  methods: {
    formatOptionText(item) {
      const { name, project, subProject } = item
      return `${name} ${subProject ? `, in ${subProject}` : ''} ${
        project ? `, from ${project} ${this.$t('project')}` : ''
      }`
    },
    isHighlighted(itemId) {
      return this.highlightedItemId === itemId
    },
    toggleVisibility(evt) {
      const openDropDown =
        SPACEBAR_KEY_CODE.includes(evt.keyCode) ||
        evt.keyCode === ENTER_KEY_CODE

      if (evt.keyCode === ESCAPE_KEY_CODE) {
        this.isOpen = false
      }

      if (evt.type === 'click' || openDropDown) {
        if (this.isOpen) {
          this.isOpen = false
        } else {
          this.isOpen = true
        }
      }
      if (evt.keyCode === DOWN_ARROW_KEY_CODE) {
        this.findNextElementToFocusAndFocus(DOWN_ARROW_KEY_CODE)
      }

      if (evt.keyCode === UP_ARROW_KEY_CODE) {
        this.findNextElementToFocusAndFocus(UP_ARROW_KEY_CODE)
      }
    },
    selectOption(item) {
      this.localSelectValue = item
      this.inputValue = item.name
      this.$emit('change', item)
      // otherwise get open directly by the watcher on the inputValue
      setTimeout(() => {
        this.isOpen = false
      }, 100)
    },
    handleListKeyDown(evt, item) {
      let spaceBarCodeKey
      if (SPACEBAR_KEY_CODE.includes(evt.keyCode)) {
        spaceBarCodeKey = SPACEBAR_KEY_CODE.find((x) => x === evt.keyCode)
      }

      switch (evt.keyCode) {
        case ENTER_KEY_CODE:
          return this.selectOption(item)
        case spaceBarCodeKey:
          return this.selectOption(item)
        case DOWN_ARROW_KEY_CODE:
          return this.findNextElementToFocusAndFocus(DOWN_ARROW_KEY_CODE)
        case UP_ARROW_KEY_CODE:
          return this.findNextElementToFocusAndFocus(UP_ARROW_KEY_CODE)
        case ESCAPE_KEY_CODE:
          return (this.isOpen = false)
      }
    },
    handleWindowClick(evt) {
      if (!this.$el.contains(evt.target) && this.isOpen) {
        this.isOpen = false
      }
    },
    findNextElementToFocusAndFocus(keyCode) {
      if (!this.currentFocusedElementId) {
        return this.focusElement(this.selectOptions[0].id)
      }

      const currentActiveElementIndex = this.selectOptions.findIndex(
        (x) => x.id === this.currentFocusedElementId
      )
      const isNextItemLastItem =
        currentActiveElementIndex >= this.selectOptions.length - 1

      // handle DOWN ARROW KEY CODE
      if (keyCode === DOWN_ARROW_KEY_CODE) {
        if (isNextItemLastItem) {
          const firstItem = this.selectOptions[0]
          return this.focusElement(firstItem.id)
        }

        const nextItem = this.selectOptions[currentActiveElementIndex + 1]
        return this.focusElement(nextItem.id)
      }

      // handle UP ARROW KEY CODE
      if (keyCode === UP_ARROW_KEY_CODE) {
        const isFirstItem = currentActiveElementIndex === 0
        if (isFirstItem) {
          const lastItem = this.selectOptions[this.selectOptions.length - 1]
          return this.focusElement(lastItem.id)
        } else {
          const previousItem = this.selectOptions[currentActiveElementIndex - 1]
          return this.focusElement(previousItem.id)
        }
      }
    },
    focusElement(id) {
      const ref = `listbox-option-${id}`
      this.currentFocusedElementId = id
      this.$refs[ref][0].focus()
    },
  },
}
</script>

<style lang="scss">
.list-options {
  @apply bg-transparent border transition-colors duration-100 border-dark-gray;
}

.single-option {
  @apply text-dark-gray;

  &.highlighted {
    @apply text-dark-blue;
    @apply dark:text-celeste;
  }

  &:focus {
    @apply outline-none text-dark-indigo;
    @apply dark:text-light-indigo;

    .checkmark,
    .option-name {
      @apply text-dark-indigo;
      @apply dark:text-light-indigo;
    }
  }
}

.checkmark {
  @apply text-dark-blue;
  @apply dark:text-celeste;
}
</style>
