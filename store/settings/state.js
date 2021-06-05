export default () => ({
  // TODO when endpoint available
  settingsValues: {
    generalTab: {
      displayLanguage: {
        id: 1434,
        value: 'en',
        name: 'English',
      },
      timezone: {
        id: 143434,
        value: 'gmt+1',
        name: 'GMT+1',
      },
      timeDisplayFormat: {
        id: 123,
        value: 'am/pm',
        name: 'AM/PM',
      },
      theme: {
        id: 2354,
        value: 'dusk',
        name: 'Dusk',
      },
      bugReports: false,
      analytics: true,
    },
    accountTab: {
      fullName: 'Dario Regazzoni',
      email: 'dario.regazzoni@outlook.fr',
      password: 'proutkaka',
    },
    pomodoroConfigTab: {
      pomodoro_duration: 25,
      small_break_duration: 5,
      big_break_duration: 15,
      pomodoro_quantity: 5,
      noise_notification_end_process: false,
      start_pomodoro_auto: true,
      start_small_break_auto: true,
      start_big_break_auto: false,
    },
    subscriptionTab: {
      // TODO with real values, when endpoint available
    },
  },
  settingsOptions: {
    displayLanguages: [
      {
        id: 1434,
        value: 'en',
        name: 'English',
      },
      {
        id: 1324,
        value: 'fr',
        name: 'Français',
      },
      {
        id: 132544,
        value: 'it',
        name: 'Italiano',
      },
    ],
    timezones: [
      {
        id: 434,
        value: 'gmt+1',
        name: 'GMT + 1',
      },
      {
        id: 1354524,
        value: 'gmt+2',
        name: 'GMT + 2',
      },
      {
        id: 132544,
        value: 'gmt+3',
        name: 'GMT + 3',
      },
    ],
    timeDisplayFormats: [
      {
        id: 123,
        value: '12',
        name: 'AM/PM',
      },
      {
        id: 4123,
        value: '24',
        name: '24H',
      },
    ],
    themes: [
      {
        id: 2354,
        value: 'dusk',
        name: 'Dusk',
      },
      {
        id: 235454,
        value: 'light',
        name: 'Light',
      },
    ],
  },
})
