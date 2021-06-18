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
