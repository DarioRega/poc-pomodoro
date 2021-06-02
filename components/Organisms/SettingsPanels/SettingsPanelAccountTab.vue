<template>
  <section class="settings-panel w-full h-full">
    <!--    FULL NAME -->
    <div
      class="settings-panel__container settings-panel__container--account-tab"
    >
      <div class="settings-panel__labels">
        <h6>{{ labels.fullName.title }}</h6>
        <p>{{ labels.fullName.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-input
          :value="localValues.fullName"
          name="full name"
          :error-text="errors.fullName"
          @change="localValues.fullName = $event"
        />
        <div class="settings-panel__actions">
          <brand-button
            :is-loading="onGoingActions.includes('fullName')"
            :is-disabled="onGoingActions.includes('fullName')"
            @click="handleChangeFullName"
          >
            {{ labels.fullName.action }}
          </brand-button>
        </div>
      </div>
    </div>

    <!--    EMAIL -->
    <div
      class="settings-panel__container settings-panel__container--account-tab"
    >
      <div class="settings-panel__labels">
        <h6>{{ labels.email.title }}</h6>
        <p>{{ labels.email.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-input
          :value="localValues.email"
          name="full name"
          :error-text="errors.email"
          @change="localValues.email = $event"
        />
        <div class="settings-panel__actions">
          <brand-button
            :is-loading="onGoingActions.includes('email')"
            :is-disabled="onGoingActions.includes('email')"
            @click="handleChangeEmail"
          >
            {{ labels.email.action }}
          </brand-button>
        </div>
      </div>
    </div>

    <!--    PASSWORD -->
    <div
      class="settings-panel__container settings-panel__container--account-tab"
    >
      <div class="settings-panel__labels">
        <h6>{{ labels.password.title }}</h6>
        <p>{{ labels.password.description }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-input
          :value="localValues.password"
          name="password"
          :error-text="errors.password"
          input-type="password"
          @change="localValues.password = $event"
        />
        <brand-input
          class="mt-10"
          :value="localValues.confirmPassword"
          name="password"
          :placeholder="labels.password.confirmPassword"
          :error-text="errors.confirmPassword"
          input-type="password"
          @change="localValues.confirmPassword = $event"
        />
        <div class="settings-panel__actions">
          <brand-button
            :is-loading="onGoingActions.includes('password')"
            :is-disabled="onGoingActions.includes('password')"
            @click="handleChangePassword"
          >
            {{ labels.password.action }}
          </brand-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BrandInput from '@/components/Atoms/Inputs/BrandInput'
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'SettingsPanelAccountTab',
  components: { BrandInput, BrandButton },
  props: {
    labels: {
      type: Object,
      required: true,
    },
    values: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      onGoingActions: [],
      localValues: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      errors: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  computed: {
    allowSave() {
      return {
        fullName: this.values.fullName !== this.localValues.fullName,
        email: this.values.email !== this.localValues.email,
        password:
          this.localValues.password === this.localValues.confirmPassword,
      }
    },
  },
  beforeMount() {
    const { fullName, email } = this.values
    // security, we don't display password in input
    this.localValues = {
      fullName,
      email,
      password: '----------',
      confirmPassword: '',
    }
  },
  methods: {
    validateEmptyFields(fieldProperty) {
      if (!this.localValues.fullName) {
        this.errors[fieldProperty] = this.labels.errors.emptyField
        return false
      } else if (this.errors[fieldProperty]) {
        this.errors[fieldProperty] = ''
      }
      return true
    },
    validateChange(fieldProperty) {
      if (
        this.localValues[fieldProperty].trim() === this.values[fieldProperty]
      ) {
        this.errors[fieldProperty] = this.labels.errors.noChange
        return false
      } else if (this.errors[fieldProperty]) {
        this.errors[fieldProperty] = ''
      }
      return true
    },
    setLoadingOnProperty(fieldProperty) {
      this.onGoingActions.push(fieldProperty)
    },
    removeLoadingOnProperty(fieldProperty) {
      // TODO remove setTimeout, used only for example
      setTimeout(() => {
        this.onGoingActions = this.onGoingActions.filter(
          (x) => x !== fieldProperty
        )
      }, 3000)
    },
    handleChangeFullName() {
      const fieldProperty = 'fullName'
      if (this.validateEmptyFields(fieldProperty)) {
        if (this.validateChange(fieldProperty)) {
          this.setLoadingOnProperty(fieldProperty)
          // TODO axios call
          // after call remove from onGoingActions
          this.removeLoadingOnProperty(fieldProperty)
        }
      }
    },
    handleChangeEmail() {
      const fieldProperty = 'email'
      if (this.validateEmptyFields(fieldProperty)) {
        if (this.validateChange(fieldProperty)) {
          if (!this.$regexValidate('email', this.localValues.email)) {
            this.errors.email = this.labels.errors.invalidEmail
          } else {
            this.setLoadingOnProperty(fieldProperty)
            // TODO axios call
            // after call remove from onGoingActions
            this.removeLoadingOnProperty(fieldProperty)
          }
        }
      }
    },
    handleChangePassword() {
      const fieldProperty = 'password'
      let hasError = false
      if (this.validateEmptyFields(fieldProperty)) {
        if (this.validateChange(fieldProperty)) {
          if (this.localValues.password !== this.localValues.confirmPassword) {
            this.errors.confirmPassword = this.labels.errors.confirmPassword
            hasError = true
          }
          if (this.localValues.password.length < 8) {
            this.errors.password = this.labels.errors.password
            hasError = true
          }
          if (!hasError) {
            this.errors = { ...this.errors, password: '', confirmPassword: '' }
            this.setLoadingOnProperty(fieldProperty)
            // TODO axios call
            // after call remove from onGoingActions
            this.removeLoadingOnProperty(fieldProperty)
          }
        }
      }
    },
  },
}
</script>
