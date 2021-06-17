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
      :is-delete-enabled="isDeleteEnabled"
      :is-archive-box-enabled="isArchiveEnabled"
      class="mb-4"
      @onToggle="isToggled = !isToggled"
      @onArchiveBoxClick="handleEnableArchiveBox"
      @onTrashClick="handleEnableTrash"
      @onToggleCompleteTasks="handleToggleShowCompleteTasks"
    />
    <transition-opacity duration-amount="200">
      <div
        v-show="isToggled"
        class="min-h-[22rem] relative"
        :class="tasksList.length < 1 && 'h-px'"
      >
        <task-grid-empty-list v-show="tasksList.length < 1" />

        <task-grid-body-all-tasks
          v-for="(task, index) in tasksList"
          :key="task.id"
          :task="task"
          :is-layout-stacked="isLayoutStacked"
          :is-selected="currentTaskSelected.id === task.id"
          :is-completed="task.task_status.name === TASK_STATUS_VALUES.DONE"
          :is-running="currentTaskRunning.id === task.id"
          :should-row-loading="taskRowsIdLoading.includes(task.id)"
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
              :key="`${task.id}-singles-${taskDescriptionKey}`"
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
            :error-text="addTaskError"
            class="mb-3"
            @onAddTask="handleAddTask"
          />
          <task-grid-pagination
            class="justify-end absolute bottom-[1.5rem] right-[1.5rem]"
            :label="$t('Tasks to display')"
            :amount="amountOfTasksToDisplays"
            @onPaginationChange="amountOfTasksToDisplays = $event"
          />
        </div>
      </div>
    </transition-opacity>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

import { TASK_STATUS_VALUES } from '@/constantes'
import TaskGridBodyAllTasks from '@/components/Organisms/TaskGrid/All/TaskGridBodyAllTasks'
import TaskGridHeaderAllTasks from '@/components/Organisms/TaskGrid/All/TaskGridHeaderAllTasks'
import BrandTextarea from '@/components/Atoms/Inputs/BrandTextarea'
import TaskGridPagination from '@/components/Atoms/Task/TaskGridPagination'
import TransitionOpacity from '@/components/Atoms/Transitions/TransitionOpacity'
import AddTaskInput from '@/components/Atoms/Task/AddTaskInput'
import TaskGridEmptyList from '@/components/Atoms/Task/TaskGridEmptyList'

export default {
  name: 'TaskGridAllTasks',

  components: {
    TaskGridHeaderAllTasks,
    TaskGridBodyAllTasks,
    TaskGridPagination,
    BrandTextarea,
    AddTaskInput,
    TaskGridEmptyList,
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
      taskDescriptionKey: 0,
      isToggled: true,
      isDeleteEnabled: false,
      isArchiveEnabled: false,
      showCompletedTasks: true,
      amountOfTasksToDisplays: 10,
      isAddTaskLoading: false,
      addTaskError: '',
      taskRowsIdLoading: [],
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

  watch: {
    'currentTaskSelected.id'(newValue, oldValue) {
      this.taskDescriptionKey += 1
    },
  },
  mounted() {
    if (this.tasksList.length > 0) {
      this.$store.commit(
        'tasks/SET_SINGLES_TASKS_CURRENT_TASK_SELECTED_ID',
        this.tasksList[0].id
      )
    }
  },

  methods: {
    ...mapActions({
      updateTaskDescription: 'tasks/updateTaskDescription',
      addTask: 'tasks/addTask',
      archiveTask: 'tasks/updateTaskStatus',
      deleteTask: 'tasks/deleteTask',
      createNotification: 'globalState/createNotification',
    }),

    async handleAddTask(name) {
      this.isAddTaskLoading = true
      const errorRequest = await this.addTask({ name })
      if (errorRequest) {
        if (errorRequest.errors) {
          this.addTaskError =
            errorRequest.errors.name[0] || errorRequest.message
        }
        if (errorRequest.message) {
          this.createNotification({
            title: this.$t('Oups...'),
            description: errorRequest.message,
            type: 'error',
          })
        }
      }
      this.isAddTaskLoading = false
    },

    taskListOnlyAmountToDisplay(list) {
      return list.filter((x, i) => i <= this.amountOfTasksToDisplays - 1)
    },

    handleClickTaskTarget(taskId) {
      if (this.isArchiveEnabled) {
        this.handleArchiveTask(taskId)
      }
      if (this.isDeleteEnabled) {
        const deleteNotification = {
          title: this.$t('Delete task ?'),
          description: this.$t(
            "Are you sure to delete this task ? This action can't be revoked"
          ),
          actionRequired: true,
          type: 'info',
          confirmCallback: () => this.handleDeleteTask(taskId),
        }
        this.createNotification(deleteNotification)
      }

      if (!this.isArchiveEnabled && !this.isDeleteEnabled) {
        this.$store.commit(
          'tasks/SET_SINGLES_TASKS_CURRENT_TASK_SELECTED_ID',
          taskId
        )
      }
    },

    handleChangeRunningTask(taskId) {
      // TODO v2
    },

    setRowLoading(id) {
      this.taskRowsIdLoading.push(id)
    },

    removeRowLoading(id) {
      this.taskRowsIdLoading = this.taskRowsIdLoading.filter((x) => x !== id)
    },

    async handleChangeTaskDescription(value) {
      const taskId = this.currentTaskSelected.id
      this.setRowLoading(taskId)

      await this.updateTaskDescription({
        id: taskId,
        description: value,
      })

      this.removeRowLoading(taskId)
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

    async handleArchiveTask(taskId) {
      const archivedStatus = this.$store.state.tasks.statuses.find(
        (x) => x.name === TASK_STATUS_VALUES.ARCHIVED
      )
      const payload = { id: taskId, task_status_id: archivedStatus.id }
      this.setRowLoading(taskId)

      await this.archiveTask(payload)

      this.removeRowLoading(taskId)
    },

    async handleDeleteTask(taskId) {
      this.setRowLoading(taskId)

      await this.deleteTask(taskId)

      this.removeRowLoading(taskId)
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
