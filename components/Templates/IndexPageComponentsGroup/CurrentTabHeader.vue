<template>
  <div class="flex flex-col justify-between">
    <div class="flex justify-between items-center">
      <h1 class="font-semibold text-dark-blue dark:text-celeste">
        {{ currentProjectName }}
      </h1>
      <!--          TODO WHEN WE HAVE TWO LAYOUTS IMPLEMENT LAYOUT CHOICES HERE
       https://seelo.atlassian.net/browse/POM-52
       -->
    </div>
    <!--    TODO WHEN WE IMPLEMENT THE TODOS | NOTES | ATTACHEMENTS, IMPLEMENT HERE
     https://seelo.atlassian.net/browse/POM-51
     -->
  </div>
</template>

<script>
export default {
  name: 'CurrentTabHeader',
  computed: {
    currentProjectName() {
      return this.$store.state.tasks.currentProjectName
    },
  },
}
</script>
