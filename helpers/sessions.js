import moment from 'moment-timezone'
import { SESSION_STATUS, STEPS_STATUS } from '@/constantes'

export const calculateSessionEndTime = (steps) => {
  let endTimeInSeconds = 0
  steps.forEach((x) => {
    if (x.status === STEPS_STATUS.IN_PROGRESS) {
      const diffFromNowInSeconds = moment(x.end_time).diff(moment(), 'seconds')
      endTimeInSeconds += diffFromNowInSeconds
    }
    if (x.status === STEPS_STATUS.PENDING || x.status === STEPS_STATUS.PAUSED) {
      endTimeInSeconds += calculateTimeInSeconds(x.resting_time)
    }
  })
  // endtime from now calculated
  return moment().add(endTimeInSeconds, 'seconds')
}

// handle format hh:mm:ss or mm:ss
export const calculateTimeInSeconds = (stringNumber) => {
  const p = stringNumber.split(':')
  let seconds = 0
  let minutes = 1

  while (p.length > 0) {
    seconds += minutes * parseInt(p.pop(), 10)
    minutes *= 60
  }
  return seconds
}

export const transformHoursDurationFormatToMinutesDurationFormat = (
  timeString
) => moment.utc(moment.duration(timeString).asMilliseconds()).format('mm:ss')

export const getDurationInMilliseconds = (timeDurationString) =>
  moment.duration(timeDurationString).asMilliseconds()

export const isSessionDoneOrAborted = (status) =>
  status === SESSION_STATUS.DONE || status === SESSION_STATUS.ABORTED
