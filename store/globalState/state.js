export default () => ({
  isEnvLoading: false,
  isRefreshLoading: true,
  isLayoutStacked: false,
  isLaunchTimerVisible: false,
  isCreateSessionLoading: false,
  currentModalOpen: '',
  currentNotifications: [],
  modalsRefs: {
    SETTINGS: 'SETTINGS',
    SELECT_RUNNING_TASK: 'SELECT_RUNNING_TASK',
  },
  taskTablesKey: 0,
})
