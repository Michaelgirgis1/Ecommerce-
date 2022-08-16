<template>
  <div class="cross-card">
    <nuxt-link class="" :to="`/services/services-details/sku=${service.sku}?id=${service.id}`">
      <!-- <h1>{{service.name}}</h1>
      <img :src="'http://dev.magento.com/media/catalog/product'+ `${service.custom_attributes[2].value}`" alt="" srcset="">
      <span>{{service.price}} EGP</span> -->

      <v-card
        class="mx-auto"
      >
        <div class="service-card__image">
          <img
            :src="'http://dev.magento.com/media/catalog/product'+ `${service.media.image}`"
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
  name: 'CrossSellCard',
  props: {
    service: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss">
  .cross-sell {
    .col-lg-4.col {
      display: flex;
      width: 100%;
      .cross-card {
        display: flex;
        width: 100%;
         a {
           display: flex;
           width: 100%;
             .v-card {
              display: flex;
              flex-direction: column;
              width: 100%;
            }
         }
      }
    }
  }
</style>
