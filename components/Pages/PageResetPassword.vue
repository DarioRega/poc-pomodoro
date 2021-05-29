<template>
  <container-reset-password-page :has-loader="false">
    <transition-opacity>
      <container-reset-password-card
        :greeting="labels.greeting"
        :additional-info="labels.additionalInfo"
      >
        <container-reset-password-row class="mb-4">
          <brand-input
            name="email"
            :placeholder="labels.placeholders.email"
            :value="login.email"
            :error-text="formErrors.email"
            class="w-full"
            @change="login.email = $event"
          />
        </container-reset-password-row>
        <container-reset-password-row class="mb-4">
          <brand-input
            name="password"
            :placeholder="labels.placeholders.password"
            :value="login.password"
            :error-text="formErrors.password"
            input-type="password"
            class="w-full"
            @change="login.password = $event"
          />
        </container-reset-password-row>
        <container-reset-password-row class="mb-4">
          <brand-input
            name="confirmPassword"
            :placeholder="labels.placeholders.confirmPassword"
            :value="login.confirmPassword"
            :error-text="formErrors.confirmPassword"
            input-type="password"
            class="w-full"
            @change="login.confirmPassword = $event"
          />
        </container-reset-password-row>
        <brand-button
          class="w-full justify-center mt-2"
          :is-loading="isLoading"
          @click="handleSubmit"
        >
          {{ labels.continue }}
        </brand-button>
        <redirect-actions-footer
          class="text-dark-indigo dark:text-light-indigo"
          primary-action-redirect="/login"
          :primary-label="labels.alreadyHaveAnAccount"
        />
      </container-reset-password-card>
    </transition-opacity>
  </container-reset-password-page>
</template>

<script>
import BrandInput from '@/components/Atoms/Inputs/BrandInput'
import ContainerResetPasswordRow from '@/components/Templates/Login/ContainerRow'
import TransitionOpacity from '@/components/Atoms/Transitions/TransitionOpacity'
import RedirectActionsFooter from '@/components/Templates/Login/RedirectActionsFooter'
import ContainerResetPasswordCard from '@/components/Templates/Login/ContainerCard'
import ContainerResetPasswordPage from '@/components/Templates/Login/ContainerPage'
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'PageResetPassword',
  components: {
    BrandInput,
    ContainerResetPasswordRow,
    ContainerResetPasswordCard,
    BrandButton,
    RedirectActionsFooter,
    TransitionOpacity,
    ContainerResetPasswordPage,
  },
  data() {
    return {
      isLoading: false,
      labels: {},
      login: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      formErrors: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  watch: {
    'login.confirmPassword'(newValue, oldValue) {
      this.validateConfirmPassword(newValue)
    },
    'login.password'(newValue, oldValue) {
      this.validatePassword(newValue)
    },
    'login.email'(newValue, oldValue) {
      this.validateEmail(newValue)
    },
    'login.fullName'(newValue, oldValue) {
      this.validateFullName(newValue)
    },
  },
  beforeMount() {
    this.setLabels()
    const email = this.$route.query.email
    if (email) {
      this.login.email = email
    }
  },
  methods: {
    validateEmptyFields(property, value) {
      if (!value) {
        this.formErrors[property] = this.labels.emptyField
        return false
      }
      return true
    },
    validateEmail(value) {
      if (!this.validateEmptyFields('email', value)) {
        return false
      }
      if (!this.$regexValidate('email', value)) {
        this.formErrors.email = this.labels.emailError
        return false
      }
      if (this.formErrors.email) {
        this.formErrors.email = ''
      }
      return true
    },
    validatePassword(value) {
      if (!this.validateEmptyFields('password', value)) {
        return false
      }
      if (value.length < 8) {
        this.formErrors.password = this.labels.passwordError
        return false
      }
      if (this.formErrors.password) {
        this.formErrors.password = ''
      }
      return true
    },
    validateConfirmPassword(value) {
      if (!this.validateEmptyFields('confirmPassword', value)) {
        return false
      }
      if (this.login.password) {
        if (this.login.password !== value) {
          this.formErrors.confirmPassword = this.labels.confirmPasswordError
          return false
        } else if (this.formErrors.confirmPassword) {
          this.formErrors.confirmPassword = ''
        }
      }
      return true
    },

    handleSubmit() {
      const { email, password, confirmPassword } = this.login
      const validations = [
        this.validateEmail(email),
        this.validatePassword(password),
        this.validateConfirmPassword(confirmPassword),
      ]

      if (validations.every((x) => x === true)) {
        // TODO axios call register + then login, remove setTimeout afterwards
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
        }, 4000)
      }
    },
    // TODO pick theses labels from json files
    setLabels() {
      this.labels = {
        greeting: 'Reset my password',
        additionalInfo: "Fill these fields and you're good to go",
        emailError: 'Invalid email',
        passwordError: 'Password too short',
        confirmPasswordError: "Passwords don't match",
        emptyField: "Field can't be empty",
        loading: 'Loading your environment',
        continue: 'Continue',
        alreadyHaveAnAccount: 'Already have an account ? Log in',
        placeholders: {
          email: 'Enter email',
          password: 'Set new password',
          confirmPassword: 'Confirm new password',
        },
      }
    },
  },
}
</script>
