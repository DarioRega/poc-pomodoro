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
          :error-text="errors.name"
          :value="localValues.name"
          @change.native="localValues.name = $event.target.value"
        />
        <div class="settings-panel__actions">
          <brand-button
            :is-loading="onGoingActions.includes('name')"
            :is-disabled="onGoingActions.includes('name')"
            @click="handleChangeName"
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
          :value="localValues.password_confirmation"
          name="password"
          :placeholder="$t('Confirm password')"
          :error-text="errors.password_confirmation"
          input-type="password"
          @change.native="
            localValues.password_confirmation = $event.target.value
          "
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
import { mapActions } from 'vuex'

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
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
    }
  },
  computed: {
    allowSave() {
      return {
        name: this.values.name !== this.localValues.name,
        email: this.values.email !== this.localValues.email,
        password:
          this.localValues.password === this.localValues.password_confirmation,
      }
    },
  },
  mounted() {
    const { name, email } = this.values
    // security, we don't display password in input
    this.localValues = {
      name,
      email,
      password: '----------',
      password_confirmation: '',
    }
  },
  methods: {
    ...mapActions({
      updateUserProfileInformation: 'user/updateUserProfileInformation',
    }),
    validateEmptyFields(fieldProperty) {
      if (!this.localValues.name) {
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
      this.onGoingActions = this.onGoingActions.filter(
        (x) => x !== fieldProperty
      )
    },
    async handleChangeName() {
      const targetProperty = 'name'
      if (this.validateEmptyFields(targetProperty)) {
        if (this.validateChange(targetProperty)) {
          const error = await this.handleUpdateUserProfileInformation(
            targetProperty
          )

          if (error) {
            this.errors.email = error.name[0]
          }
        }
      }
    },
    async handleChangeEmail() {
      const targetProperty = 'email'
      if (this.validateEmptyFields(targetProperty)) {
        if (this.validateChange(targetProperty)) {
          if (!this.$regexValidate('email', this.localValues.email)) {
            this.errors.email = this.$t('Invalid email')
          } else {
            const error = await this.handleUpdateUserProfileInformation(
              targetProperty
            )

            if (error) {
              this.errors.email = error.email[0]
            }
          }
        }
      }
    },
    handleChangePassword() {
      const fieldProperty = 'password'
      let hasError = false
      if (this.validateEmptyFields(fieldProperty)) {
        if (
          this.localValues.password !== this.localValues.password_confirmation
        ) {
          this.errors.password_confirmation = this.$t('Passwords are different')
          hasError = true
        }
        if (this.localValues.password.length < 8) {
          this.errors.password = this.$t('Password too short')
          hasError = true
        }
        if (!hasError) {
          this.errors = {
            ...this.errors,
            password: '',
            password_confirmation: '',
          }
          this.setLoadingOnProperty(fieldProperty)
          this.updateUserProperty(fieldProperty, {
            password: this.localValues.password,
            password_confirmation: this.localValues.password_confirmation,
          })
        }
      }
    },

    async handleUpdateUserProfileInformation(targetProperty) {
      this.setLoadingOnProperty(targetProperty)

      const { name, email } = this.localValues
      const response = await this.updateUserProfileInformation({
        name,
        email,
      })

      this.removeLoadingOnProperty(targetProperty)
      if (response) {
        if (response.data) return response.data.errors
      }
    },
  },
}
</script>
