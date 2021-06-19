<template>
  <div>
    <div class="flex flex-col-reverse">
      <div class="relative flex flex-col items-center">
        <div class="text-center flex justify-center w-full relative">
          <task-current-status
            ref="triggerDropdown"
            type="button"
            class="w-full cursor-pointer focus:outline-none"
            aria-haspopup="listbox"
            :aria-expanded="isOpen"
            aria-labelledby="listbox-label"
            :current-status="status.name"
            :is-loading="isLoading"
            @click="handleClickSelect"
            @keydown="toggleVisibility"
          />
        </div>

        <transition
          enter-active-class="transition duration-200 ease-in"
          enter-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ul
            v-if="isOpen"
            class="
              absolute
              min-w-[8rem]
              bg-light-white
              dark:bg-dark-blue
              border border-dark-gray
              shadow-sm
              rounded-md
              z-10
              py-1.5
              top-[2.5rem]
              w-full
              text-center
              focus:outline-none
              flex flex-col
              items-center
              justify-center
            "
            tabindex="-1"
            role="listbox"
            :aria-expanded="isOpen"
            aria-labelledby="listbox-label"
          >
            <li
              v-for="item in filteredOptions"
              :id="`listbox-option-${item.id}`"
              :ref="`listbox-option-${item.id}`"
              :key="item.id"
              class="
                relative
                inline-flex
                justify-center
                py-2
                cursor-pointer
                focus:outline-none
              "
              :class="[isHighlighted(item.id) && 'highlighted']"
              role="option"
            >
              <task-current-status
                class="mx-auto"
                :should-focus="currentFocusedElementId === item.id"
                :current-status="item.name"
                @focusin="currentFocusedElementId = item.id"
                @keydown="handleListKeyDown($event, item)"
                @mouseenter="highlightedItemId = item.id"
                @mouseleave="highlightedItemId = ''"
                @click="selectOption(item)"
              />
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TaskCurrentStatus from '~/components/Atoms/Task/TaskCurrentStatus'
import {
  DOWN_ARROW_KEY_CODE,
  ENTER_KEY_CODE,
  ESCAPE_KEY_CODE,
  SPACEBAR_KEY_CODE,
  UP_ARROW_KEY_CODE,
} from '~/constantes'

export default {
  name: 'TaskSelectStatus',
  components: { TaskCurrentStatus },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    status: {
      type: Object,
      default: () => ({}),
    },
    name: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
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
    filteredOptions() {
      return this.options.filter((x) => x.id !== this.status.id)
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
    handleClickSelect() {
      if (this.isOpen) {
        this.isOpen = false
      } else {
        this.isOpen = true
      }
    },
    toggleVisibility(evt) {
      const openDropDown =
        SPACEBAR_KEY_CODE.includes(evt.keyCode) ||
        evt.keyCode === ENTER_KEY_CODE

      if (evt.keyCode === ESCAPE_KEY_CODE) {
        this.isOpen = false
      }

      if (openDropDown) {
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
      this.$emit('change', item)
      // TODO ensure loading while action doing, then it
      this.isOpen = false
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
        return this.focusElement(this.filteredOptions[0].id)
      }

      const currentActiveElementIndex = this.filteredOptions.findIndex(
        (x) => x.id === this.currentFocusedElementId
      )
      const isNextItemLastItem =
        currentActiveElementIndex >= this.filteredOptions.length - 1
      // handle DOWN ARROW KEY CODE
      if (keyCode === DOWN_ARROW_KEY_CODE) {
        if (isNextItemLastItem) {
          const firstItem = this.filteredOptions[0]
          return this.focusElement(firstItem.id)
        }

        const nextItem = this.filteredOptions[currentActiveElementIndex + 1]
        return this.focusElement(nextItem.id)
      }

      // handle UP ARROW KEY CODE
      if (keyCode === UP_ARROW_KEY_CODE) {
        const isFirstItem = currentActiveElementIndex === 0
        if (isFirstItem) {
          const lastItem = this.filteredOptions[this.filteredOptions.length - 1]
          return this.focusElement(lastItem.id)
        } else {
          const previousItem =
            this.filteredOptions[currentActiveElementIndex - 1]
          return this.focusElement(previousItem.id)
        }
      }
    },
    focusElement(id) {
      this.currentFocusedElementId = id
    },
  },
}
</script>

<style lang="scss">
.single-option {
  @apply text-dark-gray;

  &.highlighted {
    @apply text-dark-blue;
    @apply dark:text-celeste;
  }

  &:focus {
    @apply outline-none text-dark-indigo;
    @apply dark:text-light-indigo;
  }
}
</style>
