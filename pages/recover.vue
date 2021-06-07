<template>
  <container-recovery-page>
    <error-banner
      v-if="hasErrors"
      :title="errorResponse.title"
      :errors="errorResponse.errors"
    />
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
import ErrorBanner from '@/components/Atoms/ErrorBanner'

import { getCorsPermission } from '@/helpers/cors'
import { extractErrorValues } from '@/helpers'

export default {
  name: 'Recover',
  components: {
    BrandInput,
    ContainerRecoveryRow,
    ContainerRecoveryCard,
    BrandButton,
    RedirectActionsFooter,
    TransitionOpacity,
    ContainerRecoveryPage,
    ErrorBanner,
  },
  data() {
    return {
      hasErrors: false,
      errorResponse: {},
      isLoading: false,
      recoveryEmail: '',
      emailErrorText: '',
      hasSuccessfullySentRecoveryLink: false,
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
    async handleRecover() {
      this.isLoading = true
      try {
        await getCorsPermission(this.$axios)
        await this.$axios.post('/forgot-password', {
          email: this.recoveryEmail,
        })
        await this.$store.dispatch('globalState/createNotification', {
          type: 'success',
          title: this.$t('All done !'),
          description: this.$t('Recovery link successfully sent'),
        })
        this.hasSuccessfullySentRecoveryLink = true
      } catch (err) {
        this.handleDisplayFormError(err.response.data.errors)
        this.hasErrors = true
      } finally {
        this.isLoading = false
      }
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
    handleDisplayFormError(errors) {
      const errorList = extractErrorValues(errors)

      this.errorResponse = {
        title: this.$t('Error'),
        errors: errorList,
      }
      this.hasErrors = true
    },
  },
}
</script>
