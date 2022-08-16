export default function state () {
  return {
    cartId: null,
    cartItems: [],
    isAddToCartRoute: false,
    addToCartPath: '',
    isAddToCardPending: false,
    cartAddedItemNum: 0,
    totalCartPrice: 0
  }
}
