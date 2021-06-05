<template>
  <container-recovery-page :has-loader="false">
    <transition-opacity>
      <container-recovery-card
        :greeting="$t('Can\'t log in ?')"
        :additional-info="currentAdditionalInfo"
      >
        <container-recovery-row>
          <brand-input
            name="email"
            :placeholder="$t('Enter email')"
            :value="recoveryEmail"
            :error-text="emailErrorText"
            class="w-full"
            @change.native="recoveryEmail = $event.target.value"
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
          :primary-label="$t('Return to login')"
          :secondary-label="$t('Sign up instead')"
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
  name: 'PageRecover',
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
      recoveryEmail: '',
      emailErrorText: '',
      hasSuccessfullySentRecoveryLink: true,
    }
  },
  computed: {
    primaryActionLabel() {
      return this.hasSuccessfullySentRecoveryLink
        ? this.$t('Resend recovery link')
        : this.$t('Send recovery link')
    },
    currentAdditionalInfo() {
      return this.hasSuccessfullySentRecoveryLink
        ? this.$t('We went a recovery link to you at')
        : this.$t("We'll send a recovery link to")
    },
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
          this.emailErrorText = this.$t('Invalid email')
        }
      } else {
        this.emailErrorText = this.$t("Field can't be empty")
      }
    },
  },
}
</script>
