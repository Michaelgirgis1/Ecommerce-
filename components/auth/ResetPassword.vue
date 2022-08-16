<template>
  <div class="reset-password">
    <h2 class="text-center">
      Reset Password
    </h2>
    <v-container>
      <v-row>
        <Loader v-if="isLoaderShow" />
        <v-col cols="8" md="8">
          <div class="form-group">
            <v-text-field
              v-model.trim="password"
              type="password"
              name="name"
              maxlength="100"
              label="New Password"
              required
              :class="{
                hasError: !$v.password.required && $v.password.$dirty,
              }"
              @input="$v.password.$touch"
            />
            <div v-if="$v.password.$dirty">
              <div v-if="!$v.password.required" class="error">
                required
              </div>
              <div v-if="!$v.password.minLength" class="error">
                please insert at least 8 digits
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="8" md="8">
          <div class="form-group">
            <v-text-field
              v-model.trim="cofirmPassword"
              type="password"
              name="name"
              maxlength="100"
              label="Confirm New Password"
              required
              :class="{
                hasError: !$v.cofirmPassword.required && $v.cofirmPassword.$dirty,
              }"
              @input="$v.cofirmPassword.$touch"
            />
            <div v-if="$v.cofirmPassword.$dirty">
              <div v-if="!$v.cofirmPassword.required" class="error">
                required
              </div>
              <div v-if="!$v.cofirmPassword.sameAsPassword && $v.cofirmPassword.required" class="error">
                not the same
              </div>
            </div>
          </div>
        </v-col>
        <v-col cols="8" md="8">
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
        <v-col cols="8" md="8">
          <!-- :disabled="$v.form.$invalid" -->
          <v-btn
            class="mr-4 d-flex"
            type="submit"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)
export default {
  data () {
    return {
      phone: '',
      password: '',
      countryCode: '',
      cofirmPassword: '',
      isLoaderShow: false,
      invalid: false
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(6)
    },
    cofirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    phone: {
      required

    },
    form: ['password', 'cofirmPassword', 'phone']
  },
  methods: {
    onInputPhone (formattedNumber, { number, valid, country }) {
      // this.phone.number = number.input
      if (valid) {
        this.$v.phone.$touch()
        this.phoneData.isValid = valid
        this.phone = number.national.replace(/\s/g, '')
        this.countryCode = country.dialCode
        // this.phoneData.country = country && country.name
      }
    },
    resetPassword () {

    }
  }
}
</script>

<style lang="scss"></style>
