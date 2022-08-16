<template>
  <div class="sub-category">
    <h3>subcategory details {{id}}</h3>
    <div v-if="showSubCategoriesDetails">
      <p>SubCategoryDetailsName: {{subCategoriesDetails.name}}</p>
    </div>
    <div v-else class="loader">
      <Loader />
    </div>
    <h3>Services list</h3>
    <div v-if="showServicesList" class="services-list">
      <b-row class="match-height">
        <b-col v-for="service in services" :key="service.key" class="services-item" col lg="4">
          <ServicesCard :service="service" />
        </b-col>
      </b-row>
    </div>
    <div v-else class="loader">
      <Loader />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import SubCategoryCard from '../../components/SubCategoryCard.vue'
import Loader from '../../../components/Loader.vue'
import ServicesCard from '../../../components/ServicesCard.vue'
export default {
  name: 'SubCategory',
  components: {
    Loader,
    ServicesCard
    // SubCategoryCard
  },
  data () {
    return {
      id: this.$route.params.id,
      showSubCategoriesDetails: false,
      showServicesList: false
    }
  },
  computed: {
    ...mapGetters('subCategory', ['subCategoriesDetails']),
    ...mapGetters('services', ['services'])

  },
  async mounted () {
    // await Promise.all(this.getServices(), this.getSubCategoriesDetails(this.id))
    // if (this.services.length === 0) {
    await this.getServices(this.id)
    // }
    this.showServicesList = true
    // if (Object.keys(this.subCategoriesDetails).length === 0) {
    await this.getSubCategoriesDetails(this.id)
    // }
    this.showSubCategoriesDetails = true
  },
  methods: {
    ...mapActions('subCategory', ['getSubCategoriesDetails']),
    ...mapActions('services', ['getServices'])

  }
}
</script>
