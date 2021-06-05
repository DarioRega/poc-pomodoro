import { POMODORO_STATUS } from '@/constantes'

export default () => ({
  currentStatus: POMODORO_STATUS.SESSION.PENDING,
  currentTimer: '25:00',
  currentSessionEndTime: new Date(),
  sessionSteps: [
    { status: 'DONE' },
    { status: 'DONE' },
    { status: 'CURRENT' },
    { status: 'PENDING' },
  ],
})
