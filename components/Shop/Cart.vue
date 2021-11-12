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
            @click="closecart"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ $t('cart.name') }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>

          <v-list
            three-line
            subheader
          >
            <v-subheader>{{ $t('products_list') }}</v-subheader>

            <transition name="fade" v-for="item in cart.cart_items" :key="item.id">
              <v-list-item>
                <v-list-item-action>
                  <v-btn
                    class="mt-2 d-block"
                    :loading="cartProccess.id === item.product.id ? cartProccess.status : false"
                    icon
                    @click="removecartItem(item.product)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
                <v-list-item-avatar tile size="50" class="mr-5 ml-5">
                  <v-img :src="item.product.image"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title @click='closecart'> <NuxtLink :to="Route(`products/${item.product.id}`)" tag="div" class="v-link">{{item.product.name}}</NuxtLink></v-list-item-title>
                  <v-list-item-subtitle>${{item.product.price}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  :disabled="item.quantity <= 1"
                  color="primary"
                  @click="decreaseQuantity(item)"
                >
                  <v-icon dark>
                    mdi-minus
                  </v-icon>
                </v-btn>
                <div class="body-1">{{item.quantity}}</div>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  :disabled="item.qunatity === maxcartItemLength"
                  color="primary"
                  @click="increaseQuantity(item)"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-list-item>
            </transition>

          </v-list>
          <div v-if="checkcart">
            <v-divider></v-divider>
            <v-subheader class="text-body-1">{{ $t('total') }}: <v-card-text class="font-weight-black" color="blue">${{cart.total}}</v-card-text></v-subheader>
          </div>
          <Notfound v-else :meesage="$t('empty.cart')" />

<!--          <div v-else v-text="$t('empty.cart')"></div>-->
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  computed: {
    ...mapGetters({
      checkcart: "shop/cart/checkCart",
      dialogStatus: "shop/cart/cartOpen",
      cartProccess: "shop/cart/cartProccess",
      cart: "shop/cart/cart",
      maxcartItemLength: "shop/cart/maxCartItemLength",
      langRoute: "theme/langRoute",
    }),
  },
  methods: {
    closecart() {
      this.$store.commit("shop/cart/closeCart");
    },
    removecartItem(product) {
      this.$store.dispatch("shop/cart/changeCart", product)
    },
    decreaseQuantity(product) {
      this.$store.dispatch("shop/cart/updateCartQuantity", { oberation: "remove", product: product })
    },
    increaseQuantity(product) {
      this.$store.dispatch("shop/cart/updateCartQuantity", { oberation: "add", product: product })
    },
    Route(path) {
      return this.langRoute + path
    }
  }
};
</script>

<style scoped>

</style>
