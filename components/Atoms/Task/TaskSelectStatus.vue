<template>
  <div>
    <div class="flex flex-col-reverse">
      <div class="relative">
        <div class="text-center flex justify-center w-full relative">
          <!--              TODO handle whatinput focus-->
          <task-current-status
            ref="triggerDropdown"
            type="button"
            class="w-full cursor-pointer focus:outline-none"
            aria-haspopup="listbox"
            :aria-expanded="isOpen"
            aria-labelledby="listbox-label"
            :current-status="localValue.status"
            :status-text="localValue.name"
            @click="toggleVisibility($event, true)"
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
              overflow-auto
              absolute
              z-10
              mt-2
              w-full
              text-center
              focus:outline-none
            "
            tabindex="-1"
            role="listbox"
            :aria-expanded="isOpen"
            aria-labelledby="listbox-label"
          >
            <!--              TODO handle whatinput focus-->
            <li
              v-for="(item, index) in filteredOptions"
              :id="`listbox-option-${item.id}`"
              :ref="`listbox-option-${item.id}`"
              :key="item.id"
              tabindex="0"
              class="
                relative
                inline-flex
                justify-center
                py-2
                cursor-pointer
                focus:outline-none
              "
              :class="[
                isHighlighted(item.id) && 'highlighted',
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
              <task-current-status
                class="mx-auto"
                :should-focus="currentFocusedElementId === item.id"
                :current-status="item.status"
                :status-text="item.name"
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
    value: {
      type: Object,
      default: () => ({}),
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
    filteredOptions() {
      return this.options.filter((x) => x.id !== this.localValue.id)
    },
  },
  beforeMount() {
    this.localValue = this.value
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
    toggleVisibility(evt, isMouseClick = false) {
      if (
        this.isOpen &&
        (isMouseClick ||
          evt.keyCode === ENTER_KEY_CODE ||
          SPACEBAR_KEY_CODE.includes(evt.keyCode) ||
          evt.keyCode === ESCAPE_KEY_CODE)
      ) {
        return (this.isOpen = false)
      }

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
