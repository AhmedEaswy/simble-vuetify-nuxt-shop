export const state = () => ({
  favourites: [],
  favProccess: {
    status: false,
    id: null,
  },
  favouritesOpen: false,
})

export const getters = {
  favourites: state => state.favourites,
  favProccess: state => state.favProccess,
  checkFavourites: state => state.favourites.length > 0,
  favouritesOpen: state => state.favouritesOpen,
  favouritesLength: state => state.favourites.length,
}

export const mutations = {
  openFavourites(state) {
    state.favouritesOpen = true
  },
  closeFavourites(state) {
    state.favouritesOpen = false
  },
  SET_FAVOURITS(state, favourites) {
    state.favourites = favourites.data.data;
  },
  UPDATE_FAVOURITE_FOR_SINGLE() {
    if(window.$nuxt.$store.state.shop.products.singleProduct) {
      window.$nuxt.$store.state.shop.products.singleProduct.in_favorites = !window.$nuxt.$store.state.shop.products.singleProduct.in_favorites;
    }
  },
  UPDATE_FAVOURITS(state, product) {
    window.$nuxt.$store.commit("shop/favourites/UPDATE_FAVOURITE_FOR_SINGLE");
    if(window.$nuxt.$store.state.shop.products.products) {
      window.$nuxt.$store.getters["shop/products/products"].map((item) => {
        if(item.id === product.product.id) {
          item.in_favorites = !item.in_favorites;
        }
      })
    }

    if(window.$nuxt.$store.state.shop.products.productsCategory) {
      window.$nuxt.$store.getters["shop/products/productsCategory"].map((item) => {
        if(item.id === product.product.id) {
          item.in_favorites = !item.in_favorites;
        }
      })
    }

    if(state.favourites.find((item) => item.product.id === product.product.id)) {
      state.favourites = state.favourites.filter(item => item.product.id != product.product.id)
    } else {
      state.favourites = [product, ...state.favourites];
    }
  },
  CLEAR_FAVOURITES(state) {
    state.favourites = []
  }

}

export const actions = {

  getFavourites({commit}) {
    if(window.$nuxt.$store.getters["auth/isAuthenticated"]) {
      this.$axios.get(
        'favorites',
        {
          headers: {
            "lang": this.$cookiz.get('lang') || "en",
            "Content-Type": "application/json",
            "Authorization": this.$cookiz.get('token')
          }
        }).then(res => {
        commit("SET_FAVOURITS", res.data);
      })
    }
  },

  changeFavourit({commit, state, getters}, product) {

    state.favProccess.status = true;
    state.favProccess.id = product.id;

    commit('UPDATE_FAVOURITS', { "product": product })
    state.favProccess.status = false;

    if (window.$nuxt.$store.getters["auth/isAuthenticated"]) {
      this.$axios.post(
        'favorites',
        {
          "product_id": product.id,
        },
        {
          headers: {
            "lang": this.$cookiz.get('lang') || "en",
            "Content-Type": "application/json",
            "Authorization": this.$cookiz.get('token')
          }
        }
      ).then(res => {
        if(res.data.status === false) {
          state.favProccess.status = false;
        }
        // commit('UPDATE_FAVOURITS', res.data.data)
      })
    }

  },

  clearFavourites({commit}) {
    commit("CLEAR_FAVOURITES");
  }

}



