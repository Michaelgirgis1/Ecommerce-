import Vue from 'vue'

const mixin = {
  methods: {
    replaceByDefaultImg (event) {
      event.target.src = '/images/default.jpg'
    },
    addFlagToItemDetails (cartItems, sku) {
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].sku === sku) {
          return { isAdd: true, id: cartItems[i].item_id, sku: cartItems[i].sku }
        }
      }
      return { isAdd: false, id: null }
    },
    calcuteTotalPrice (cartItems) {
      let total = 0
      cartItems.forEach((element) => {
        total = total + element.price
      })
      this.$store.commit('cart/setTotalCartPrice', total)
    }
  }
}

Vue.mixin(mixin)
