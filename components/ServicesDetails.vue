/* eslint-disable vue/order-in-components */
<template>
  <div class="services-details">
    <!-- :src="'http://dev.magento.com/media/catalog/product'+ `${servicesDetails.custom_attributes[2].value}`" -->
    <!-- <h1>btn blag:{{servicesDetails.isAddToCart}}</h1> -->
    <b-row>
      <b-col col lg="6">
        <div class="services-details__image">
          <img :src="'http://dev.magento.com/media/catalog/product'+ `${servicesDetails.custom_attributes[2].value}`" alt="" srcset="" @error="replaceByDefaultImg($event)">
        </div>
      </b-col>
      <b-col col lg="6">
        <h3>{{servicesDetails.name}}</h3>
        <p>{{servicesDetails.price}} EGP</p>
        <div v-if="servicesDetails.isAddToCart != null" class="btns">
          <div
            v-if="isShowAddBtn"
            class="add-to-cart"
            :class="[
              servicesDetails.isAddToCart ? 'remove-to-cart' : '',
              isShowAddBtn ? 'show-btn': ''
            ]"
          >
            <v-btn
              depressed
              color="primary"
              @click=" servicesDetails.isAddToCart ? removeFromCart($event) : addToCart($event)"
            >
              {{servicesDetails.isAddToCart ? 'Remove from cart' : 'Add to cart'}}
              <img v-if="isBtnLoaderShow" class="btn-loader" src="/images/btn-loader.gif" alt="" srcset="">
            </v-btn>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'ServiceDetailsCard',
  props: {
    servicesDetails: {
      type: Object,
      default: () => {}
    },
    showActionElement: {
      type: Boolean,
      default: null
    },
    itemAddedDetails: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      sku: this.$route.params.sku.replace('sku=', ''),
      isShowAddBtn: false,
      isBtnLoaderShow: false
    }
  },
  computed: {
    isAuthenticated () {
      return this.$auth.$state.loggedIn
    },
    ...mapGetters('cart', ['cartItems', 'cartId'])

  },
  watch: {
    cartItems (newValue) {
      // console.log('cart items', newValue)
    }
  },

  mounted () {
    if (this.cartItems.length > 0) {
      const itemAddedDetails = this.addFlagToItemDetails(this.cartItems, this.sku)
      this.$store.commit('services/setServiceCartFlag', itemAddedDetails)
      this.$emit('addDetails', itemAddedDetails)
    }
    setTimeout(() => {
      this.isShowAddBtn = true
    }, 400)
  },
  methods: {
    ...mapActions('cart', ['initiateCart', 'addToCustomerCart', 'deleteItemCart']),
    async addToCart (e) {
      e.preventDefault()
      this.isBtnLoaderShow = true
      this.$store.commit('cart/setIsAddToCartRoute', true)
      this.$store.commit('cart/setAddToCartPath', `/services/services-details/sku=${this.servicesDetails.sku}?id=${this.servicesDetails.id}`)
      if (!this.isAuthenticated) {
        this.$router.push('/auth/login')
      } else {
        if (!this.cartId) {
          await this.initiateCart()
        }
        await this.addToCustomerCart(this.constructItemAddObject(this.servicesDetails.sku))
        this.isBtnLoaderShow = false
        this.$emit('addDetails', this.addFlagToItemDetails(this.cartItems, this.sku))
      }
    },
    async removeFromCart (e) {
      this.isBtnLoaderShow = true
      await this.deleteItemCart(this.itemAddedDetails)
      this.isBtnLoaderShow = false
      // await this.$store.commit('cart/setRemoveFromCart', this.servicesDetails.sku)
    },
    constructItemAddObject (sku) {
      return {
        cartItem: {
          sku: `${sku}`,
          qty: 1,
          quote_id: `${this.cartId}`,
          name: `${this.servicesDetails.name}`,
          price: `${this.servicesDetails.price}`,
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
    }
    // addFlagToItemDetails (sku) {
    //   if (!this.isAuthenticated) { return false }
    //   this.cartItems.forEach((element) => {
    //     if (element.sku === sku) {
    //       return element.isAddedToCart
    //     }
    //   })
    //   return true
    // }
  }
}
</script>
<style lang="scss">
  .services-details {
    img {
      max-width: 100%;
    }
    .v-btn  {
      height: auto !important;
      padding: 10px 42px !important;
      font-size: 20px;
      transition: all 0.5s ease;
    }
    .remove-to-cart {
      .v-btn  {
        background-color: #6d849b !important;
      }
    }
    .show-btn {
      button {
        opacity: 0;
      }
    }
    .add-to-cart {
      button {
        transition: all 0.5s ease;
        opacity: 1;
      }
    }
  }
</style>
