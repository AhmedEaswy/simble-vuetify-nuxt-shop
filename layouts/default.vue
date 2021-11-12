<template>
  <div>
    <v-app :dark='isDark'>
      <v-card
          class="overflow-hidden"
          style="border-radius: 0 !important;"
        >
        <v-sheet min-height="100vh">
          <v-navigation-drawer
              v-model="drawer"
              absolute
              temporary
              :right="dir === 'rtl'"
            >
              <template v-slot:prepend v-if="isAuthenticated">
                <v-list-item two-line color="deep-blue accent-4">
                  <v-list-item-avatar>
                    <img :src="user.image">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ user.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ $t('logged_in') }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-list
                nav
                dense
              >

                <v-list-item-group>
                  <v-list-item :to='{ path : Route("/login") }' v-if='!isAuthenticated'>
                    <v-list-item-icon>
                      <v-icon>mdi-login</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ $t('login_register') }}</v-list-item-title>
                  </v-list-item>
                  <v-list-group
                    :value="false"
                    v-else
                    no-action
                    prepend-icon="mdi-account-circle"
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>{{ $t('profile') }}</v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item :to="{ path: '/profile' }">
                      <v-list-item-icon>
                        <v-icon>mdi-cog-outline</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ $t('profile') }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item v-if="isAuthenticated" @click="logOut">
                      <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{ $t('logout') }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>

                  </v-list-group>


                  <template>
                    <v-subheader>{{$t('settings')}}</v-subheader>

                    <v-list-item
                      active-class=""
                      class="check-no"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-content>
                          <v-list-item-title>{{$t('dark_mode')}}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                          <v-switch
                            :input-value="isDark"
                            @change="handleTheme(!isDark)"
                          ></v-switch>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </template>
                  <v-subheader>{{$t('taps')}}</v-subheader>

                </v-list-item-group>
                <v-list-item :to='{ path : Route("/") }'>
                  <v-list-item-icon>
                    <v-icon>mdi-home</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ $t('home') }}</v-list-item-title>
                </v-list-item>
                <v-list-item :to='{ path : Route("/about") }'>
                  <v-list-item-icon>
                    <v-icon>mdi-information</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>{{ $t('about') }}</v-list-item-title>
                </v-list-item>
                <v-list-group
                  :value="false"
                  no-action
                  prepend-icon="mdi-earth"
                >
                  <template v-slot:activator>
                    <v-list-item-content>
                      <v-list-item-title>{{ $t('languages') }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <v-list-item  link @click="handleLang(item)" v-for="(item, index) in langs" :key="index">

                    <v-list-item-icon>
                      <v-icon v-if="item === lang">mdi-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item }}</v-list-item-title>
                    </v-list-item-content>

                  </v-list-item>
                </v-list-group>
                <v-list-item-group>
                  <v-list-group
                    prepend-icon="mdi-group"
                    no-action
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>{{ $t('categories') }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <v-list-item :to='{ path: Route("/products") }'>
                      <v-list-item-title>{{ $t("all") }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-for="category in categories"
                      :key="category.id"
                      :to='{ path: Route(`/products/category/${category.id}`)}'
                    >
                      <v-list-item-content>
                        <v-list-item-title v-text="category.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </v-list-item-group>
              </v-list>
            </v-navigation-drawer>
            <v-app-bar
              color="blue"
              dark
              style="border-radius: 0 !important;"

            >
              <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

              <v-toolbar-title>{{ $t('logo') }}</v-toolbar-title>

              <v-spacer></v-spacer>

              <!--      <v-btn icon>-->
              <!--        <v-icon>mdi-magnify</v-icon>-->
              <!--      </v-btn>-->
              <v-btn icon @click="openFavourites">
                <v-badge
                  color="green"
                  :content="favouritesLength"
                  v-if="favouritesLength > 0"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-badge>
                <v-icon v-else>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon @click="openCart">
                <v-badge
                  color="green"
                  :content="cartLength"
                  v-if="cartLength > 0"
                >
                  <v-icon>mdi-cart</v-icon>
                </v-badge>
                <v-icon v-else>mdi-cart</v-icon>
              </v-btn>

              <v-btn v-if="isAuthenticated" icon :to="{ path: Route('/profile') }" >
                <v-avatar size="30">
                  <img
                    :src="user.image"
                    :alt="user.name"
                  >
                </v-avatar>
              </v-btn>

              <v-btn v-else icon :to="{ path: Route('login') }">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </v-app-bar>
            <v-main>
              <nuxt keep-alive :keep-alive-props="{ max: 10 }" />
            </v-main>
          <v-footer
              :absolute="!fixed"
              app
            >
              <span>&copy; {{ new Date().getFullYear() }}</span>
            </v-footer>
        </v-sheet>
        <Cart />
        <Favourites />
      </v-card>
    </v-app>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import "assets/scss/main.scss"

export default {
  name:"Home", head () {
    return this.$nuxtI18nHead()
  },
  data () {
    return {
      clipped: false,
      langs: this.$i18n.availableLocales,
      drawer: false,
      fixed: false,
      group: null,
      model: null,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
    }
  },
  computed: {
    ...mapGetters({
      langRoute: "theme/langRoute",
      lang: "theme/lang",
      isMainLang: "theme/isMainLang",
      dir: "theme/dir",
      categories: "shop/products/categories",
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/user",
      isDark: "theme/isDark",
      cartLength: "shop/cart/cartLength",
      favouritesLength: "shop/favourites/favouritesLength",
    }),
  },
  methods: {
    handleTheme(theme) {
      this.$store.dispatch('theme/handleTheme', { vm: this, theme });
    },
    handleLang(lang) {
      this.$store.dispatch("theme/handleLang", { vm: this, lang })},
    logOut() {
      this.$store.dispatch("auth/logout");
    },
    openCart() {
      this.$store.commit("shop/cart/openCart");
    },
    openFavourites() {
      this.$store.commit("shop/favourites/openFavourites");
    },
    Route(path) {
      return this.langRoute + path
    }
  },
  beforeMount() {

    if(this.$cookiz.get("lang") === "ar") {
      this.$vuetify.rtl = true;
      this.$vuetify.lang.current = this.$cookiz.get("lang");
    } else {
      this.$vuetify.rtl = false;
      this.$vuetify.lang.current = this.$cookiz.get("lang");
    }

    this.$store.commit("theme/changeTheme", { theme: this.isDark, vm: this})

    this.$store.dispatch("shop/cart/getCart");
    this.$store.dispatch("shop/favourites/getFavourites");
  },
}
</script>

<style lang='scss'>
.v-link {
  text-decoration: none;
  cursor: pointer;
}
</style>
