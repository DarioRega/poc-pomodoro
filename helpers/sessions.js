import moment from 'moment-timezone'
import { SESSION_STATUS } from '@/constantes'

export const transformHoursDurationFormatToMinutesDurationFormat = (
  timeString
) => moment.utc(moment.duration(timeString).asMilliseconds()).format('mm:ss')

export const getDurationInMilliseconds = (timeDurationString) =>
  moment.duration(timeDurationString).asMilliseconds()

export const isSessionDoneOrAborted = (status) =>
  status === SESSION_STATUS.DONE || status === SESSION_STATUS.ABORTED
