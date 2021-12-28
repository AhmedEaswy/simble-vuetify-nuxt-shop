<template>
  <div>
    <v-card
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="250"
        :src="product.image"
      >
        <!--        lazy-src="https://placeimg.com/50/50/tech"-->
        <!--        <template v-slot:placeholder>-->
        <!--          <v-row-->
        <!--            class="fill-height ma-0"-->
        <!--            align="center"-->
        <!--            justify="center"-->
        <!--          >-->
        <!--            <v-progress-circular-->
        <!--              indeterminate-->
        <!--              color="grey lighten-5"-->
        <!--            ></v-progress-circular>-->
        <!--          </v-row>-->
        <!--        </template>-->
      </v-img>

      <v-card-title>
        <NuxtLink :to="localePath({ name: 'products-id', params: { id: product.id } }, lang)" tag="div" class="v-link">
          {{ product.name | slice(30) }} {{ product.name.length > 30 ? " ..." : "" }}
        </NuxtLink>
      </v-card-title>

      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <div class="grey--text mb-4">
            <span class="mr-3">${{ product.price }} </span>
            <span class="text-decoration-line-through"> ${{ product.old_price }}</span>
          </div>
        </v-row>


        <div>{{ product.description | slice(70) }}</div>
      </v-card-text>



      <v-card-actions class="d-flex justify-space-between">

        <v-btn
          :color="product.in_cart === true ? 'green' : 'deep-purple lighten-2'"
          text
          :loading="cartProccess.id === product.id ? cartProccess.status : false"
          @click="updateCart(product)"
        >
          <v-icon left dark v-if="product.in_cart">mdi-check</v-icon>
          <v-icon left dark v-else>mdi-plus-circle-outline</v-icon>
          {{ $t('cart.add') }}
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          :loading="favProccess.id === product.id ? favProccess.status : false"
          :color="product.in_favorites === true ? 'pink' : 'gray'"
          @click="updateFavourit(product)"
        >
          <v-icon dark>
            mdi-heart
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Product",
  props: ['product'],
  data () {
    return {
      lang: this.$store.state.lang,
    }
  },
  computed: {
    attrs() {
      return {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      }
    },
    ...mapGetters({
      favProccess: "shop/favourites/favProccess",
      cartProccess: "shop/cart/cartProccess",
      langRoute: "theme/langRoute",
    })
  },
  methods: {
    reserve() {
      this.loading = true
      setTimeout(() => (this.loading = false), 2000)
    },
    updateFavourit(product) {
      this.$store.dispatch('shop/favourites/changeFavourit', product);
    },
    updateCart(product) {
      this.$store.dispatch('shop/cart/changeCart', product);
    },
    Route(path) {
      return this.langRoute + path
    }
    // addToCart(productId) {
    //   this.$store.dispatch('shopaddToCart', productId);
    // }
  }
};
</script>

<style scoped>

</style>
