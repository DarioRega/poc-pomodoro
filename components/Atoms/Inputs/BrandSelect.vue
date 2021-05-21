<template>
  <div
    class="brand-input"
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
            pr-10
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
          ]"
          aria-labelledby="listbox-label"
          @click="toggleVisibility"
          @keydown="toggleVisibility"
        >
          <span class="block text-current truncate">
            {{ localValue.name || 'Please select' }}
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
            :class="size === 'default' ? 'pr-3' : 'pr-5'"
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
              v-for="(item, index) in options"
              :id="`listbox-option-${item.id}`"
              :ref="`listbox-option-${item.id}`"
              :key="item.id"
              tabindex="0"
              class="
                relative
                py-2
                pr-9
                pl-3
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
                index < 1 && 'rounded-t-md',
                index < options.length - 1 && 'rounded-b-md',
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
                :is-selected="localValue.id === item.id"
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
    <div v-show="hasErrors" class="mt-1 text-right brand-input__errors">
      <slot name="errors" />
    </div>
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

// TODO whatinput=keyboard single-option focus = outline indigo

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
  },
  data() {
    return {
      highlightedItemId: '',
      currentFocusedElementId: 0,
      isOpen: false,
      localValue: {
        id: null,
      },
    }
  },
  computed: {
    hasErrors() {
      return !!this.$slots.errors
    },
  },
  mounted() {
    this.localValue = this.value
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
      this.localValue = item
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
        default:
          return (this.isOpen = false)
      }
    },
    handleWindowClick(evt) {
      // TODO check on nuxt env if this works or should add !evt.target.offsetParent.className.includes('brand-select')
      if (this.isOpen && !evt.target.offsetParent) {
        this.isOpen = false
      }
    },
    findNextElementToFocusAndFocus(keyCode) {
      if (!this.currentFocusedElementId) {
        return this.focusElement(this.options[0].id)
      }

      const currentActiveElementIndex = this.options.findIndex(
        (x) => x.id === this.currentFocusedElementId
      )
      const isNextItemLastItem =
        currentActiveElementIndex >= this.options.length - 1

      // handle DOWN ARROW KEY CODE
      if (keyCode === DOWN_ARROW_KEY_CODE) {
        if (isNextItemLastItem) {
          const firstItem = this.options[0]
          return this.focusElement(firstItem.id)
        }

        const nextItem = this.options[currentActiveElementIndex + 1]
        return this.focusElement(nextItem.id)
      }

      // handle UP ARROW KEY CODE
      if (keyCode === UP_ARROW_KEY_CODE) {
        const isFirstItem = currentActiveElementIndex === 0
        if (isFirstItem) {
          const lastItem = this.options[this.options.length - 1]
          return this.focusElement(lastItem.id)
        } else {
          const previousItem = this.options[currentActiveElementIndex - 1]
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
