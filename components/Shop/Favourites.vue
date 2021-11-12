<template>
  <div>
    <v-dialog
      v-model="dialogStatus"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar
          flat
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="closeFavourites"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('wish_list.name') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>

          <v-list
            three-line
            subheader
          >
            <v-subheader>{{ $t('products_list') }}</v-subheader>

            <transition name="fade" v-for="item in favourites" :key="item.id">
              <v-list-item>
                <v-list-item-action>
                  <v-btn
                    class="mt-2 d-block"
                    :loading="favProccess.id === item.product.id ? favProccess.status : false"
                    icon
                    @click="removefavouriteItem(item.product)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-avatar tile size="50" class="mr-5 ml-5">
                  <v-img :src="item.product.image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title @click='closeFavourites'> <NuxtLink :to="Route(`products/${item.product.id}`)" tag="div" class="v-link">{{item.product.name}}</NuxtLink></v-list-item-title>
                  <v-list-item-subtitle>${{item.product.price}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
              </v-list-item>
            </transition>

            <div v-if="!checkFavourites">
              <Notfound :meesage="$t('empty.whish_list')" />
            </div>
          </v-list>
        </v-card-text>
        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: 'favourites',
  computed: {
    ...mapGetters({
      checkFavourites: "shop/favourites/checkFavourites",
      dialogStatus: "shop/favourites/favouritesOpen",
      favProccess: "shop/favourites/favProccess",
      favourites: "shop/favourites/favourites",
      langRoute: "theme/langRoute",
    })
  },
  methods: {
    closeFavourites() {
      this.$store.commit("shop/favourites/closeFavourites");
    },
    removefavouriteItem(product) {
      this.$store.dispatch("shop/favourites/changeFavourit", product)
    },
    Route(path) {
      return this.langRoute + path
    }
  }
}
</script>

<style scoped>

</style>
