<template>
  <div class="third-step">
    <div class="form" @submit.prevent="submit">
      <v-container>
        <v-row>
          <div v-if="isLoaderShow" class="loader loader--form">
            <Loader />
          </div>
          <v-col cols="12" md="12">
            <div class="form-group">
              <v-text-field
                v-model.trim="password"
                type="password"
                name="name"
                maxlength="100"
                label="Password"
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
                  Please insert at least 8 digits
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="12">
            <div class="form-group">
              <v-text-field
                v-model.trim="cofirmPassword"
                type="password"
                name="name"
                maxlength="100"
                label="Confirm password"
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
        </v-row>
      </v-container>
    </div>
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
      password: '',
      cofirmPassword: '',
      isLoaderShow: false
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    cofirmPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    form: ['password', 'cofirmPassword']
  },
  methods: {
    async validate () {
      await this.$v.form.$touch()
      // this.$refs.form.validate()
      const isValid = !this.$v.form.$invalid
      if (isValid) {
        this.$emit('password', this.password)
      }
      return isValid
    }
  }
}
</script>
