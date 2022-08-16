export async function getCartItems ({ commit, state }) {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const response = await this.$contentToken.$get('/carts/mine/items')
    // const cartItems = addAddToCartFlag(response)
    commit('setCartItemsFromApi', response)
    commit('setCartAddedItemNum', response.length)
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
      this.$toast.error('Oh oh, something went wrong!', {
        duration: 5000
      })
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      console.error(error, {
        duration: 5000
      })
    }
    throw error
  }
}
export async function initiateCart ({ commit, state }) {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const response = await this.$contentToken.$post('/carts/mine')
    commit('setCartId', response)
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
      this.$toast.error('Oh oh, something went wrong!', {
        duration: 5000
      })
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      console.error(error, {
        duration: 5000
      })
    }
    throw error
  }
}
export async function deleteItemCart ({ commit, state }, item) {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts') deleteItemCart
    const response = await this.$contentToken.$delete(`/carts/mine/items/${item.id}`)
    commit('setRemoveFromCart', item.sku)
    commit('setCartId', response.items)
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
      this.$toast.error('Oh oh, something went wrong!', {
        duration: 5000
      })
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      console.error(error, {
        duration: 5000
      })
    }
    throw error
  }
}
export async function addToCustomerCart ({ commit, state }, item) {
  try {
    const response = await this.$contentToken.$post('carts/mine/items', item)
    commit('setAddToCart', response)
  } catch (error) {
    if (error.response) {
      // Request made and server responded
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
      this.$toast.error('Oh oh, something went wrong!', {
        duration: 5000
      })
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request)
    } else {
      // Something happened in setting up the request that triggered an error
      console.error(error, {
        duration: 5000
      })
    }
    throw error
  }
}
// function addAddToCartFlag (items) {
//   items.forEach((ele) => {
//     ele.isAddedToCart = true
//   })
//   return items
// }
