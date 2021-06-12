<template>
  <section
    class="
      relative
      w-full
      bg-light-white
      dark:bg-dark-blue
      py-4
      px-4
      xl:px-6
      rounded-md
    "
  >
    <task-grid-header-all-tasks
      :is-toggled="isToggled"
      :is-layout-stacked="isLayoutStacked"
      :should-show-completed-task="showCompletedTasks"
      class="mb-4"
      @onToggle="isToggled = !isToggled"
      @onArchiveBoxClick="handleEnableArchiveBox"
      @onTrashClick="handleEnableTrash"
      @onToggleCompleteTasks="handleToggleShowCompleteTasks"
    />
    <transition-opacity duration-amount="200">
      <div v-show="isToggled" class="min-h-[30rem]">
        <div class="mb-4">
          <add-task-input
            :placeholder="$t('Add a task...')"
            name="add task"
            @onAddTask="addTask"
          />
        </div>
        <task-grid-body-all-tasks
          v-for="(task, index) in tasksList"
          :key="task.id"
          :task="task"
          :is-layout-stacked="isLayoutStacked"
          :is-selected="currentTaskSelected.id === task.id"
          :is-completed="task.status.value === TASK_STATUS_VALUES.DONE"
          :is-running="currentTaskRunning.id === task.id"
          :current-task-selected="currentTaskSelected"
          :is-archive-enabled="isArchiveEnabled"
          :is-delete-enabled="isDeleteEnabled"
          class="mb-3"
          @onTargetClick="handleClickTaskTarget"
          @onChangeRunningTask="handleChangeRunningTask"
        >
          <div class="absolute w-full -mt-4 right-0 pl-4 mr-0">
            <brand-textarea
              v-show="index === 0"
              :value="currentTaskSelected.description"
              :name="$t('Task description')"
              :is-selected="true"
              :is-completed="isCompletedDescription"
              type="task"
              class="w-full"
              @change.native="handleChangeTaskDescription($event.target.value)"
            />
          </div>
        </task-grid-body-all-tasks>
      </div>
    </transition-opacity>
    <transition-opacity duration-amount="200">
      <div v-show="isToggled">
        <task-grid-pagination
          class="justify-end absolute bottom-[1.5rem] right-[1.5rem]"
          :label="$t('Tasks to display')"
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
import AddTaskInput from '@/components/Atoms/Task/AddTaskInput'

export default {
  name: 'TaskGridAllTasks',
  components: {
    TaskGridHeaderAllTasks,
    TaskGridBodyAllTasks,
    TaskGridPagination,
    BrandTextarea,
    AddTaskInput,
    TransitionOpacity,
  },
  props: {
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
    isLayoutStacked: {
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
      if (this.currentTaskSelected.status) {
        return this.currentTaskSelected.status.value === TASK_STATUS_VALUES.DONE
      }
      return false
    },
    tasksList() {
      let tasksArray = this.tasks
      if (!this.showCompletedTasks) {
        tasksArray = this.tasksListNoComplete
      }
      if (this.amountOfTasksToDisplays === 'all') {
        return tasksArray
      } else {
        return this.taskListOnlyAmountToDisplay(tasksArray)
      }
    },
    tasksListNoComplete() {
      return this.tasks.filter(
        (task) => task.status.value !== TASK_STATUS_VALUES.DONE
      )
    },
    TASK_STATUS_VALUES() {
      return TASK_STATUS_VALUES
    },
  },
  mounted() {
    this.$store.commit('tasks/SET_CURRENT_SELECTED_TASK', this.tasks[0])
  },

  methods: {
    addTask(taskName) {
      console.log('add task => ', taskName)
    },
    taskListOnlyAmountToDisplay(list) {
      return list.filter((x, i) => i <= this.amountOfTasksToDisplays - 1)
    },
    handleClickTaskTarget(taskId) {
      // TODO handle
      if (this.isArchiveEnabled) {
        this.archiveTask(taskId)
      }
      if (this.isDeleteEnabled) {
        const deleteNotification = {
          title: this.$t('Delete task ?'),
          description: this.$t(
            "Are you sure to delete this task ? This action can't be revoked"
          ),
          actionRequired: true,
          type: 'info',
          confirmCallback: () => this.deleteTask(taskId),
        }
        this.$store.dispatch(
          'globalState/createNotification',
          deleteNotification
        )
      }
      if (!this.isArchiveEnabled && !this.isDeleteEnabled) {
        const selectedTask = this.$store.getters['tasks/getTaskById'](taskId)
        this.$store.commit('tasks/SET_CURRENT_SELECTED_TASK', selectedTask)
      }
      // check if isArchiveEnabled or isDeleteEnabled to handle custom event
      // if both of them are false, just fire the select task event
    },
    handleChangeRunningTask(taskId) {
      // TODO handle
      // verify if pomodoro is running, if not show notification warning
      // then if running, change the currentTaskRunning in state and send call api to notify
    },
    handleChangeTaskDescription(value) {
      // TODO dispatch action (with current select task id)
      // /!\ add in handler these params  => (this.currentTaskSelected.id, value)
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
    archiveTask(taskId) {
      // TODO dispatch action to delete
    },
    deleteTask(taskId) {
      // TODO dispatch action to delete
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
