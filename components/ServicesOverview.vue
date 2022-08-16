<template>
  <div class="service-overview">
    <!-- eslint-disable vue/no-v-html -->
    <div v-html="serviceDrescription[0].value" />
    <!-- eslint-enable -->
  </div>
</template>

<script>
export default {
  props: {
    servicesDetails: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    serviceDrescription () {
      return this.servicesDetails.custom_attributes.filter((element) => {
        if (element.attribute_code === 'description') {
          return element
        }
        return ''
      })
    }

  },
  mounted () {
  },
  methods: {
  }
}
</script>
