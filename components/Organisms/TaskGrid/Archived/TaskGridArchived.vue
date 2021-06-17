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
    <task-grid-header-archived
      :is-toggled="isToggled"
      :is-layout-stacked="isLayoutStacked"
      :should-show-completed-task="showCompletedTasks"
      :is-delete-enabled="isDeleteEnabled"
      class="mb-4"
      @onToggle="isToggled = !isToggled"
      @onTrashClick="isDeleteEnabled = !isDeleteEnabled"
      @onToggleCompleteTasks="handleToggleShowCompleteTasks"
    />
    <transition-opacity duration-amount="200">
      <div v-show="isToggled" class="min-h-[22rem]">
        <task-grid-body-archived
          v-for="(task, index) in tasksList"
          :key="task.id"
          :task="task"
          :is-layout-stacked="isLayoutStacked"
          :is-selected="currentTaskSelected.id === task.id"
          :is-completed="task.task_status.name === TASK_STATUS_VALUES.DONE"
          :should-row-loading="taskRowsIdLoading.includes(task.id)"
          :current-task-selected="currentTaskSelected"
          :is-delete-enabled="isDeleteEnabled"
          class="mb-3"
          @onTargetClick="handleClickTaskTarget"
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
        </task-grid-body-archived>
      </div>
    </transition-opacity>
    <transition-opacity duration-amount="200">
      <div v-show="isToggled">
        <div class="flex justify-end items-center pt-6">
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
import BrandTextarea from '@/components/Atoms/Inputs/BrandTextarea'
import TaskGridPagination from '@/components/Atoms/Task/TaskGridPagination'
import TransitionOpacity from '@/components/Atoms/Transitions/TransitionOpacity'
import TaskGridHeaderArchived from '@/components/Organisms/TaskGrid/Archived/TaskGridHeaderArchived'
import TaskGridBodyArchived from '@/components/Organisms/TaskGrid/Archived/TaskGridBodyArchived'

export default {
  name: 'TaskGridAllTasks',

  components: {
    TaskGridHeaderArchived,
    TaskGridBodyArchived,
    TaskGridPagination,
    BrandTextarea,
    TransitionOpacity,
  },

  props: {
    currentTaskSelected: {
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
      isToggled: false,
      isDeleteEnabled: false,
      showCompletedTasks: false,
      amountOfTasksToDisplays: 10,
      isAddTaskLoading: false,
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

  mounted() {
    this.$store.commit(
      'tasks/SET_SINGLES_TASKS_CURRENT_ARCHIVED_TASK_SELECTED',
      this.tasksList[0] || {}
    )
  },

  methods: {
    ...mapActions({
      updateTaskDescription: 'tasks/updateTaskDescription',
      addTask: 'tasks/addTask',
      deleteTask: 'tasks/deleteTask',
      createNotification: 'globalState/createNotification',
    }),

    taskListOnlyAmountToDisplay(list) {
      return list.filter((x, i) => i <= this.amountOfTasksToDisplays - 1)
    },

    handleClickTaskTarget(taskId) {
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
      if (!this.isDeleteEnabled) {
        const selectedTask = this.findTask(taskId)
        this.$store.commit(
          'tasks/SET_SINGLES_TASKS_CURRENT_ARCHIVED_TASK_SELECTED',
          selectedTask
        )
      }
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

    handleEnableTrash() {
      this.isDeleteEnabled = !this.isDeleteEnabled
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
