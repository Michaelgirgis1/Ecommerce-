<template>
  <div class="category-card">
    <nuxt-link class="" :to="`/sub-categories/${category.id}`">
      <img :src="'http://dev.magento.com/'+ `${category.custom_attributes[0].value}`" alt="" @error="replaceByDefaultImg($event)">
      <!-- <img src="../../static/images/default.jpg" alt=""> -->
      <!-- naaame -->
      <h2 class="text-center">
        {{category.name}}
      </h2>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'CategoryCard',
  // mixins: [mixins],
  props: {
    category: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {},
  methods: {

  }
}
</script>
<style lang="scss">
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 25px;
    max-width: 100%;
  }
  a {
    color: #000;
    &:hover {
      color: unset;
      text-decoration: none;
    }
  }
}
</style>
