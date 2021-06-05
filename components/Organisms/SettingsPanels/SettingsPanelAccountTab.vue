<template>
  <section class="settings-panel w-full h-full">
    <!--    FULL NAME -->
    <div
      class="settings-panel__container settings-panel__container--account-tab"
    >
      <div class="settings-panel__labels">
        <h6>{{ $t('Full name') }}</h6>
        <p>{{ $t('Current full name') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-input
          name="full name"
          :error-text="errors.fullName"
          :value="localValues.fullName"
          @change.native="localValues.fullName"
        />
        <div class="settings-panel__actions">
          <brand-button
            :is-loading="onGoingActions.includes('fullName')"
            :is-disabled="onGoingActions.includes('fullName')"
            @click="handleChangeFullName"
          >
            {{ $t('Change full name') }}
          </brand-button>
        </div>
      </div>
    </div>

    <!--    EMAIL -->
    <div
      class="settings-panel__container settings-panel__container--account-tab"
    >
      <div class="settings-panel__labels">
        <h6>{{ $t('Email') }}</h6>
        <p>{{ $t('Current email for login') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-input
          name="full name"
          :error-text="errors.email"
          :value="localValues.email"
          @change.native="localValues.email = $event.target.value"
        />
        <div class="settings-panel__actions">
          <brand-button
            :is-loading="onGoingActions.includes('email')"
            :is-disabled="onGoingActions.includes('email')"
            @click="handleChangeEmail"
          >
            {{ $t('Change email') }}
          </brand-button>
        </div>
      </div>
    </div>

    <!--    PASSWORD -->
    <div
      class="settings-panel__container settings-panel__container--account-tab"
    >
      <div class="settings-panel__labels">
        <h6>{{ $t('Password') }}</h6>
        <p>{{ $t('Current password for login') }}</p>
      </div>
      <div class="settings-panel__configurations">
        <brand-input
          name="password"
          :error-text="errors.password"
          input-type="password"
          :value="localValues.password"
          @change.native="localValues.password = $event.target.value"
        />
        <brand-input
          class="mt-10"
          :value="localValues.confirmPassword"
          name="password"
          :placeholder="$t('Confirm password')"
          :error-text="errors.confirmPassword"
          input-type="password"
          @change.native="localValues.confirmPassword = $event.target.value"
        />
        <div class="settings-panel__actions">
          <brand-button
            :is-loading="onGoingActions.includes('password')"
            :is-disabled="onGoingActions.includes('password')"
            @click="handleChangePassword"
          >
            {{ $t('Change password') }}
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
  mounted() {
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
        this.errors[fieldProperty] = this.$t('Field is required')
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
        this.errors[fieldProperty] = this.$t(
          'A new value is required to update'
        )
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
            this.errors.email = this.$t('Invalid email')
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
            this.errors.confirmPassword = this.$t('Passwords are different')
            hasError = true
          }
          if (this.localValues.password.length < 8) {
            this.errors.password = this.$t('Password too short')
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
