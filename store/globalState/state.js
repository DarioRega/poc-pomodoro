export default () => ({
  isEnvLoading: false,
  isRefreshLoading: true,
  hasSkippedAction: false,
  isLayoutStacked: false,
  isLaunchTimerVisible: false,
  isAbortAction: false,
  isCreateSessionLoading: false,
  currentModalOpen: '',
  currentNotifications: [],
  modalsRefs: {
    SETTINGS: 'SETTINGS',
    SELECT_RUNNING_TASK: 'SELECT_RUNNING_TASK',
  },
  taskTablesKey: 0,
})
