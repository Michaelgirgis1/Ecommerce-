<template>
  <div class="sign-in">
    <div class="log-in-form">
      <v-row class="section-center" @submit.prevent="login()">
        <v-col cols="8" md="8">
          <div v-if="isLoaderShow" class="loader loader--form">
            <Loader />
          </div>
          <v-form ref="logInForm" lazy-validation>
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
            <div class="form-group">
              <v-text-field
                v-model="password"
                required
                label="Password"
                type="password"
                name="name"
                maxlength="100"
                :class="{ hasError: !$v.password.required && $v.password.$dirty }"
                @input="$v.password.$touch"
              />
              <div v-if="$v.password.$dirty">
                <div v-if="!$v.password.required" class="error">
                  required
                </div>
              </div>
            </div>
            <nuxt-link v-if="!isAuthenticated" class="register-btn" to="/auth/register">
              register
            </nuxt-link>
            <nuxt-link v-if="!isAuthenticated" class="reset-btn" to="/auth/reset-password">
              Forgot password
            </nuxt-link>
            <v-btn
              class="mr-4 d-flex"
              type="submit"
              :disabled="invalid"
            >
              submit
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import Loader from '../Loader.vue'
Vue.use(Vuelidate)
// const strategy = 'local'
export default {
  name: 'SignIn',
  components: {
    Loader
  },
  data () {
    return {
      password: '',
      email: '',
      invalid: false,
      isFormValid: false,
      isLoaderShow: false
    }
  },
  computed: {
    isAuthenticated () {
      return this.$auth.$state.loggedIn
    },
    ...mapGetters('cart', ['addToCartPath', 'isAddToCartRoute', 'cartId']),
    ...mapGetters('services', ['servicesDetails'])

  },
  validations: {
    email: {
      required
    },
    password: {
      required
    },
    form: ['email', 'password']
  },
  mounted () {
  },
  methods: {
    async submit () {
      await this.$v.form.$touch()
      this.isFormValid = !this.$v.form.$invalid
      return this.isFormValid
    },
    async login () {
      const isValid = await this.submit()
      if (isValid) {
        this.isLoaderShow = true
        const loginData = {
          username: this.email,
          password: this.password
        }
        await this.$auth.loginWith('local', {
          data: loginData
        })
        this.$auth.options.redirect = false
        this.$contentToken.setHeader('Authorization', `${this.$auth.strategy.token.get()}`)
        if (this.isAddToCartRoute === true) {
          await this.initiateCart()
          // this.addToCustomerCart(this.constructItemAddObject(this.servicesDetails.sku))
          this.getCartItems()
          this.$router.push(this.addToCartPath)
          this.$store.commit('cart/setIsAddToCartRoute', false)
          this.$store.commit('cart/setAddToCartPath', '/')
          this.isLoaderShow = false
        } else {
          this.$store.commit('cart/setIsAddToCartRoute', false)
          this.isLoaderShow = false
          this.getCartItems()
          this.$router.push('/')
        }
      }
    },
    constructItemAddObject (sku) {
      return {
        cartItem: {
          sku: `${sku}`,
          qty: 1,
          quote_id: `${this.cartId}`,
          product_option: {
            extension_attributes: {
              custom_options: [
                {
                  option_id: 'rms_date',
                  option_value: '2022-06-25'
                },
                {
                  option_id: 'rms_start_time',
                  option_value: '09:00:00'
                },
                {
                  option_id: 'rms_end_time',
                  option_value: '11:00:00'
                }
              ]
            }
          },
          extension_attributes: {}
        }
      }
    },
    ...mapActions('cart', ['initiateCart', 'getCartItems', 'addToCustomerCart'])
  }
}
</script>
