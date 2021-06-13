<template>
  <div class="flex items-center">
    <p class="mr-3 text-dark-gray">{{ label }}</p>
    <brand-select
      :options="options"
      :value="value"
      name="select numbers of tasks to display"
      size="small"
      :should-show-selected="false"
      @change="handleChange"
    />
  </div>
</template>

<script>
import BrandSelect from '@/components/Atoms/Inputs/BrandSelect'

export default {
  name: 'TaskGridPagination',
  components: { BrandSelect },
  props: {
    label: {
      type: String,
      required: true,
    },
    amount: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      options: [
        { id: 10, name: '10' },
        { id: 20, name: '20' },
        { id: 50, name: '50' },
        { id: 'all', name: 'All' },
      ],
    }
  },
  computed: {
    value() {
      return this.options.find((x) => x.id === this.amount)
    },
  },
  methods: {
    handleChange(item) {
      this.$emit('onPaginationChange', item.id)
    },
  },
}
</script>
