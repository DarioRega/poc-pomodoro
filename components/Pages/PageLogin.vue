<template>
  <container-login-page :is-loading="isLoading" :loading-label="labels.loading">
    <transition-opacity>
      <container-login-card
        v-show="!isLoading"
        :greeting="labels.greeting"
        :additional-info="currentStep.stepLabel"
      >
        <container-login-row>
          <brand-input
            name="email"
            :placeholder="labels.placeholders.email"
            :value="login.email"
            :error-text="emailErrorText"
            class="w-full"
            @change="login.email = $event"
          />
        </container-login-row>
        <transition-translate-y duration-amount="500">
          <container-login-row v-show="currentStep.name === 'password'">
            <brand-input
              name="password"
              class="flex-1"
              input-type="password"
              :placeholder="labels.placeholders.password"
              :value="login.password"
              :error-text="passwordErrorText"
              @change="login.password = $event"
            />
          </container-login-row>
        </transition-translate-y>
        <brand-button
          class="w-full justify-center mt-6"
          @click="handleNextStep"
        >
          {{ primaryActionLabel }}
        </brand-button>
        <redirect-actions-footer
          class="text-dark-indigo dark:text-light-indigo"
          :primary-label="labels.cantLogin"
          primary-action-redirect="/recover"
          secondary-action-redirect="/register"
          :secondary-label="labels.register"
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
  },
  data() {
    return {
      isLoading: false,
      currentStep: {
        name: 'email',
        stepLabel: '',
        stepLostLabel: '',
      },
      labels: {},
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
        ? this.labels.continue
        : this.labels.login
    },
  },
  beforeMount() {
    this.setLabels()
  },
  methods: {
    handleLogin() {
      if (!this.login.password) {
        this.passwordErrorText = this.labels.emptyField
      } else {
        if (this.passwordErrorText) {
          this.passwordErrorText = ''
        }
        this.isLoading = true
        // TODO dispatch login
      }
    },
    handleLostClick() {
      if (this.currentStep.name === 'email') {
        this.$emit('onLostEmail')
      }
      if (this.currentStep.name === 'password') {
        this.$emit('onLostPassword')
      }
    },
    handleNextStep() {
      if (this.login.email) {
        if (this.$regexValidate('email', this.login.email)) {
          if (this.emailErrorText) {
            this.emailErrorText = ''
          }
          this.currentStep = {
            name: 'password',
            stepLabel: this.labels.password,
            stepLostLabel: this.labels.lostPassword,
          }
        } else {
          this.emailErrorText = this.labels.emailError
        }
      } else {
        this.emailErrorText = this.labels.emptyField
      }
    },
    handleIconClick() {
      if (this.currentStep.name === 'email') {
        this.handleNextStep()
      } else {
        this.handleLogin()
      }
    },
    // TODO pick theses labels from json files
    setLabels() {
      this.labels = {
        greeting: 'Welcome back',
        email: 'Enter your email to continue',
        password: 'Enter your password to log in',
        lostEmail: 'I lost my email',
        lostPassword: 'I lost my password',
        emailError: 'Invalid email',
        emptyField: "Field can't be empty",
        loading: 'Loading your environment',
        continue: 'Continue',
        login: 'Log In',
        register: 'Sign up instead',
        cantLogin: "Can't log in ?",
        placeholders: {
          email: 'Email',
          password: 'Password',
        },
      }
      this.setCurrentStepLabels()
    },
    setCurrentStepLabels() {
      this.currentStep = {
        ...this.currentStep,
        stepLabel: this.labels.email,
        stepLostLabel: this.labels.lostEmail,
      }
    },
  },
}
</script>
