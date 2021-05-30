<template>
  <section
    class="
      relative
      flex-1
      bg-light-white
      dark:bg-dark-blue
      py-4
      px-6
      rounded-md
    "
  >
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
    <transition-opacity duration-amount="200">
      <div v-show="isToggled" class="min-h-[15rem]">
        <task-grid-body-all-tasks
          v-for="(task, index) in tasksList"
          :key="task.id"
          :task="task"
          :is-stacked="isStacked"
          :is-selected="currentTaskSelected.id === task.id"
          :is-completed="task.status.value === TASK_STATUS_VALUES.DONE"
          :is-running="currentTaskRunning.id === task.id"
          :current-task-selected="currentTaskSelected"
          :is-archive-enabled="isArchiveEnabled"
          :is-delete-enabled="isDeleteEnabled"
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
              :is-selected="true"
              :is-completed="isCompletedDescription"
              type="task"
              class="w-full block top-0 left-0 right-0 pr-6"
              @change="handleChangeTaskDescription"
            />
          </div>
        </task-grid-body-all-tasks>
      </div>
    </transition-opacity>
    <transition-opacity duration-amount="200">
      <div v-show="isToggled">
        <task-grid-pagination
          class="pb-1 pt-6 justify-end"
          :label="labels.general.amountOfTasksToDisplay"
          @onPaginationChange="amountOfTasksToDisplays = $event"
        />
      </div>
    </transition-opacity>
  </section>
</template>

<script>
import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/TaskGridBodyAllTasks'
import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/TaskGridHeaderAllTasks'
import BrandTextarea from '@/components/Atoms/Inputs/BrandTextarea'
import { TASK_STATUS_VALUES } from '@/constantes'
import TaskGridPagination from '@/components/Atoms/Task/TaskGridPagination'
import TransitionOpacity from '@/components/Atoms/Transitions/TransitionOpacity'

export default {
  name: 'TaskGridAllTasks',
  components: {
    TaskGridHeaderAllTasks,
    TaskGridBodyAllTasks,
    TaskGridPagination,
    BrandTextarea,
    TransitionOpacity,
  },
  props: {
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
  },
  data() {
    return {
      isToggled: true,
      isDeleteEnabled: false,
      isArchiveEnabled: false,
      showCompletedTasks: false,
      amountOfTasksToDisplays: 0,
    }
  },
  computed: {
    isCompletedDescription() {
      return this.currentTaskSelected.status.value === TASK_STATUS_VALUES.DONE
    },
    tasksList() {
      let tasksArray = this.tasks

      if (!this.showCompletedTasks) {
        tasksArray = this.tasksListNoComplete()
      }
      if (this.amountOfTasksToDisplays === 'all') {
        return tasksArray
      } else {
        return this.taskListOnlyAmountToDisplay(tasksArray)
      }
    },
    TASK_STATUS_VALUES() {
      return TASK_STATUS_VALUES
    },
  },
  methods: {
    tasksListNoComplete() {
      return this.tasks.filter(
        (task) => task.status.value !== TASK_STATUS_VALUES.DONE
      )
    },
    taskListOnlyAmountToDisplay(list) {
      return list.filter((x, i) => i <= this.amountOfTasksToDisplays - 1)
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
