<template>
  <container-login-page>
    <error-banner
      v-if="hasErrors"
      :title="errorResponse.title"
      :errors="errorResponse.errors"
    />
    <transition-opacity>
      <container-login-card
        :greeting="$t('Welcome back')"
        :additional-info="currentStep.stepLabel"
      >
        <container-login-row class="mb-4">
          <brand-input
            name="email"
            :placeholder="$t('Enter email')"
            :value="login.email"
            :error-text="emailErrorText"
            class="w-full"
            @change.native="login.email = $event.target.value"
          />
        </container-login-row>
        <transition-translate-y duration-amount="500">
          <container-login-row
            v-show="currentStep.name === 'password'"
            class="mb-4"
          >
            <brand-input
              name="password"
              class="flex-1"
              input-type="password"
              :placeholder="$t('Enter password')"
              :value="login.password"
              :error-text="passwordErrorText"
              @change.native="login.password = $event.target.value"
            />
          </container-login-row>
        </transition-translate-y>
        <brand-button
          class="w-full justify-center mt-6"
          :is-loading="isLoading"
          :is-disabled="isLoading"
          @click="handleNextStep"
        >
          {{ primaryActionLabel }}
        </brand-button>
        <redirect-actions-footer
          class="text-dark-indigo dark:text-light-indigo"
          :primary-label="$t('Can\'t log in ?')"
          primary-action-redirect="/recover"
          secondary-action-redirect="/register"
          :secondary-label="$t('Sign up instead')"
        />
      </container-login-card>
    </transition-opacity>
  </container-login-page>
</template>

<script>
import BrandInput from '@/components/Atoms/Inputs/BrandInput'
import ContainerLoginRow from '@/components/Templates/Login/ContainerRow'
import TransitionOpacity from '@/components/Atoms/Transitions/TransitionOpacity'
import TransitionTranslateY from '@/components/Atoms/Transitions/TransitionTranslateY'
import RedirectActionsFooter from '@/components/Templates/Login/RedirectActionsFooter'
import ContainerLoginCard from '@/components/Templates/Login/ContainerCard'
import ContainerLoginPage from '@/components/Templates/Login/ContainerPage'
import BrandButton from '@/components/Atoms/BrandButton'
import ErrorBanner from '@/components/Atoms/ErrorBanner'
import { extractErrorValues } from '@/helpers'

export default {
  name: 'Login',
  components: {
    BrandInput,
    ContainerLoginRow,
    ContainerLoginCard,
    BrandButton,
    RedirectActionsFooter,
    TransitionOpacity,
    TransitionTranslateY,
    ContainerLoginPage,
    ErrorBanner,
  },
  middleware: 'auth',
  auth: 'guest',
  data() {
    return {
      hasErrors: false,
      errorResponse: {},
      isLoading: false,
      currentStep: {
        name: 'email',
        stepLabel: '',
        stepLostLabel: '',
      },
      login: {
        email: '',
        password: '',
      },
      emailErrorText: '',
      passwordErrorText: '',
    }
  },
  computed: {
    primaryActionLabel() {
      return this.currentStep.name === 'email'
        ? this.$t('Continue')
        : this.$t('Log in')
    },
  },
  mounted() {
    this.setInitialStep()
  },
  methods: {
    async handleLogin() {
      this.hasErrors = false
      if (!this.login.password) {
        this.passwordErrorText = this.$t("Field can't be empty")
      } else {
        if (this.passwordErrorText) {
          this.passwordErrorText = ''
        }
        this.isLoading = true
        try {
          await this.$store.dispatch('globalState/login', this.login)
        } catch (err) {
          this.handleDisplayFormError(err.response.data.errors)
          this.hasErrors = true
        } finally {
          this.isLoading = false
        }
      }
    },
    handleDisplayFormError(errors) {
      const errorList = extractErrorValues(errors)

      this.errorResponse = {
        title: this.$t('Error'),
        errors: errorList,
      }
      this.hasErrors = true
    },
    handleLostClick() {
      if (this.currentStep.name === 'email') {
        this.$emit('onLostEmail')
      }
      if (this.currentStep.name === 'password') {
        this.$emit('onLostPassword')
      }
    },
    validateEmptyFields(value) {
      return value.length > 0
    },
    handleNextStep() {
      if (!this.validateEmptyFields('email', this.login.email)) {
        this.emailErrorText = this.$t("Field can't be empty")
      }

      if (this.$regexValidate('email', this.login.email)) {
        if (this.emailErrorText) {
          this.emailErrorText = ''
        }
        if (this.currentStep.name === 'password') {
          this.handleLogin()
        } else {
          this.currentStep = {
            name: 'password',
            stepLabel: this.$t('Enter your password to login'),
            stepLostLabel: this.$t('I lost my password'),
          }
        }
      } else {
        this.emailErrorText = this.$t('Invalid email')
      }
    },
    setInitialStep() {
      this.currentStep = {
        ...this.currentStep,
        stepLabel: this.$t('Enter your email to continue'),
        stepLostLabel: this.$t('I lost my email'),
      }
    },
  },
}
</script>
