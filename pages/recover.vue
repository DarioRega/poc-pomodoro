<template>
  <container-recovery-page :has-loader="false">
    <transition-opacity>
      <container-recovery-card
        :greeting="labels.greeting"
        :additional-info="currentAdditionalInfo"
      >
        <container-recovery-row>
          <brand-input
            name="email"
            :placeholder="labels.placeholders.email"
            :value="recoveryEmail"
            :error-text="emailErrorText"
            class="w-full"
            @change="recoveryEmail = $event"
          />
        </container-recovery-row>
        <brand-button
          class="w-full justify-center mt-6"
          :is-loading="isLoading"
          @click="validateRecovery"
        >
          {{ primaryActionLabel }}
        </brand-button>
        <redirect-actions-footer
          class="text-dark-indigo dark:text-light-indigo"
          primary-action-redirect="/login"
          secondary-action-redirect="/register"
          :primary-label="labels.returnToLogin"
          :secondary-label="labels.register"
        />
      </container-recovery-card>
    </transition-opacity>
  </container-recovery-page>
</template>

<script>
import BrandInput from '@/components/Atoms/Inputs/BrandInput'
import ContainerRecoveryRow from '@/components/Templates/Login/ContainerRow'
import TransitionOpacity from '@/components/Atoms/Transitions/TransitionOpacity'
import RedirectActionsFooter from '@/components/Templates/Login/RedirectActionsFooter'
import ContainerRecoveryCard from '@/components/Templates/Login/ContainerCard'
import ContainerRecoveryPage from '@/components/Templates/Login/ContainerPage'
import BrandButton from '@/components/Atoms/BrandButton'

export default {
  name: 'Recovery',
  components: {
    BrandInput,
    ContainerRecoveryRow,
    ContainerRecoveryCard,
    BrandButton,
    RedirectActionsFooter,
    TransitionOpacity,
    ContainerRecoveryPage,
  },
  data() {
    return {
      isLoading: false,
      labels: {},
      recoveryEmail: '',
      emailErrorText: '',
      hasSuccessfullySentRecoveryLink: true,
    }
  },
  computed: {
    primaryActionLabel() {
      return this.hasSuccessfullySentRecoveryLink
        ? this.labels.resendRecoveryLink
        : this.labels.sendRecoveryLink
    },
    currentAdditionalInfo() {
      return this.hasSuccessfullySentRecoveryLink
        ? this.labels.successProcessSendRecoveryLinkTo
        : this.labels.sendRecoveryLinkTo
    },
  },
  beforeMount() {
    this.setLabels()
  },
  methods: {
    handleRecover() {
      this.isLoading = true
      // call axios
      // TODO remove this after axios implementation
      setTimeout(() => {
        this.isLoading = false
      }, 4000)
    },
    validateRecovery() {
      if (this.recoveryEmail) {
        if (this.$regexValidate('email', this.recoveryEmail)) {
          if (this.emailErrorText) {
            this.emailErrorText = ''
          }
          this.handleRecover()
        } else {
          this.emailErrorText = this.labels.emailError
        }
      } else {
        this.emailErrorText = this.labels.emptyField
      }
    },
    // TODO pick theses labels from json files
    setLabels() {
      this.labels = {
        greeting: "Can't log in ?",
        sendRecoveryLinkTo: "We'll send a recovery link to",
        successProcessSendRecoveryLinkTo: 'We sent a recovery link to you at',
        resendRecoveryLink: 'Resend recovery link',
        emailError: 'Invalid email',
        emptyField: "Field can't be empty",
        loading: 'Loading your environment',
        sendRecoveryLink: 'Send recovery link',
        returnToLogin: 'Return to log in',
        register: 'Sign up instead',
        cantLogin: "Can't log in ?",
        placeholders: {
          email: 'Enter email',
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
