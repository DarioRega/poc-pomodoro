<template>
  <container-reset-password-page>
    <error-banner
      v-if="hasErrors"
      :title="errorResponse.title"
      :errors="errorResponse.errors"
    />
    <transition-opacity>
      <container-reset-password-card
        :greeting="$t('Reset my password')"
        :additional-info="$t('Fill these fields and you\'re good to go')"
      >
        <container-reset-password-row class="mb-4">
          <brand-input
            name="email"
            :placeholder="$t('Enter email')"
            :value="login.email"
            :error-text="formErrors.email"
            class="w-full"
            @change.native="login.email = $event.target.value"
          />
        </container-reset-password-row>
        <container-reset-password-row class="mb-4">
          <brand-input
            name="password"
            :placeholder="$t('Set new password')"
            :value="login.password"
            :error-text="formErrors.password"
            input-type="password"
            class="w-full"
            @change.native="login.password = $event.target.value"
          />
        </container-reset-password-row>
        <container-reset-password-row class="mb-4">
          <brand-input
            name="password_confirmation"
            :placeholder="$t('Confirm new password')"
            :value="login.password_confirmation"
            :error-text="formErrors.password_confirmation"
            input-type="password"
            class="w-full"
            @change.native="login.password_confirmation = $event.target.value"
          />
        </container-reset-password-row>
        <brand-button
          class="w-full justify-center mt-2"
          :is-loading="isLoading"
          @click="handleSubmit"
        >
          {{ $t('Continue') }}
        </brand-button>
        <redirect-actions-footer
          class="text-dark-indigo dark:text-light-indigo"
          primary-action-redirect="/login"
          :primary-label="$t('Already have an account ? Log in')"
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
import ErrorBanner from '@/components/Atoms/ErrorBanner'

import { extractErrorValues } from '@/helpers'
import { getCorsPermission } from '@/helpers/cors'

export default {
  name: 'ResetPassword',
  components: {
    BrandInput,
    ContainerResetPasswordRow,
    ContainerResetPasswordCard,
    BrandButton,
    RedirectActionsFooter,
    TransitionOpacity,
    ContainerResetPasswordPage,
    ErrorBanner,
  },
  auth: 'guest',
  data() {
    return {
      hasErrors: false,
      errorResponse: {},
      isLoading: false,
      token: '',
      login: {
        email: '',
        password: '',
        password_confirmation: '',
      },
      formErrors: {
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  watch: {
    'login.password_confirmation'(newValue, oldValue) {
      this.validateConfirmPassword(newValue)
    },
    'login.password'(newValue, oldValue) {
      this.validatePassword(newValue)
    },
    'login.email'(newValue, oldValue) {
      this.validateEmail(newValue)
    },
    'login.name'(newValue, oldValue) {
      this.validateFullName(newValue)
    },
  },
  mounted() {
    const token = this.$route.params.token
    const email = this.$route.query.email
    if (email) {
      this.login.email = email
    }
    if (token) {
      this.token = token
    }
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
      if (this.login.password) {
        if (this.login.password !== value) {
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
    handleDisplayFormError(errors) {
      const errorList = extractErrorValues(errors)

      this.errorResponse = {
        title: this.$t('Error'),
        errors: errorList,
      }
      this.hasErrors = true
    },

    async handleSubmit() {
      const { email, password } = this.login
      // const validations = [
      //   this.validateEmail(email),
      //   this.validatePassword(password),
      //   this.validateConfirmPassword(password_confirmation),
      // ]

      // if (validations.every((x) => x === true)) {
      this.hasErrors = false
      this.isLoading = true
      try {
        await getCorsPermission(this.$axios)
        await this.$axios.post('/reset-password', {
          ...this.login,
          token: this.token,
        })
        await this.$store.dispatch('globalState/createNotification', {
          type: 'success',
          title: this.$t('All done !'),
          description: this.$t('Your password has been reset'),
        })
        await this.$store.dispatch('globalState/login', { email, password })
      } catch (err) {
        this.handleDisplayFormError(err.response.data.errors)
        this.hasErrors = true
      } finally {
        this.isLoading = false
      }
    },
    // },
  },
}
</script>
