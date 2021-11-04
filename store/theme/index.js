import themeConfig from '../../themeConfig'

export const state = () => ({
  theme: themeConfig.app.layout.theme,
  dir: themeConfig.app.layout.lang === "ar" ? "rtl" : "ltr",
  lang: themeConfig.app.layout.lang,
  langs: ["en", "ar"],
})

export const getters = {
  lang: state => state.lang,
  dir: state => state.lang === "ar" ? "rtl" : "ltr",
  langs: state => state.langs,
  isDark: state => state.theme === "dark",
}

export const mutations = {

  changeLang(state, { lang, vm  }) {
    state.lang = lang;
    state.dir = lang === "ar" ? "rtl" : "ltr" || themeConfig.app.layout.dir;

    vm.$cookiz.set("lang", lang);
    vm.$cookiz.set("dir", state.dir);

    vm.$vuetify.lang.current = lang;
    vm.$vuetify.rtl = state.dir === 'rtl';
    console.log(lang)
    vm.$i18n.setLocale(lang)
  },

  changeTheme(state, { theme, vm }) {
    theme === true ? theme = "dark" : theme = "light";
    vm.$cookiz.set("theme", theme);
    vm.$vuetify.theme.dark = theme === "dark";
    state.theme = vm.$cookiz.get("theme");
  },

}

export const actions = {
  reCallDataHaveLangHeaders() {
    window.$nuxt.$store.state.shop.products.products = null;
    window.$nuxt.$store.dispatch("shop/favourites/clearFavourites")
    window.$nuxt.$store.dispatch("shop/cart/clearCart")

    window.$nuxt.$store.dispatch("shop/products/callProducts");
    window.$nuxt.$store.dispatch("shop/cart/getCart");
    window.$nuxt.$store.dispatch("shop/favourites/getFavourites");
  },

  handleLang({ commit, dispatch }, { vm, lang }) {
    commit("changeLang", { vm, lang });
    setTimeout(() => {
      dispatch("reCallDataHaveLangHeaders");
    })
    // this.$router.go();
  },

  handleTheme({ commit }, { vm, theme }) {
    commit("changeTheme", { vm, theme });
  },

  default({ state }) {

    if (!this.$cookiz.get("lang")) {
      this.$cookiz.set("lang", "en")
    }

    let lang = this.$cookiz.get("lang") || "en",
        theme = this.$cookiz.get("theme");


    if (lang) {
      state.lang = lang;
      state.dir = lang === "ar" ? "rtl" : "ltr";
    }

    if (theme) {
      state.theme = theme;
    }

    this.$i18n.setLocale(lang)

    // console.log(
    //   this.$cookiz.get("lang") + " - " + this.$cookiz.get("dir") + " - " + this.$cookiz.get("theme")
    // )

  },

}



