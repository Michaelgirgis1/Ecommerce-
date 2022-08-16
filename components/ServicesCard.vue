<template>
  <div class="services-card">
    <nuxt-link class="" :to="`/services/services-details/sku=${service.sku}?id=${service.id}`">
      <v-card
        class="mx-auto"
      >
        <div class="service-card__image">
          <img
            :src="'http://dev.magento.com/media/catalog/product' + `${service.custom_attributes[2].value}`"
            height="200px"
            contain
            @error="replaceByDefaultImg($event)"
          >
        </div>
        <v-card-title>
          {{service.name}}
        </v-card-title>
        <v-card-subtitle>
          {{service.price}} EGP
        </v-card-subtitle>
      </v-card>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'ServicesCard',
  props: {
    service: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      failedImage: false
    }
  },
  computed: {
    srcPicture (service) {
      const imageSrc = this.failedImage ? 'http://dev.magento.com/media/catalog/product' + `${service.custom_attributes[2].value}` : '/images/default.jpg'
      // this.failedImage = false
      return imageSrc
    }
  },
  methods: {
    onImgError () {
      this.failedImage = true
    }
  }
}
</script>
<style lang="scss">
.services-card {
  // border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  img {
    max-width: 100%;
  }
  a {
    color: #000;
    text-decoration: unset;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    max-width: 100%;
    width: 100%;
    .v-card {
      width: 100%;
    }
  }

}
</style>
