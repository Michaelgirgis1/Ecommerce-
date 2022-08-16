// import axios from 'axios'
export async function getSubCategories ({ commit, state }, id) {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const response = await this.$contentInt.$get(`/categories/list?searchCriteria[filterGroups][0][filters][0][field]=parent_id&searchCriteria[filterGroups][0][filters][0][value]=${id}&searchCriteria[filterGroups][0][filters][0][conditionType]=eq&searchCriteria[filterGroups][1][filters][1][field]=is_active&searchCriteria[filterGroups][1][filters][1][value]=1&searchCriteria[filterGroups][1][filters][1][conditionType]=eq`)
    commit('setSubCategories', response.items, id)
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
export async function getSubCategoriesDetails ({ commit, state }, id) {
  try {
    // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const response = await this.$contentInt.$get(`/categories/${id}`)
    commit('setSubCategoriesDetails', response)
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
