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
export const DEFAULT_POMODORO_SETTINGS_OPTION_ID =
  'DEFAULT_POMODORO_SETTINGS_OPTION'
export const DEFAULT_POMODORO_SETTINGS_OPTION = (i18n) => ({
  id: DEFAULT_POMODORO_SETTINGS_OPTION_ID,
  name: i18n.t('Default configuration'),
})
