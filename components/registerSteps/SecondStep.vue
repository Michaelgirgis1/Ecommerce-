<template>
  <div class="second-step">
    <v-form>
      <v-container>
        <v-row>
          <div v-if="isLoaderShow" class="loader loader--form">
            <Loader />
          </div>
          <v-col cols="12" md="12">
            <div class="form-group">
              <v-otp-input
                v-model.trim="OTPValue"
                label="OTP"
                length="6"
                type="number"
              />
              <div v-if="$v.OTPValue.$dirty">
                <div v-if="!$v.OTPValue.required" class="error">
                  required
                </div>
                <div v-if="$v.OTPValue.required && !$v.OTPValue.minLength" class="error">
                  required
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
export default {
  data () {
    return {
      OTPValue: '',
      isLoaderShow: false,
      OTP: '',
      mobileNum: '',
      countryCode: ''
    }
  },
  validations: {
    OTPValue: {
      required,
      minLength: minLength(6)
    },
    form: ['OTPValue']
  },
  methods: {
    async validate () {
      await this.$v.form.$touch()
      // this.$refs.form.validate()
      const isValid = !this.$v.form.$invalid
      if (isValid) {
        this.getUserData()
        await this.verifyOTP()
      }
      return isValid
    },
    async verifyOTP () {
      this.isLoaderShow = true
      const formData = new FormData()
      formData.append('OTP', this.OTPValue)
      formData.append('mobileno', this.mobileNum)
      formData.append('country_code', this.OTP)
      try {
        await this.$contentInt.$post('user/verifyOTP', formData)
        // this.generateOTP()
      } catch (error) {
        this.isLoaderShow = false
      }
    },
    getUserData () {
      this.OTP = this.$store.getters.OTP
      this.mobileNum = this.$store.getters.mobileNumber
      this.countryCode = this.$store.getters.countryCode
    }

  }
}
</script>
