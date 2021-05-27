<template>
  <section class="flex-1">
    <task-grid-header-all-tasks
      :labels="labels.header"
      :is-toggled="isToggled"
      :is-stacked="isStacked"
      class="mb-4"
    />
    <div
      ref="containerTasks"
      class="max-h-[24rem] min-h-[24rem] overflow-y-auto"
    >
      <task-grid-body-all-tasks
        v-for="(task, index) in tasks"
        :key="uniqueKey()"
        :task="task"
        :is-selected="currentTaskSelected.id === task.id"
        :current-task-selected="currentTaskSelected"
        :is-first-row="index === 0"
        :is-stacked="isStacked"
        :labels="labels.body"
        class="mb-3"
        @onTargetClick="handleClickTaskTarget"
        @onTaskNameChange="handleChangeTaskName"
        @onTaskStatusChange="handleChangeTaskStatus"
        @onTaskDescriptionChange="handleChangeTaskDescription"
        @onDeadlineChange="handleChangeDeadline"
      >
        <div
          class="fixed w-4/12 -mt-4 right-0 px-4"
          :class="isOverflowing ? 'mr-4' : 'mr-0'"
        >
          <BrandTextarea
            v-show="index === 0"
            :value="currentTaskSelected.description"
            :name="labels.body.taskDescription"
            :is-selected="isSelected"
            type="task"
            class="w-full block top-0 left-0 right-0"
            :class="isOverflowing ? 'pr-3' : 'pr-0'"
            @change="handleChangeTaskDescription"
          />
        </div>
      </task-grid-body-all-tasks>
    </div>
  </section>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/TaskGridBodyAllTasks'
import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/TaskGridHeaderAllTasks'
import BrandTextarea from '@/components/Atoms/Inputs/BrandTextarea'

export default {
  name: 'TaskGridAllTasks',
  components: {
    TaskGridHeaderAllTasks,
    TaskGridBodyAllTasks,
    BrandTextarea,
  },
  props: {
    isSelected: {
      type: Boolean,
      default: false,
    },
    labels: {
      type: Object,
      required: true,
    },
    currentTaskSelected: {
      type: Object,
      default: () => ({}),
    },
    tasks: {
      type: Array,
      required: true,
    },
    isStacked: {
      type: Boolean,
      default: false,
    },
    tasksArrayLength: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isToggled: false,
      isOverflowing: false,
    }
  },

  watch: {
    tasksArrayLength() {
      this.verifyGridOverflow()
    },
  },
  mounted() {
    this.verifyGridOverflow()
  },
  methods: {
    uniqueKey() {
      return uuidv4()
    },
    verifyGridOverflow() {
      this.isOverflowing =
        this.$refs.containerTasks.offsetHeight <
        this.$refs.containerTasks.scrollHeight
    },
    handleClickTaskTarget(taskId) {
      // TODO handle
    },
    handleChangeTaskName(value, taskId) {
      // TODO handle
    },
    handleChangeTaskStatus(statusId, taskId) {
      // TODO handle
    },
    handleChangeTaskDescription(value) {
      // TODO handle
      // /!\ add in handler these params  => (this.currentTaskSelected.id, value)
    },
    handleChangeDeadline({ dateTime, dateString, locale }, taskId) {
      // TODO handle
    },
  },
}
</script>
<style lang="scss" scoped>
.header {
  & .task-name {
    @apply flex-1;
  }
  &__col {
    @apply flex items-center;
    &--center {
      @apply mx-auto text-center justify-center;
    }
    & h6 {
      @apply mb-0;
    }
  }
  &--stacked {
    .task-name {
      @apply w-1/4 flex-none;
    }
  }
}
</style>
