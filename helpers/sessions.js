import moment from 'moment-timezone'
import { STEPS_STATUS } from '@/constantes'

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

export const timerInterval = () => {
  const interval = 1000

  this.interval = setInterval(() => {
    const diff = moment(args.end_time).unix() - moment().unix()
    this.timer = moment.unix(diff).format('mm:ss')
  }, interval)
}
