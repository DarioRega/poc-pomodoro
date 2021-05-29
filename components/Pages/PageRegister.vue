<template>
  <container-register-page :has-loader="false">
    <transition-opacity>
      <container-register-card
        :greeting="labels.greeting"
        :additional-info="labels.additionalInfo"
      >
        <container-register-row class="mb-4 mt-2">
          <brand-input
            name="fullName"
            :placeholder="labels.placeholders.fullName"
            :value="register.fullName"
            :error-text="formErrors.fullName"
            class="w-full"
            @change="register.fullName = $event"
          />
        </container-register-row>
        <container-register-row class="mb-4">
          <brand-input
            name="email"
            :placeholder="labels.placeholders.email"
            :value="register.email"
            :error-text="formErrors.email"
            class="w-full"
            @change="register.email = $event"
          />
        </container-register-row>
        <container-register-row class="mb-4">
          <brand-input
            name="password"
            :placeholder="labels.placeholders.password"
            :value="register.password"
            :error-text="formErrors.password"
            input-type="password"
            class="w-full"
            @change="register.password = $event"
          />
        </container-register-row>
        <container-register-row class="mb-4">
          <brand-input
            name="confirmPassword"
            :placeholder="labels.placeholders.confirmPassword"
            :value="register.confirmPassword"
            :error-text="formErrors.confirmPassword"
            input-type="password"
            class="w-full"
            @change="register.confirmPassword = $event"
          />
        </container-register-row>
        <brand-button
          class="w-full justify-center mt-2"
          :is-loading="isLoading"
          @click="handleSubmit"
        >
          {{ labels.register }}
        </brand-button>
        <redirect-actions-footer
          class="text-dark-indigo dark:text-light-indigo"
          primary-action-redirect="/login"
          :primary-label="labels.alreadyHaveAnAccount"
        />
      </container-register-card>
    </transition-opacity>
  </container-register-page>
</template>

<script>
import BrandInput from '@/components/Atoms/Inputs/BrandInput'
import ContainerRegisterRow from '@/components/Templates/Login/ContainerRow'
import TransitionOpacity from '@/components/Atoms/Transitions/TransitionOpacity'
import RedirectActionsFooter from '@/components/Templates/Login/RedirectActionsFooter'
import ContainerRegisterCard from '@/components/Templates/Login/ContainerCard'
import ContainerRegisterPage from '@/components/Templates/Login/ContainerPage'
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'PageRegister',
  components: {
    BrandInput,
    ContainerRegisterRow,
    ContainerRegisterCard,
    BrandButton,
    RedirectActionsFooter,
    TransitionOpacity,
    ContainerRegisterPage,
  },
  data() {
    return {
      isLoading: false,
      labels: {},
      register: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      formErrors: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  watch: {
    'register.confirmPassword'(newValue, oldValue) {
      this.validateConfirmPassword(newValue)
    },
    'register.password'(newValue, oldValue) {
      this.validatePassword(newValue)
    },
    'register.email'(newValue, oldValue) {
      this.validateEmail(newValue)
    },
    'register.fullName'(newValue, oldValue) {
      this.validateFullName(newValue)
    },
  },
  beforeMount() {
    this.setLabels()
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
      if (this.register.password) {
        if (this.register.password !== value) {
          this.formErrors.confirmPassword = this.labels.confirmPasswordError
          return false
        } else if (this.formErrors.confirmPassword) {
          this.formErrors.confirmPassword = ''
        }
      }
      return true
    },
    validateFullName(value) {
      if (!this.validateEmptyFields('fullName', value)) {
        return false
      }
      if (value.length < 4) {
        this.formErrors.fullName = this.labels.fullNameError
        return false
      }
      if (this.formErrors.fullName) {
        this.formErrors.fullName = ''
      }
      return true
    },
    handleSubmit() {
      const { fullName, email, password, confirmPassword } = this.register
      const validations = [
        this.validateFullName(fullName),
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
        greeting: 'Welcome',
        additionalInfo: 'Fill these steps to create an account',
        emailError: 'Invalid email',
        passwordError: 'Password too short',
        fullNameError: "Full name can't be that short",
        confirmPasswordError: "Passwords don't match",
        emptyField: "Field can't be empty",
        loading: 'Loading your environment',
        register: 'Sign up',
        alreadyHaveAnAccount: 'Already have an account ? Log in',
        placeholders: {
          fullName: 'Enter full name',
          email: 'Enter email',
          password: 'Create password',
          confirmPassword: 'Confirm password',
        },
      }
    },
  },
}
</script>
