<template>
  <div class="cart-item">
    <div class="cart-item__details">
      <h3>{{item.name}}</h3>
      <span class="cart-item__details__price">{{item.price}} EGP</span>
    </div>
    <div class="action-btn">
      <v-btn
        depressed
        @click="removeFromCart(item.sku)"
      >
        Remove From Cart
        <img v-if="isBtnLoaderShow" class="btn-loader" src="/images/btn-loader.gif" alt="" srcset="">
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CartItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isBtnLoaderShow: false
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItems'])
  },
  methods: {
    ...mapActions('cart', ['deleteItemCart']),
    async removeFromCart (sku) {
      await this.deleteItemCart(this.addFlagToItemDetails(this.cartItems, sku))
      this.calcuteTotalPrice(this.cartItems)
    }
  }
}
</script>

<style lang="scss">
.cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 10px 10px 5px #aaaaaa;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 39px;
}
</style>
