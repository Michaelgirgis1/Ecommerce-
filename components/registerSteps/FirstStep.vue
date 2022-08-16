<template>
  <div class="first-step">
    <div class="form" @submit.prevent="submit">
      <v-container>
        <v-row>
          <div v-if="isLoaderShow" class="loader loader--form">
            <Loader />
          </div>
          <v-col cols="12" md="12">
            <div class="form-group">
              <v-text-field
                v-model.trim="firstname"
                type="text"
                name="name"
                maxlength="100"
                label="First Name"
                required
                :class="{
                  hasError: !$v.firstname.required && $v.firstname.$dirty,
                }"
                @input="$v.firstname.$touch"
              />
              <div v-if="$v.firstname.$dirty">
                <div v-if="!$v.firstname.required" class="error">
                  required
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <div class="form-group">
              <v-text-field
                v-model.trim="lastname"
                type="text"
                name="name"
                maxlength="100"
                label="Last Name"
                required
                :class="{
                  hasError: !$v.lastname.required && $v.lastname.$dirty,
                }"
                @input="$v.lastname.$touch"
              />
              <div v-if="$v.lastname.$dirty">
                <div v-if="!$v.lastname.required" class="error">
                  required
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <div class="form-group phone">
              <!-- <vue-tel-input v-model="phone" /> -->
              <client-only>
                <vue-tel-input-vuetify
                  :preferred-countries="['eg', 'gb', 'ua']"
                  :valid-characters-only="true"
                  :class="{ hasError: !$v.phone.required && $v.phone.$dirty }"
                  @input="onInputPhone"
                />
              </client-only>
              <div v-if="$v.phone.$dirty">
                <div v-if="!$v.phone.required" class="error">
                  required
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <div class="form-group">
              <v-text-field
                v-model.trim="email"
                type="text"
                name="name"
                maxlength="100"
                label="Email"
                required
                :class="{ hasError: !$v.email.required && $v.email.$dirty }"
                @input="$v.email.$touch"
              />
              <div v-if="$v.email.$dirty">
                <div v-if="!$v.email.required" class="error">
                  required
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
export default {
  data () {
    return {
      firstname: '',
      email: '',
      lastname: '',
      showDialCode: true,
      isLoaderShow: false,
      country: null,
      countryCode: '',
      phoneData: {
        value: '',
        country: '',
        isValid: false

      },
      phone: '',
      firstStepObject: {
        firstname: '',
        email: '',
        lastname: '',
        phone: ''

      },
      OTP: ''
    }
  },
  validations: {
    firstname: {
      required
    },
    lastname: {
      required
    },
    email: {
      required
    },
    phone: {
      required

    },
    form: ['firstname', 'lastname', 'email', 'phone']
  },
  methods: {
    async validate () {
      await this.$v.form.$touch()
      const isValid = !this.$v.form.$invalid
      if (isValid) {
        this.constructeFirstStepObject()
        await this.validateMobile()
        this.emitFirstStepObject()
        this.updateUserStore()
      }
      return isValid
    },
    constructeFirstStepObject () {
      this.firstStepObject.firstname = this.firstname
      this.firstStepObject.email = this.email
      this.firstStepObject.phone = this.phone
      this.firstStepObject.lastname = this.lastname
    },
    async updateUserStore () {
      await this.$store.commit('SET_EMAIL', this.email)
      await this.$store.commit('SET_OTP', this.OTP)
      await this.$store.commit('SET_MOBILENUMBER', this.phone)
      await this.$store.commit('SET_COUNTRYCODE', this.countryCode)
    },
    onInputPhone (formattedNumber, { number, valid, country }) {
      // this.phone.number = number.input
      if (valid) {
        this.$v.phone.$touch()
        this.phoneData.isValid = valid
        this.phone = number.national.replace(/\s/g, '')
        this.countryCode = country.dialCode
        this.phoneData.country = country && country.name
      }
    },
    countryChanged (country) {
      this.country = '+' + country.dialCode
    },
    async validateEmail () {
      this.isLoaderShow = true
      const formData = new FormData()
      formData.append('email', this.email)
      try {
        await this.$contentInt.$post('user/validateEmail', formData)
        // this.generateOTP()
      } catch (error) {
        this.isLoaderShow = false
      }
    },
    async validateMobile () {
      this.isLoaderShow = true
      const formData = new FormData()
      formData.append('mobileno', this.phone)
      formData.append('country_code', '02')
      try {
        await this.$contentInt.$post('user/validateMobileNumber', formData)
        this.validateEmail()
      } catch (error) {
        this.isLoaderShow = false
      }
    },
    async generateOTP () {
      const formData = new FormData()
      formData.append('mobileno', this.phone)
      formData.append('country_code', this.countryCode)
      formData.append('email', this.email)
      try {
        await this.$contentInt.$post('user/generateOTP', formData)
        this.isLoaderShow = false
      } catch (error) {
        this.isLoaderShow = false
      }
    },
    emitFirstStepObject () {
      const firstStepData = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        custom_attributes: [
          {
            attribute_code: 'phone_number_code',
            value: this.countryCode
          },
          {
            attribute_code: 'phone_number',
            value: this.phone
          }
        ]
      }
      this.$emit('firstStepData', firstStepData)
    }
  }
}
</script>
