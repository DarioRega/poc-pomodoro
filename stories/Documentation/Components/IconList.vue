<template>
  <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
    <div v-for="icon in icons" :key="icon">
      <div class="shadow rounded text-center">
        <div class="py-4">
          <icon :icon-name="icon" class="w-12 h-12" />
        </div>
        <div class="bg-gray-200 rounded-b py-4">
          <pre>{{ icon }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../../../components/Atoms/Icon'

export default {
  name: 'IconSizes',
  components: { Icon },
  data() {
    return {
      icons: Array.from(
        new Set(
          require
            .context('../../../components/Atoms/Icons/', false)
            .keys()
            .map((file) => file.replace('./Icon', '').replace('.vue', ''))
        )
      ),
    }
  },
}
</script>
