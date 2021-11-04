<template>
<div>
  <v-row class='d-flex justify-center align-center mb-5 mt-5'>
    <div>
      <v-img :src='require("~/assets/no-data.png")' max-width='300'></v-img>
    </div>
  </v-row>
  <v-row class='d-flex justify-center align-center'>
    <div class='text-center text-h5 mt-5'>{{ meesage }}</div>
  </v-row>
</div>
</template>

<script>
export default {
  name: 'Notfound',
  props: ["meesage"]
}
</script>

<style scoped>

</style>
