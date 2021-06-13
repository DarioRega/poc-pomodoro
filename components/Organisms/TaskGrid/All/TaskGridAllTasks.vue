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
      <div v-show="isToggled" class="min-h-[22rem]">
        <task-grid-body-all-tasks
          v-for="(task, index) in tasksList"
          :key="task.id"
          :task="task"
          :is-layout-stacked="isLayoutStacked"
          :is-selected="currentTaskSelected.id === task.id"
          :is-completed="task.task_status.name === TASK_STATUS_VALUES.DONE"
          :is-running="currentTaskRunning.id === task.id"
          :should-row-loading="currentTaskDescriptionLoading === task.id"
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
        <div class="flex justify-between items-center pt-6">
          <add-task-input
            :placeholder="$t('Add a task...')"
            name="add task"
            :is-loading="isAddTaskLoading"
            :error-text="addTaskErrors.name"
            class="mb-3"
            @onAddTask="handleAddTask"
          />
          <task-grid-pagination
            class="justify-end absolute bottom-[1.5rem] right-[1.5rem]"
            :label="$t('Tasks to display')"
            @onPaginationChange="amountOfTasksToDisplays = $event"
          />
        </div>
      </div>
    </transition-opacity>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/All/TaskGridBodyAllTasks'
import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/All/TaskGridHeaderAllTasks'
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
      isAddTaskLoading: false,
      addTaskErrors: {
        name: '',
      },
      currentTaskDescriptionLoading: '',
    }
  },
  computed: {
    isCompletedDescription() {
      if (this.currentTaskSelected.task_status) {
        return (
          this.currentTaskSelected.task_status.name === TASK_STATUS_VALUES.DONE
        )
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
      return this.tasks.length > 0
        ? this.tasks.filter(
            (task) => task.task_status.name !== TASK_STATUS_VALUES.DONE
          )
        : []
    },
    TASK_STATUS_VALUES() {
      return TASK_STATUS_VALUES
    },
  },
  mounted() {
    this.$store.commit(
      'tasks/SET_SINGLES_TASKS_CURRENT_TASK_SELECTED',
      this.tasksList[0]
    )
  },

  methods: {
    ...mapActions({
      updateTaskDescription: 'tasks/updateTaskDescription',
      addTask: 'tasks/addTask',
      createNotification: 'globalState/createNotification',
    }),
    async handleAddTask(name) {
      this.setAddTaskErrorProperty('name', '')
      this.isAddTaskLoading = true
      const errorRequest = await this.addTask({ name })
      if (errorRequest) {
        this.setAddTaskErrorProperty(
          'name',
          errorRequest.errors.name[0] || errorRequest.message
        )
      }
      this.isAddTaskLoading = false
    },
    setAddTaskErrorProperty(property, value) {
      this.addTaskErrors[property] = value
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
        this.createNotification(deleteNotification)
      }
      if (!this.isArchiveEnabled && !this.isDeleteEnabled) {
        const selectedTask = this.findTask(taskId)
        this.$store.commit(
          'tasks/SET_SINGLES_TASKS_CURRENT_TASK_SELECTED',
          selectedTask
        )
      }
      // check if isArchiveEnabled or isDeleteEnabled to handle custom event
      // if both of them are false, just fire the select task event
    },
    handleChangeRunningTask(taskId) {
      // TODO v2
    },
    async handleChangeTaskDescription(value) {
      this.currentTaskDescriptionLoading = this.currentTaskSelected.id

      await this.updateTaskDescription({
        id: this.currentTaskSelected.id,
        description: value,
      })
      this.currentTaskDescriptionLoading = ''
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
    findTask(taskId) {
      return this.tasks.find((x) => x.id === taskId)
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
