<template>
  <div class="header">
    <div class="container">
      <nuxt-link to="/" class="logo">
        <img src="./../static/images/logo-white.png" alt="logo">
      </nuxt-link>
      <div class="links">
        <div class="shopping-cart">
          <button v-b-modal.cart-items>
            <img src="./../static/images/shopping-cart.png" alt="" srcset="">
          </button>
          <span v-if="isAuthenticated && cartAddedItemNum > 0">{{cartAddedItemNum}}</span>
        </div>
        <b-modal id="cart-items" title="Your Cart">
          <Cart :cart-items="cartItems" />
          <div slot="modal-footer" class="">
            <div v-if="isAuthenticated && totalCartPrice != 0" class="modal-footer__price">
              Total : {{totalCartPrice}} EGP
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide('cart-items')">
              Close Me
            </b-button>
          </div>
        </b-modal>
        <nuxt-link v-if="!isAuthenticated" to="/auth/login">
          Log in
        </nuxt-link>
        <button v-else @click="logOut($event)">
          log out
        </button>
        <nuxt-link v-if="!isAuthenticated" to="/auth/register">
          register
        </nuxt-link>
        <nuxt-link v-else to="/profile">
          Profile
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Cart from './Cart.vue'
export default {
  components: {
    Cart
  },
  data () {
    return {
      cartItemsCount: ''
    }
  },
  computed: {
    isAuthenticated () {
      return this.$auth.$state.loggedIn
    },
    ...mapGetters('cart', ['cartItems', 'cartAddedItemNum', 'totalCartPrice'])
  },
  // watch: {
  //   isAuthenticated (oldValue, newValue) {
  //     if (newValue) { this.getCartItems() }
  //   }

  // },
  beforeCreate () {

  },
  mounted () {
    if (this.isAuthenticated) {
      this.$contentToken.setHeader('Authorization', `${this.$auth.strategy.token.get()}`)
      this.getCartItems()
    }
  },
  methods: {
    async logOut (e) {
      e.preventDefault()
      this.$auth.options.redirect = false
      await this.$store.commit('cart/setCartItemsFromApi', [])
      await this.$auth.logout()
    },
    ...mapActions('cart', ['getCartItems']),
    getCartItem () {

    }
  }
}
</script>

<style lang="scss">
.header {
  .links {
    button {
      color: #fff;

  }
 }
}
.links {
    display: flex;
    justify-content: center;
    align-items: center;
    .shopping-cart {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;
      img {
       max-width: 55px;
       margin-right: 7px;
      }
      span {
        color: #fff;
        font-size: 27px;
      }
    }
}
.modal-open {
  .modal {
    overflow: hidden;
    // top: -15px;
  }
}
.modal-dialog {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: auto;
    justify-content: center;
    .modal-content {
      height: calc(100% - 50px);
      overflow-y: hidden;
      overflow-x: hidden;
      .modal-body {
        overflow-y: auto;
      }
    }
    .modal-footer {
      position: sticky;
      bottom: 0;
      background-color: #fff;
    }
   .modal-header {
    position: sticky !important;
    top: 0;
    background: #fff;
    z-index: 99999;
  }
}

</style>
