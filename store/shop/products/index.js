export const state = () => ({
  products: null,
  productsCategory: null,
  loadProducts: null,
  categories: null,
  singleProduct: null,
  singleProductStatus: null,
})

export const getters = {
  loadProducts: state => state.loadProducts,
  products: state => state.products,
  productsCategory: state => state.productsCategory,
  categories: state => state.categories,
  singleProduct: state => state.singleProduct,
  singleProductStatus: state => state.singleProductStatus,
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products.data.data
  },
  SET_PRODUCTS_CATEGORY(state, products) {
    state.loadProducts = true;
    state.productsCategory = products.data.data;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories.data.data
  },
  SET_SINGLE_PRODUCT(state, product) {
    state.singleProduct = product.data;
    state.singleProductStatus = product.status;
  }
}

export const actions = {

  async getProducts({state, commit}) {
    state.loadProducts = false;
    await this.$axios.get(
      'products',
      {
        headers: {
          "lang": this.$cookiz.get('lang') || "en",
          "Authorization": this.$cookiz.get("token") || ""
        }
      }).then(res => {
      if (res.data.status === true) {
        commit("SET_PRODUCTS", res.data);
        state.loadProducts = true;
      } else {
        state.loadProducts = true;
      }

    })
  },

  async callProductsWithCat({state, commit}, categoryId) {
    state.loadProducts = false;
    state.productsCategory = null;

    await this.$axios.get(
      `products?category_id=${categoryId}`,
      {
        headers: {
          "lang": this.$cookiz.get('lang') || "en",
          "Content-Type": "application/json",
          "Authorization": this.$cookiz.get("token") || ""
        }
      }).then(res => {
      commit("SET_PRODUCTS_CATEGORY", res.data);
    })
  },

  async callProducts({dispatch, state}) {
    if(state.products === null) {
      await dispatch('getProducts');
    }
  },

  async getProduct({commit}, productId) {
    commit("SET_SINGLE_PRODUCT", {});
    await this.$axios.get(
      `products/${productId}`,
      {
        headers: {
          "lang": this.$cookiz.get('lang') || "en",
          "Content-Type": "application/json",
          "Authorization": this.$cookiz.get("token") || ""
        }
      }).then(res => {
      commit("SET_SINGLE_PRODUCT", res.data);
    })
  },

  async getCategories({commit}) {
    let lang = this.$cookiz.get("lang") || "en";
    await this.$axios.get(
      'categories',
      {
        headers: {
          "lang": lang
        }
      }).then(res => {
      commit("SET_CATEGORIES", res.data);
    })
  },

  clearUserData({state}) {

    state.products.map(item => {
      item.in_favorites = false;
      item.in_cart = false;
    })

  },


}



