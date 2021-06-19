<template>
  <div>
    <p
      class="block font-semibold truncate option-name mb-0"
      :class="[
        isSelected && 'text-dark-blue dark:text-celeste',
        shouldCapitalize && 'capitalize',
      ]"
    >
      {{ name }}
    </p>
    <span
      v-if="isSelected && shouldShowSelected"
      class="
        flex
        absolute
        inset-y-0
        right-0
        items-center
        pr-4
        transition-colors
        duration-100
        checkmark
      "
      :class="isHighlighted && 'highlighted'"
    >
      <icon icon-name="checkMarkMedium" class="w-5 h-5" />
    </span>
  </div>
</template>

<script>
import Icon from '../Icon'

export default {
  name: 'SelectDropdownOption',
  components: { Icon },
  props: {
    isHighlighted: {
      type: Boolean,
      default: false,
    },
    isSelected: {
      type: Boolean,
      default: false,
    },
    shouldShowSelected: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      required: true,
    },
    shouldCapitalize: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
