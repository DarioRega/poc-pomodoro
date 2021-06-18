import moment from 'moment-timezone'
import { BILLING_DATE_FORMAT } from '@/constantes'

export const getTotalAmountWithTaxFromString = (
  amountString,
  taxString,
  withCurrency = true
) => {
  const currency = amountString.match(/.{1,3}/g)[0]
  const amount = amountString.split(currency)[1]
  const tax = taxString.split(currency)[1]

  return `${withCurrency && currency} ${parseFloat(amount) + parseFloat(tax)}`
}

export const getNumberInAmountString = (amountString) => {
  const currency = amountString.match(/.{1,3}/g)[1].trim()
  return parseInt(currency)
}

export const isAmountSubscriptionMonthly = (amountString) => {
  const amountPaid = getNumberInAmountString(amountString)
  if (amountPaid > 5) {
    return false
  }
  return true
}

export const formatReceiptDate = (date) =>
  moment(date).format(BILLING_DATE_FORMAT)
