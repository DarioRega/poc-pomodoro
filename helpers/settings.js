import moment from 'moment-timezone'
import _ from 'lodash'

import {
  SETTINGS_PANEL_STEPS_VALUES,
  SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES,
} from '@/constantes'

export const getTimeValuesInNumber = (values, format = 'hh:mm:ss') => {
  if (typeof values === 'object') {
    const formattedValues = _.cloneDeep(values)
    Object.keys(formattedValues).forEach((x) => {
      if (typeof formattedValues[x] === 'string') {
        formattedValues[x] = moment.duration(values).asMinutes()
      }
    })
    return formattedValues
  }
  if (typeof values === 'string') {
    return moment.duration(values).asMinutes()
  }
}

export const convertNumberInDuration = (value, from = 'minutes') => {
  switch (from) {
    case 'minutes':
      return moment.utc(value * 1000 * 60).format('HH:mm:ss')
    case 'seconds':
      return moment.utc(value * 1000 * 60 * 60).format('HH:mm:ss')
    default:
      return moment.utc(value * 1000).format('HH:mm:ss')
  }
}

export const getSettingsPanelSteps = (i18n) => {
  return [
    {
      step: SETTINGS_PANEL_STEPS_VALUES.GENERAL,
      name: i18n.t('General'),
    },
    {
      step: SETTINGS_PANEL_STEPS_VALUES.ACCOUNT,
      name: i18n.t('Account'),
    },
    {
      step: SETTINGS_PANEL_STEPS_VALUES.POMODORO_CONFIG,
      name: i18n.t('Pomodoro configuration'),
    },
    {
      step: SETTINGS_PANEL_STEPS_VALUES.SUBSCRIPTION,
      name: i18n.t('Subscription'),
    },
    // NOT AN MVP FEATURE, but have to be implemented on v2
    //   step: SETTINGS_PANEL_STEPS_VALUES.ABOUT,
    //   name: i18n.t('About'),
    // },
    // {
    //   step: SETTINGS_PANEL_STEPS_VALUES.HELP,
    //   name: i18n.t('Help'),
    // },
  ]
}
export const getSubscriptionsSettingsPanelSteps = (i18n) => {
  return [
    {
      step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.OVERVIEW,
      name: i18n.t('Overview'),
    },
    {
      step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.ESTIMATE_OF_INVOICE,
      name: i18n.t('Estimate of the invoice'),
    },
    {
      step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.INVOICE_INFORMATIONS,
      name: i18n.t('Invoice informations'),
    },
    {
      step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.BILLING_HISTORY,
      name: i18n.t('Billing history'),
    },
    {
      step: SETTINGS_PANEL_SUBSCRIPTION_CHILDREN_STEPS_VALUES.CURRENT_SUBSCRIPTION,
      name: i18n.t('Current subscription'),
    },
  ]
}
