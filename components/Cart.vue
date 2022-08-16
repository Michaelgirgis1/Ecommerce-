<template>
  <div class="cart-container">
    <div v-if="cartItems.length > 0" class="cart__content">
      <div v-for="item in cartItems" :key="item.item_id" class="cart__content__item">
        <CartItem :item="item" />
      </div>
    </div>
    <div v-else class="cart__empty">
      <img src="/images/cart-image.jpg" alt="" srcset="">
      <p class="my-4">
        Your Cart is empty
      </p>
      <p>
        Be sure to fill your cart with something you like
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartItems: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.calcuteTotalPrice(this.cartItems)
  },
  methods: {
  }
}
</script>

<style lang="scss">
#cart-items{
  padding: 0 !important;
}
.cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    max-height: 280px;
  }
}
.modal-dialog {
  max-width: 60%;
}
.cart__content {
  width: 100%;
  .cart__content__item {
    // box-shadow: 10px 10px 5px #0a0a0a1a, 0 0 0 1px #00000105;
  }
}
</style>
