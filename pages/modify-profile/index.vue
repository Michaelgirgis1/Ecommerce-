<template>
  <div class="profile-edit">
    <h2>profile edit</h2>
    <div class="form" @submit.prevent="submit">
      <v-container>
        <v-row>
          <Loader v-if="isLoaderShow" />
          <v-col cols="12" md="12">
            <div class="form-group">
              <v-text-field
                v-model.trim="firstname"
                type="text"
                class="form-control"
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
                class="form-control"
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
        </v-row>
        <v-btn
          class="mr-4 d-flex"
          type="submit"
          :disabled="invalid"
          @click="submitData()"
        >
          submit
        </v-btn>
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
  middleware: 'auth-guard',
  data () {
    return {
      firstname: this.$auth.$state.user.firstname,
      lastname: this.$auth.$state.user.lastname,
      isLoaderShow: false,
      invalid: false
    }
  },
  validations: {
    firstname: {
      required
    },
    lastname: {
      required
    },
    form: ['firstname', 'lastname']
  },
  mounted () {},
  methods: {
    async submitData () {
      await this.$v.form.$touch()
      const isValid = !this.$v.form.$invalid
      const formData = this.constructProfileData()
      if (isValid) {
        this.isLoaderShow = true
        try {
          const response = await this.$contentInt.$put('customers/me', formData)
          // this.generateOTP()
          // this.$auth.$storage.setUniversal('user', formData, true)
          this.$auth.setUser(response)
          this.isLoaderShow = false
          this.$router.push('/profile')
        } catch (error) {
          this.isLoaderShow = false
        }
      }
    },
    constructProfileData () {
      const data = {
        customer: {
          email: this.$auth.user.email,
          firstname: this.firstname,
          lastname: this.lastname,
          custom_attributes: [
            {
              attribute_code: 'phone_number_code',
              value: this.$auth.user.custom_attributes[0].value
            },
            {
              attribute_code: 'phone_number',
              value: this.$auth.user.custom_attributes[1].value
            }
          ]
        }
      }
      return data
    }
  }
}
</script>
