<template>
  <v-app white>
    <v-main>
      <Header />
      <v-container>
        <Nuxt />
      </v-container>
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer
  },
  // middleware: 'isAuthenticated',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  computed: {
    isAuthenticated () {
      return this.$auth.$state.loggedIn
    }
  },
  mounted () {}
}
</script>
