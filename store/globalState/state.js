export default () => ({
  isEnvLoading: false,
  isRefreshLoading: true,
  hasSkippedAction: false,
  currentModalOpen: '',
  currentNotifications: [],
  modalsRefs: {
    SETTINGS: 'SETTINGS',
    SELECT_RUNNING_TASK: 'SELECT_RUNNING_TASK',
  },
  isLayoutStacked: false,
  isLaunchTimerVisible: false,
  taskTablesKey: 0,
})
