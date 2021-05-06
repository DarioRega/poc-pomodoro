<template>
  <base-input :is-hovered="isHovered" :is-focused="isFocused">
    <template v-slot:label>
      <slot name="label" />
    </template>
    <template v-slot:input>
      <div class="relative mt-1 shadow-sm brand-select">
        <button
          type="button"
          class="relative pr-10 w-full text-left shadow-sm cursor-pointer base-input"
          :class="[`base-input__${size}`, hasErrors && 'has-errors']"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
          @focusin="isFocused = true"
          @focusout="isFocused = false"
          @click="isOpen = !isOpen"
        >
          <span class="block text-current truncate">
            {{ currentSelected.name || 'Please select' }}
          </span>
          <span
            class="flex absolute inset-y-0 right-0 items-center transition-colors duration-300 pointer-events-none select-toggle text-dark-gray"
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
            class="overflow-auto absolute z-10 mt-2 w-full max-h-60 rounded-md shadow-lg list-options focus:outline-none"
            tabindex="-1"
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            <li
              v-for="(item, index) in options"
              id="listbox-option-0"
              :key="item.id"
              class="relative py-2 pr-9 pl-3 cursor-default select-none single-option text-dark-gray"
              :class="[
                highlightedItemId == item.id && 'highlighted',
                index % 2 === 0
                  ? 'bg-light-white dark:bg-darker-blue'
                  : 'bg-lighter-white dark:bg-dark-blue',
                index < 1 && 'rounded-t-md',
                index === options.length - 1 && 'rounded-b-md',
              ]"
              role="option"
              @mouseenter="highlightedItemId = item.id"
              @mouseleave="highlightedItemId = ''"
              @click="selectOption(item)"
            >
              <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
              <span
                class="block font-normal truncate"
                :class="
                  currentSelected.id === item.id
                    ? 'font-semibold'
                    : 'font-normal'
                "
              >
                {{ item.name }}
              </span>
              <span
                v-if="currentSelected.id === item.id"
                class="flex absolute inset-y-0 right-0 items-center pr-4 transition-colors duration-100 checkmark"
                :class="highlightedItemId === item.id && 'highlighted'"
              >
                <!-- Heroicon name: solid/check -->
                <icon icon-name="increaseDecrease" class="w-5 h-5" />
              </span>
            </li>
          </ul>
        </transition>
      </div>
    </template>
    <template v-slot:errors>
      <slot name="errors" />
    </template>
  </base-input>
</template>

<script>
import Icon from './Icon'
import BaseInput from './BaseInput'

export default {
  name: 'BrandSelect',
  components: { BaseInput, Icon },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    defaultValue: {
      type: Object,
      default: () => ({}),
    },
    size: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      highlightedItemId: '',
      isHovered: false,
      isFocused: false,
      isOpen: false,
      currentSelected: {
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
    window.document.addEventListener('click', this.handleWindowClick)
    if (this.defaultValue.id) {
      this.currentSelected = this.defaultValue
    }
  },
  beforeDestroy() {
    window.document.removeEventListener('click', this.handleWindowClick)
  },
  methods: {
    selectOption(item) {
      this.isOpen = false
      this.currentSelected = item
      this.$emit('change', item)
    },
    handleWindowClick(evt) {
      // TODO check on nuxt env if this works or should add !evt.target.offsetParent.className.includes('brand-select')
      if (this.isOpen && !evt.target.offsetParent) {
        this.isOpen = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.base-input {
  &:hover {
    > .select-toggle {
      @apply text-dark-blue;
      @apply dark:text-celeste;
    }
  }
  &:focus {
    @apply text-dark-indigo;
    @apply dark:text-light-indigo;

    & > .select-toggle {
      @apply text-dark-indigo;
      @apply dark:text-light-indigo;
    }
  }
}
.list-options {
  @apply bg-transparent border transition-colors duration-100 border-dark-gray;
}
.single-option {
  @apply text-dark-gray;

  &.highlighted {
    @apply text-dark-blue;
    @apply dark:text-celeste;
  }
}

.checkmark {
  @apply text-dark-indigo;
  @apply dark:text-light-indigo;

  &.highlighted {
    @apply text-dark-blue;
    @apply dark:text-celeste;
  }
}
</style>
