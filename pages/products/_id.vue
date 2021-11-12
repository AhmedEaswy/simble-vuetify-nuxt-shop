<template>
  <div>
    <v-sheet>
      <div v-if="product && productStatus">
        <div>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <div class="product-image">
                  <client-only placeholder="loading...">
                    <zoom-on-hover :img-normal="product.image"
                                   :img-zoom='product.image' :disabled='false' :scale="2"
                                   :scaleFactor='2'
                    >
                    </zoom-on-hover>
                  </client-only>
                </div>
              </v-col>
              <v-col cols="12" sm="4">
                <v-row>
                  <v-col
                    v-for="(item, index) in product.images"
                    cols="3"
                    sm="12"
                    :key="index"
                    @click="setActiveImage(index)"
                  >
                    <div :class="activeImagesIndex === index ? 'black--border product-small-image v-link align-content-center' : 'product-small-image v-link align-content-center'">
                      <v-img :src="item" max-width="95" max-height="95"></v-img>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-card-title>
                  {{product.name}}
                </v-card-title>
                <v-card-subtitle>
                  <div class="grey--text mb-2">
                    <span class="mr-3">${{ product.price }} </span>
                    <span class="text-decoration-line-through"> ${{ product.old_price }}</span>
                  </div>
                </v-card-subtitle>
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-card-actions class="d-flex justify-space-between">

                        <v-btn
                          :color="product.in_cart === true ? 'green' : 'deep-purple lighten-2'"
                          text
                          :loading="cartProccess.id === product.id ? cartProccess.status : false"
                          @click="updateCart(product)"
                        >
                          <v-icon left dark v-if="product.in_cart">mdi-check</v-icon>
                          <v-icon left dark v-else>mdi-plus-circle-outline</v-icon>
                          Add To Cart
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
                    </v-col>
                  </v-row>
                </v-container>

                <v-card-text>
                  <p v-if="isShowLongText">
                    {{ product.description }} <a @click="ToggleLongText($event)">{{ isShowLongText ? " Show Less " : " Show More " }} ... </a>
                  </p>
                  <p v-else>
                    {{ product.description | slice(200) }} <a @click="ToggleLongText($event)">{{ isShowLongText ? " Show Less " : " Show More " }} ... </a>
                  </p>
                </v-card-text>

              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
      <div v-else-if="!productStatus && !product" class='mt-20'>
        <v-container class='mt-20'>
          <Notfound :meesage="$t('product.notfound')"/>
        </v-container>
      </div>
      <div v-else>
        <v-container>
          <v-row
            align="center"
            justify="center">
            <v-col
              cols="8"
              class="mx-auto"
            >
              <v-skeleton-loader
                v-bind="attrs"
                type="image, article, actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Notfound from '../../components/Notfound'

export default {
  name: "Product",
  components: { Notfound },
  async asyncData(context) {
    await context.store.dispatch("shop/products/getProduct", context.params.id)
  },
  data() {
    return {
      isShowLongText: false,
      activeImagesIndex: 0,
    }
  },

  computed: {
    ...mapGetters({
      product: "shop/products/singleProduct",
      productStatus: "shop/products/singleProductStatus",
      favProccess: "shop/favourites/favProccess",
      cartProccess: "shop/cart/cartProccess",
      langRoute: "theme/langRoute",
    }),
    attrs() {
      return {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      }
    },
  },
  methods: {
    ToggleLongText(event) {
      event.preventDefault();
      this.isShowLongText = !this.isShowLongText;
    },
    updateFavourit(product) {
      this.$store.dispatch('shop/favourites/changeFavourit', product);
    },
    updateCart(product) {
      this.$store.dispatch('shop/cart/changeCart', product);
    },
    setActiveImage(index) {
      this.activeImagesIndex = index;
      this.product.image = this.product.images[index];
    },
    Route(path) {
      return this.langRoute + path
    }
  }
};
</script>

<style lang="scss">
.product-image {
  border-radius: 5px;
  border:1px solid #CCC;
  transition: all .4s ease-in-out;
  align-items: center;
  justify-content: center;
  display: flex;
  max-height: 500px;
  &:hover {
    border-color:#555;
  }
}
.product-small-image {
  border-radius: 5px;
  border:1px solid #CCC;
  transition: all .4s ease-in-out;
  height: 100px;
  width:100px;
  align-items: center;
  justify-content: center;
  display: flex;
  &:hover {
    border-color:#555;
  }
}
.black--border {
  border-color: #000;
}
.normal {
  max-height: 495px !important;

}
.zoom-on-hover {
  max-height: 495px !important;
}

</style>
