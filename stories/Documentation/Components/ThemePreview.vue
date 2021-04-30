<template>
  <div>
    <h4 class="text-dark-indigo dark:text-light-indigo">
      I should be <strong>dark indigo in light theme</strong> and
      <strong>light indigo in dark theme</strong>
    </h4>
    <hr />
    <p>
      The circle should be light-white in light theme and dark-blue in dark
      theme
    </p>
    <div
      class="rounded-full mt-4 w-16 h-16 bg-light-white dark:bg-dark-blue border-2 border-black"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ThemePreview',
}
</script>
