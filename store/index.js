export const strict = false

export const actions = {

  async nuxtServerInit({ dispatch }) {
    if (!this.$cookiz.get("lang")) {this.$cookiz.set("lang", "en")}
    if (!this.$cookiz.get("dir")) {this.$cookiz.set("dir", "ltr")}
    if (!this.$cookiz.get("theme")) {this.$cookiz.set("theme", "light")}
    if (!this.$cookiz.get("token")) {this.$cookiz.set("token", "")}

    await dispatch("theme/default")
    await dispatch("shop/products/getCategories")
    await dispatch('auth/tokenLogAuth')

  }

}
