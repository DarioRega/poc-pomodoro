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
      <div class="settings-panel__configurations--account-tab">
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
      <div class="settings-panel__configurations--account-tab">
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
      <div class="settings-panel__configurations--account-tab">
        <brand-input
          name="password"
          :error-text="errors.current_password"
          input-type="password"
          :value="localValues.current_password"
          @change.native="localValues.current_password = $event.target.value"
        />
        <brand-input
          class="my-14"
          :value="localValues.password"
          name="password"
          :placeholder="$t('New password')"
          :error-text="errors.password"
          input-type="password"
          @change.native="localValues.password = $event.target.value"
        />
        <brand-input
          class="my-14"
          :value="localValues.password_confirmation"
          name="password"
          :placeholder="$t('Confirm new password')"
          :error-text="errors.password_confirmation"
          input-type="password"
          @change.native="
            localValues.password_confirmation = $event.target.value
          "
        />
        <div class="settings-panel__actions">
          <brand-button
            :is-loading="onGoingActions.includes('current_password')"
            :is-disabled="onGoingActions.includes('current_password')"
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
        current_password: '',
        password: '',
      },
      errors: {
        name: '',
        email: '',
        current_password: '',
        password_confirmation: '',
        password: '',
      },
    }
  },
  mounted() {
    const { name, email } = this.values
    // security, we don't display current_password in input
    this.localValues = {
      name,
      email,
      current_password: '----------',
      password: '',
      password_confirmation: '',
    }
  },
  methods: {
    ...mapActions({
      updateUserProfileInformation: 'user/updateUserProfileInformation',
      updateUserPassword: 'user/updateUserPassword',
    }),
    /*
      Loading handlers
    */
    setLoadingOnProperty(fieldProperty) {
      this.onGoingActions.push(fieldProperty)
    },
    removeLoadingOnProperty(fieldProperty) {
      this.onGoingActions = this.onGoingActions.filter(
        (x) => x !== fieldProperty
      )
    },

    /*
      Properties handlers
    */
    async handleChangeName() {
      const error = await this.handleUpdateUserProfileInformation('name')

      if (error) {
        this.errors.email = error.name[0]
      }
    },

    async handleChangeEmail() {
      const error = await this.handleUpdateUserProfileInformation('email')

      if (error) {
        this.errors.email = error.email[0]
      }
    },

    async handleChangePassword() {
      const error = await this.handleUpdatePassword()
      if (error) {
        if (error.current_password) {
          this.errors.current_password = error.current_password[0]
        }
        if (error.password) {
          if (error.password[0].includes('confirmation')) {
            this.errors.password = error.password[0]
            this.errors.password_confirmation = error.password[0]
          } else {
            this.errors.password = error.password[0]
          }
        }
      }
    },

    /*
      Actions dispatch to update profile & password
     */
    async handleUpdateUserProfileInformation(targetProperty) {
      this.errors = {
        ...this.errors,
        [targetProperty]: '',
      }

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

    async handleUpdatePassword() {
      this.errors = {
        ...this.errors,
        current_password: '',
        password: '',
        password_confirmation: '',
      }
      this.setLoadingOnProperty('current_password')

      const { current_password, password, password_confirmation } =
        this.localValues
      const response = await this.updateUserPassword({
        current_password,
        password,
        password_confirmation,
      })

      this.removeLoadingOnProperty('current_password')
      if (response) {
        if (response.data) return response.data.errors
      }
    },
  },
}
</script>
