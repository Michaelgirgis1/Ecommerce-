export function setCartId (state, value) {
  state.cartId = value
}
export function setAddToCart (state, value) {
  state.cartItems = [...state.cartItems, value]
  increasCartAddedNum(state)
}
export function setRemoveFromCart (state, value) {
  state.cartItems.forEach((ele, index) => {
    if (ele.sku === value) {
      state.cartItems.splice(index, 1)
      ele.isAddedToCart = false
      decreaseCartAddedNum(state)
    }
  })
}
export function setCartItemsFromApi (state, value) {
  state.cartItems = value
}
export function setIsAddToCartRoute (state, value) {
  state.isAddToCartRoute = value
}

export function setAddToCartPath (state, value) {
  state.addToCartPath = value
}
export function setIsAddToCardPending (state, value) {
  state.isAddToCardPending = value
}
export function setCartAddedItemNum (state, value) {
  state.cartAddedItemNum = value
}

export function increasCartAddedNum (state) {
  state.cartAddedItemNum = state.cartAddedItemNum + 1
}
export function decreaseCartAddedNum (state) {
  state.cartAddedItemNum = state.cartAddedItemNum - 1
}

export function setTotalCartPrice (state, value) {
  state.totalCartPrice = +value
}
