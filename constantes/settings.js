export const TIME_DISPLAY_FORMATS_OPTIONS = [
  {
    id: '12H',
    name: '12H',
  },
  {
    id: '24H',
    name: '24H',
  },
]

export const THEME_OPTIONS = [
  {
    id: 'LIGHT',
    name: 'Light',
  },
  {
    id: 'DARK',
    name: 'Dark',
  },
]

export const POMODORO_DEFAULT_SETTINGS = {
  pomodoro_duration: 25,
  small_break_duration: 5,
  big_break_duration: 15,
  pomodoro_quantity: 5,
}
export const USER_DEFAULT_SETTINGS = {
  id: getRandomNumber(),
  theme: THEME_OPTIONS[0].name,
  time_display_format: TIME_DISPLAY_FORMATS_OPTIONS[0].name,
  pomodoro_session_setting_id: null,
  pomodoro_session_setting: null,
}

export const POMODORO_DEFAULT_DURATION = '00:25:00'
export const POMODORO_DEFAULT_DURATION_TIMER = '25:00'

export const DEFAULT_POMODORO_SETTINGS_OPTION_ID =
  'DEFAULT_POMODORO_SETTINGS_OPTION'

export const DEFAULT_POMODORO_SETTINGS_OPTION = (i18n) => ({
  id: DEFAULT_POMODORO_SETTINGS_OPTION_ID,
  name: i18n.t('Default configuration'),
})
