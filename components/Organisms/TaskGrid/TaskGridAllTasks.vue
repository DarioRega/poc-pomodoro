<template>
  <section class="flex-1">
    <task-grid-header-all-tasks
      :labels="labels.header"
      :is-toggled="isToggled"
      :is-stacked="isStacked"
      :should-show-completed-task="showCompletedTasks"
      class="mb-4"
      @onToggle="isToggled = !isToggled"
      @onArchiveBoxClick="handleEnableArchiveBox"
      @onTrashClick="handleEnableTrash"
      @onToggleCompleteTasks="handleToggleShowCompleteTasks"
    />
    <transition
      enter-active-class="transition duration-200 ease-in"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="isToggled" ref="containerTasks" class="min-h-[20rem]">
        <task-grid-body-all-tasks
          v-for="(task, index) in tasksList"
          :key="task.id"
          :task="task"
          :is-selected="currentTaskSelected.id === task.id"
          :is-running="currentTaskRunning.id === task.id"
          :current-task-selected="currentTaskSelected"
          :is-archive-enabled="isArchiveEnabled"
          :is-delete-enabled="isDeleteEnabled"
          :is-stacked="isStacked"
          :labels="labels.body"
          class="mb-3"
          @onTargetClick="handleClickTaskTarget"
          @onChangeRunningTask="handleChangeRunningTask"
          @onTaskNameChange="handleChangeTaskName"
          @onTaskStatusChange="handleChangeTaskStatus"
          @onTaskDescriptionChange="handleChangeTaskDescription"
          @onDeadlineChange="handleChangeDeadline"
        >
          <div class="fixed w-5/12 -mt-4 right-0 px-4 mr-0">
            <BrandTextarea
              v-show="index === 0"
              :value="currentTaskSelected.description"
              :name="labels.body.taskDescription"
              :is-selected="isSelected"
              type="task"
              class="w-full block top-0 left-0 right-0 pr-0"
              @change="handleChangeTaskDescription"
            />
          </div>
        </task-grid-body-all-tasks>
      </div>
    </transition>
  </section>
</template>

<script>
import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/TaskGridBodyAllTasks'
import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/TaskGridHeaderAllTasks'
import BrandTextarea from '@/components/Atoms/Inputs/BrandTextarea'
import { TASK_STATUS_VALUES } from '@/constantes'

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
    currentTaskRunning: {
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
      isDeleteEnabled: false,
      isArchiveEnabled: false,
      showCompletedTasks: false,
    }
  },
  computed: {
    tasksList() {
      return this.showCompletedTasks ? this.tasks : this.tasksListNoComplete()
    },
  },
  methods: {
    tasksListNoComplete() {
      return this.tasks.filter(
        (task) => task.status.value !== TASK_STATUS_VALUES.DONE
      )
    },
    handleClickTaskTarget(taskId) {
      // TODO handle
      // check if isArchiveEnabled or isDeleteEnabled to handle custom event
      // if both of them are false, just fire the select task event
    },
    handleChangeRunningTask(taskId) {
      // TODO handle
      // verify if pomodoro is running, if not show notification warning
      // then if running, change the currentTaskRunning in state and send call api to notify
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
    handleToggleShowCompleteTasks() {
      this.showCompletedTasks = !this.showCompletedTasks
    },
    handleEnableArchiveBox() {
      if (this.isDeleteEnabled) {
        this.isDeleteEnabled = false
      }
      this.isArchiveEnabled = !this.isArchiveEnabled
    },
    handleEnableTrash() {
      if (this.isArchiveEnabled) {
        this.isArchiveEnabled = false
      }
      this.isDeleteEnabled = !this.isDeleteEnabled
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
