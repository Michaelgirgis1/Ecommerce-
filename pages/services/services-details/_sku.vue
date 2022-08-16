<template>
  <div class="service-details">
    <div class="section-title">
      <h2>Services Details {{sku}}</h2>
    </div>
    <div v-if="!showServicesDetails" class="loader">
      <Loader />
    </div>
    <div v-else class="service-details__content">
      <ServiceDetails v-if="showServicesDetails" :services-details="servicesDetails" :item-added-details="itemAddedDetails" @addDetails="addDetails($event)" />
    </div>
    <div v-if="!showServicesDetails" class="loader">
      <Loader />
    </div>
    <v-card v-else>
      <v-tabs
        v-model="tab"
        background-color="deep-purple accent-4"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider />
        <v-tab href="#tab-1">
          Over View
        </v-tab>
        <v-tab href="#tab-2">
          Review
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <!-- v-for="i in 3" -->
        <v-tab-item
          key="1"
          :value="'tab-' + 1"
          :transition="false"
        >
          <v-card flat>
            <div v-if="showServicesDetails" class="service-details__overview">
              <ServicesOverview :services-details="servicesDetails" />
            </div>
          </v-card>
        </v-tab-item>
        <v-tab-item
          key="2"
          :value="'tab-' + 2"
          :transition="false"
        >
          <v-card flat>
            <b-row v-if="serviceReview.length > 0">
              <b-col v-for="review in serviceReview" :key="review.key" col lg="12">
                <ServiceReview :review="review" />
              </b-col>
            </b-row>
            <h2 v-else class="text-center">
              There isn't review
            </h2>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
    <div class="section-title">
      <h2>Video</h2>
    </div>
    <div class="service-details__video">
      <iframe
        src="https://player.vimeo.com/video/482534715?h=b90103f70e&color=99ceac&title=0&byline=0&portrait=0"
        width="640"
        height="360"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      />
    </div>
    <div v-if="!showServicesDetails" class="loader">
      <Loader />
    </div>
    <div v-if="crossSell.length > 0" class="section-title">
      <h2>Cross sell</h2>
    </div>
    <div v-if="crossSell.length > 0" class="cross-sell">
      <div v-swiper:mySwiper="crossSellOption">
        <div class="swiper-wrapper">
          <div v-for="item in crossSell" :key="item.key" class="img-wrapper swiper-slide">
            <CrossUpSellCard :service="item" />
          </div>
        </div>
        <div v-if="crossSell.length > 3" slot="button-prev" class="swiper-button-prev cross-swiper-button-prev" />
        <div v-if="crossSell.length > 3" slot="button-next" class="swiper-button-next cross-swiper-button-next" />
      </div>
    </div>
    <div v-if="upSell.length > 0" class="section-title">
      <h2>Up sell</h2>
    </div>
    <div v-if="upSell.length > 0" class="up-sell">
      <div v-swiper:mySwiper2="upSellOption">
        <div class="swiper-wrapper">
          <div v-for="item in upSell" :key="item.key" class="img-wrapper swiper-slide">
            <CrossUpSellCard :service="item" />
          </div>
        </div>
        <div v-if="upSell.length > 3" slot="button-prev" class="swiper-button-prev up-swiper-button-prev" />
        <div v-if="upSell.length > 3" slot="button-next" class="swiper-button-next up-swiper-button-next" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ServiceDetails from '../../../components/ServicesDetails.vue'
import Loader from '../../../components/Loader.vue'
import ServiceReview from '../../../components/ServiceReview.vue'
import ServicesOverview from '../../../components/ServicesOverview.vue'
import CrossUpSellCard from '../../../components/CrossUpSellCard.vue'
export default {
  name: 'ServiceDetail',
  components: {
    ServiceDetails,
    ServiceReview,
    ServicesOverview,
    Loader,
    CrossUpSellCard
  },
  data () {
    return {
      showServicesDetails: false,
      sku: this.$route.params.sku.replace('sku=', ''),
      id: this.$route.query.id,
      rating: 4,
      tab: null,
      showActionElement: null,
      text: 'orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      crossSellOption: {
        slidesPerView: 3,
        loop: false,
        navigation: {
          nextEl: '.cross-swiper-button-next',
          prevEl: '.cross-swiper-button-prev'
        }
      },
      upSellOption: {
        slidesPerView: 3,
        loop: false,
        navigation: {
          nextEl: '.up-swiper-button-next',
          prevEl: '.up-swiper-button-prev'
        }
      },
      itemAddedDetails: {}
    }
  },
  computed: {
    isAuthenticated () {
      return this.$auth.$state.loggedIn
    },
    ...mapGetters('services', ['servicesDetails', 'crossSell', 'upSell', 'serviceReview']),
    ...mapGetters('cart', ['cartItems'])
  },
  watch: {
    cartItems () {
      // let;
      this.$store.commit('services/setServiceCartFlag', this.addFlagToItemDetails(this.cartItems, this.sku))
      this.itemAddedDetails = this.addFlagToItemDetails(this.cartItems, this.sku)
    }
  },
  async mounted () {
    const instance = this
    // if (Object.keys(this.servicesDetails).length === 0) {
    await Promise.all([instance.getServicesDetails(instance.sku),
      instance.getCrossSellUpSell(instance.id),
      instance.getServiceReview(instance.sku)]).then(() => {
      // instance.itemAddedDetails = instance.addFlagToItemDetails(instance.sku)
      // await this.$store.commit('services/setServiceCartFlag', instance.addFlagToItemDetails(instance.sku))
    })
    // }
    this.showServicesDetails = true
  },
  methods: {
    ...mapActions('services', ['getServicesDetails', 'getCrossSellUpSell', 'getServiceReview']),
    addDetails (itemDetails) {
      this.itemAddedDetails = itemDetails
      // this.itemAddedDetails = this.addFlagToItemDetails(this.sku)
    }
  }
}
</script>

<style lang="scss">
.cross-sell {
  margin-bottom: 30px;
}
.service-details__content {
  margin-bottom: 40px;
}
.match-height--up-sell,
.match-height--cross-sell {
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
}
.service-details__video {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}
.v-card {
  margin-bottom: 40px;
  .v-window {
  padding: 40px 20px;
 }
}
.swiper-wrapper {
  .swiper-slide {
    .cross-card {

      padding:0 15px;
    }
  }
}
</style>
