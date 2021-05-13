<template>
  <div class="grid grid-cols-1 gap-8">
    <div>
      <div
        class="
          flex flex-col
          space-y-3
          sm:flex-row
          text-xs
          sm:space-y-0 sm:space-x-4
          bg-white
          rounded-sm
          m-3
          p-3
        "
      >
        <div class="w-32 flex-shrink-0">
          <div class="h-10 flex flex-col justify-center">
            <div class="text-base font-semibold text-gray-800 capitalize">
              Brand Colors
            </div>
          </div>
        </div>
        <div
          class="
            min-w-0
            flex-1
            grid grid-cols-5
            2xl:grid-cols-10
            gap-x-4 gap-y-3
            2xl:gap-x-2
          "
        >
          <div
            v-for="(colorHexa, index) in colors"
            :key="index"
            class="space-y-1.5"
          >
            <div
              class="
                h-10
                w-full
                rounded
                ring-1 ring-inset ring-black ring-opacity-0
              "
              :style="`background-color: ${colorHexa}`"
            ></div>
            <div
              class="
                px-0.5
                md:flex
                md:justify-between
                md:space-x-2
                2xl:space-x-0
                2xl:block
              "
            >
              <div class="font-medium text-gray-900">
                {{ index }}
              </div>
              <div class="uppercase">{{ colorHexa }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPalette',
  props: {
    colors: {
      type: Object,
      required: true,
    },
  },
}
</script>
