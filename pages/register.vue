<template>
  <container-register-page class="relative">
    <error-banner
      v-if="hasErrors"
      :title="errorResponse.title"
      :errors="errorResponse.errors"
    />
    <transition-opacity>
      <container-register-card
        :greeting="$t('Welcome')"
        :additional-info="$t('Fill these steps to create an account')"
      >
        <container-register-row class="mb-4 mt-2">
          <brand-input
            name="name"
            :placeholder="$t('Enter full name')"
            :value="register.name"
            :error-text="formErrors.name"
            class="w-full"
            @change.native="register.name = $event.target.value"
          />
        </container-register-row>
        <container-register-row class="mb-4">
          <brand-input
            name="email"
            :placeholder="$t('Enter email')"
            :value="register.email"
            :error-text="formErrors.email"
            class="w-full"
            @change.native="register.email = $event.target.value"
          />
        </container-register-row>
        <container-register-row class="mb-4">
          <brand-input
            name="password"
            :placeholder="$t('Create password')"
            :value="register.password"
            :error-text="formErrors.password"
            input-type="password"
            class="w-full"
            @change.native="register.password = $event.target.value"
          />
        </container-register-row>
        <container-register-row class="mb-4">
          <brand-input
            name="password_confirmation"
            :placeholder="$t('Confirm password')"
            :value="register.password_confirmation"
            :error-text="formErrors.password_confirmation"
            input-type="password"
            class="w-full"
            @change.native="
              register.password_confirmation = $event.target.value
            "
          />
        </container-register-row>
        <brand-button
          class="w-full justify-center mt-2"
          :is-loading="isLoading"
          @click="handleSubmit"
        >
          {{ $t('Sign up') }}
        </brand-button>
        <redirect-actions-footer
          class="text-dark-indigo dark:text-light-indigo"
          primary-action-redirect="/login"
          :primary-label="$t('Already have an account ? Log in')"
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
import { getCorsPermission } from '@/helpers/cors'
import ErrorBanner from '@/components/Atoms/ErrorBanner'
import { extractErrorValues } from '@/helpers'

export default {
  name: 'Register',
  components: {
    BrandInput,
    ContainerRegisterRow,
    ContainerRegisterCard,
    BrandButton,
    RedirectActionsFooter,
    TransitionOpacity,
    ContainerRegisterPage,
    ErrorBanner,
  },
  data() {
    return {
      hasErrors: false,
      errorResponse: {},
      isLoading: false,
      register: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      formErrors: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  watch: {
    'register.password_confirmation'(newValue, oldValue) {
      this.validateConfirmPassword(newValue)
    },
    'register.password'(newValue, oldValue) {
      this.validatePassword(newValue)
    },
    'register.email'(newValue, oldValue) {
      this.validateEmail(newValue)
    },
    'register.name'(newValue, oldValue) {
      this.validateFullName(newValue)
    },
  },
  methods: {
    validateEmptyFields(property, value) {
      if (!value) {
        this.formErrors[property] = this.$t("Field can't be empty")
        return false
      }
      return true
    },
    validateEmail(value) {
      if (!this.validateEmptyFields('email', value)) {
        return false
      }
      if (!this.$regexValidate('email', value)) {
        this.formErrors.email = this.$t('Invalid email')
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
        this.formErrors.password = this.$t('Password too short')
        return false
      }
      if (this.formErrors.password) {
        this.formErrors.password = ''
      }
      return true
    },
    validateConfirmPassword(value) {
      if (!this.validateEmptyFields('password_confirmation', value)) {
        return false
      }
      if (this.register.password) {
        if (this.register.password !== value) {
          this.formErrors.password_confirmation = this.$t(
            "Passwords don't match"
          )
          return false
        } else if (this.formErrors.password_confirmation) {
          this.formErrors.password_confirmation = ''
        }
      }
      return true
    },
    validateFullName(value) {
      if (!this.validateEmptyFields('name', value)) {
        return false
      }
      if (value.length < 4) {
        this.formErrors.name = this.$t("Full name can't be that short")
        return false
      }
      if (this.formErrors.name) {
        this.formErrors.name = ''
      }
      return true
    },
    handleDisplayFormError(errors) {
      const errorList = extractErrorValues(errors)

      this.errorResponse = {
        title: this.$t('Error'),
        errors: errorList,
      }
      this.hasErrors = true
    },
    async handleSubmit() {
      this.hasErrors = false

      const { name, email, password, password_confirmation } = this.register
      const validations = [
        this.validateFullName(name),
        this.validateEmail(email),
        this.validatePassword(password),
        this.validateConfirmPassword(password_confirmation),
      ]

      if (validations.every((x) => x === true)) {
        this.isLoading = true

        await getCorsPermission(this.$axios)
        try {
          await this.$axios.post(`/register`, this.register)
          await this.login(email, password)
        } catch (err) {
          this.handleDisplayFormError(err.response.data.errors)
          this.isLoading = false
        }
      }
    },
    async login(email, password) {
      try {
        await this.$store.dispatch('globalState/login', {
          email,
          password,
        })
      } catch (err) {
        this.errorResponse = {
          title: this.$t('Error'),
          errors: err.response.data.message,
        }
        this.hasErrors = true
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>
