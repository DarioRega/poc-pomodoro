<template>
  <div
    class="brand-input relative"
    :class="[
      `brand-input__select-container--size-${size}`,
      hasErrors && 'brand-input--has-errors',
    ]"
  >
    <div class="flex flex-col-reverse">
      <div class="relative">
        <button
          ref="triggerDropdown"
          type="button"
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
          :class="[
            `brand-input__select--size-${size}`,
            `brand-input__select--${type}`,
            size === 'small' ? ' pr-6' : 'pr-10',
          ]"
          aria-labelledby="listbox-label"
          @click="toggleVisibility"
          @keydown="toggleVisibility"
        >
          <span class="block text-current truncate">
            {{ value.name || placeholder }}
          </span>
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
            "
            :class="[
              size === 'default' ? 'pr-3' : 'pr-5',
              size === 'small' && 'pr-0.5',
            ]"
          >
            <icon
              icon-name="select"
              class="w-5 h-5 text-current"
              aria-hidden="true"
            ></icon>
          </span>
        </button>

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
              "
              :class="[
                isHighlighted(item.id) && 'highlighted',
                index % 2 === 0
                  ? 'bg-light-white dark:bg-darker-blue'
                  : 'bg-lighter-white dark:bg-dark-blue',
                size !== 'small' ? 'pr-9 pl-3' : 'pr-0 text-center',
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
                :is-selected="value.id === item.id"
                :should-show-selected="shouldShowSelected"
                :name="item.name"
              />
            </li>
          </ul>
        </transition>
      </div>

      <label v-if="label && type !== 'task'" class="brand-input__label">
        {{ label }}
      </label>
    </div>
    <transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-class="-translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transform transition duration-200 ease-in"
      leave-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-4 opacity-0"
    >
      <div
        v-show="hasErrors"
        class="mt-1 absolute text-right brand-input__errors w-full"
      >
        <p>{{ errorText }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from '../Icon'
import SelectDropdownOption from './SelectDropdownOption'
import {
  DOWN_ARROW_KEY_CODE,
  ENTER_KEY_CODE,
  ESCAPE_KEY_CODE,
  SPACEBAR_KEY_CODE,
  UP_ARROW_KEY_CODE,
} from '~/constantes'

export default {
  name: 'BrandSelect',
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
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    errorText: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    shouldShowSelected: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      highlightedItemId: '',
      currentFocusedElementId: 0,
      isOpen: false,
    }
  },
  computed: {
    hasErrors() {
      return this.errorText.length > 0
    },
    selectOptions() {
      return this.shouldShowSelected
        ? this.options
        : this.options.filter((x) => x.id !== this.value.id)
    },
  },
  mounted() {
    window.document.addEventListener('click', this.handleWindowClick)
  },
  beforeDestroy() {
    window.document.removeEventListener('click', this.handleWindowClick)
  },
  methods: {
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
        this.isOpen = true
      }
      if (evt.keyCode === DOWN_ARROW_KEY_CODE) {
        this.findNextElementToFocusAndFocus(DOWN_ARROW_KEY_CODE)
      }

      if (evt.keyCode === UP_ARROW_KEY_CODE) {
        this.findNextElementToFocusAndFocus(UP_ARROW_KEY_CODE)
      }
    },
    selectOption(item) {
      this.isOpen = false
      this.$emit('change', item)
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
