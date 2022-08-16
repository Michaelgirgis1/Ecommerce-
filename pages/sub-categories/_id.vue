<template>
  <div class="sub-category">
    <h3>subcategory id {{id}}</h3>
    <b-row v-if="showSubCategories">
      <b-col v-for="category in subCategories" :key="category.key" col lg="4">
        <SubCategoryCard :category="category" />
      </b-col>
    </b-row>
    <div v-else class="loader">
      <Loader />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SubCategoryCard from '../../components/category/SubCategoryCard.vue'
import Loader from '../../components/Loader.vue'
export default {
  name: 'SubCategory',
  components: {
    SubCategoryCard,
    Loader
  },
  data () {
    return {
      id: this.$route.params.id,
      showSubCategories: false
    }
  },
  computed: {
    ...mapGetters('subCategory', ['subCategories'])

  },
  async mounted () {
    await this.getSubCategories(this.id)
    this.showSubCategories = true
  },
  methods: {
    ...mapActions('subCategory', ['getSubCategories'])

  }
}
</script>
