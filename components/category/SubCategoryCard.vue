<template>
  <nuxt-link class="category-card" :to="`/sub-categories/sub-categories-details/${category.id}`">
    <img :src="'http://dev.magento.com/'+ `${category.custom_attributes[0].value}`" alt="" @error="replaceByDefaultImg($event)">
    <h2>{{category.name}}</h2>
  </nuxt-link>
</template>

<script>
export default {
  name: 'CategoryCard',
  props: {
    category: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {}
}
</script>
<style lang="scss">
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 25px;
  }
}
</style>
