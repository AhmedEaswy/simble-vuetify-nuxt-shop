<template>
  <v-app>
    <v-card class='align-center justify-center d-flex text-center' color='transparent' min-height='300'>

      <div>
        <div>
          <v-icon size='100'>mdi-alert-circle</v-icon>
        </div>
        <div>
          <h1 v-if="error.statusCode === 404" class='mt-5 mb-5'>
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
          <NuxtLink to="/">
            Home page
          </NuxtLink>
        </div>
      </div>
    </v-card>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
