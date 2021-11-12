export const state = () => ({
  banners: null,
})

export const getters = {
  banners: state => state.banners,
}

export const mutations = {

  SET_BANNERS(state, banners) {
    state.banners = banners;
  }

}

export const actions = {

  async getBanners({ commit }) {
    await this.$axios.get(
      'banners',
      {
        headers: {
          "lang": this.$cookiz.get('lang') || "en",
          "Content-Type": "application/json",
        }
      }).then(res => {
        commit("SET_BANNERS", res.data.data);
      }
    );
  },

  async callBanners({ dispatch, state }) {
    if(state.banners === null) {
      await dispatch("getBanners")
    }
  }

}



