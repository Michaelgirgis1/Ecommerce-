<template>
  <div class="home-page">
    <h1 class="section-title text-center">
      home
    </h1>
    <CalenderTimeSlot />
    <div class="">
      <b-row>
        <b-col v-for="category in categories" :key="category.key" col lg="4">
          <CategoryCard :category="category" />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoryCard from '../components/category/CategoryCard.vue'
import CalenderTimeSlot from '../components/CalenderTimeSlot.vue'
export default {
  name: 'IndexPage',
  components: {
    CategoryCard,
    CalenderTimeSlot
  },
  data () {
    return {
      data: [],
      selectedDate: null,
      date: '2022-06-02',
      checkedTime: null,
      isTimeSlotsShow: false,
      timeSlots: ['09:00 AM - 11:00AM', '11:00 AM - 01:00PM', '01:00 PM - 03:00PM'],
      avialableDates: [3, 9, 11, 14, 19, 23, 27, 31],
      attrs: [
        {
          bar: 'green',
          dates: [new Date()]
        }
      ]
    }
  },
  async fetch ({ store }) {
    await store.dispatch('category/getMainCategories')
  },
  computed: {
    ...mapGetters('category', ['categories'])
  },
  mounted () {
    // this.getMainCategories()
  },
  methods: {
    ...mapActions('category', ['getMainCategories'])
  }
}
</script>
