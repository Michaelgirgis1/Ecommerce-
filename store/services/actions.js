export async function getServices ({ commit, state }, id) {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const response = await this.$contentInt.$get(`/products/?searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]=${id}&fields=items[id,sku,name,price,custom_attributes,product_links]`)
    commit('setServices', response.items)
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
export async function getServicesDetails ({ commit, state }, sku) {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const response = await this.$contentInt.$get(`/products/${sku}`)
    response.isAddToCart = false
    commit('setServicesDetails', response)
    // addAddToCartFlag(state, sku)
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
export async function getCrossSellUpSell ({ commit, state }, id) {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const response = await this.$contentInt.$get(`/product/getCrossSellAndUpSell?product_id=${id}`)
    commit('setCrossSell', response[0].crossSell)
    commit('setUpsell', response[0].upSell)
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
export async function getServiceReview ({ commit, state }, sku) {
  try {
    const response = await this.$contentInt.$get(`/products/${sku}/reviews`)
    commit('setServiceReview', response)
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
