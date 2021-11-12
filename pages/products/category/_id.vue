<template>
  <div>
    <Features />

    <v-sheet>
      <v-container class="mt-10">
        <div v-if="productsCategory && productsCategory.length > 0">
          <v-data-iterator
            :items="productsCategory"
            :items-per-page.sync="itemsPerPage"
            :page.sync="page"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
            hide-default-footer

          >
            <template v-slot:header>
              <v-toolbar
                dark
                color="blue darken-3"
                class="mb-1"
              >
                <v-text-field
                  v-model="search"
                  clearable
                  flat
                  solo-inverted
                  hide-details
                  prepend-inner-icon="mdi-magnify"
                  :label="$t('search')"
                ></v-text-field>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                  <v-spacer></v-spacer>
                  <v-select
                    v-model="sortBy"
                    flat
                    solo-inverted
                    hide-details
                    :items="keys"
                    prepend-inner-icon="mdi-magnify"
                    :label="$t('sort_by')"
                  ></v-select>
                  <v-spacer></v-spacer>
                  <v-btn-toggle
                    v-model="sortDesc"
                    mandatory
                  >
                    <v-btn
                      large
                      depressed
                      color="blue"
                      :value="false"
                    >
                      <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                    <v-btn
                      large
                      depressed
                      color="blue"
                      :value="true"
                    >
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </template>
              </v-toolbar>
            </template>

            <template v-slot:default="props">
              <v-row no-gutters>
                <v-col
                  v-for="item in props.items"
                  :key="item.id"
                  cols="12"
                  sm="4"
                >
                  <Product :product="item"/>
                </v-col>
              </v-row>
            </template>

            <template v-slot:footer>
              <v-row
                class="mt-2"
                align="center"
                justify="center"
              >
                <span class="grey--text">Items per page</span>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      dark
                      text
                      color="primary"
                      class="ml-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ itemsPerPage }}
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in itemsPerPageArray"
                      :key="index"
                      @click="updateItemsPerPage(number)"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-spacer></v-spacer>

                <span
                  class="mr-4
            grey--text"
                >
            Page {{ page }} of {{ numberOfPages }}
          </span>
                <v-btn
                  fab
                  dark
                  color="blue darken-3"
                  class="mr-1"
                  @click="formerPage"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  fab
                  dark
                  color="blue darken-3"
                  class="ml-1"
                  @click="nextPage"
                >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-row>
            </template>
          </v-data-iterator>
        </div>
        <div v-else-if="loadProducts && !!productsCategory">
          <Notfound :meesage="$t('empty.category')" />
        </div>

        <v-row
            v-else
            v-for="n in 2"
            :key="n"
            class="mt-5"
          >
            <v-col
              v-for="n in 3"
              :key="n"
              cols="12"
              sm="4"
            >
              <v-skeleton-loader
                v-bind="attrs"
                type="image, card-heading, list-item-three-line, actions"
              ></v-skeleton-loader>
            </v-col>
          </v-row>

      </v-container>
    </v-sheet>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "Products.vue",
  async asyncData(context) {
    await context.store.dispatch("shop/products/callProductsWithCat", context.params.id)
  },
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
      keysMain: ["Name", "Price"]
    }
  },
  props: {
    attrs: {
      class: 'mb-6',
      boilerplate: true,
      elevation: 2,
    },
  },
  computed: {
    ...mapGetters({
      loadProducts: "shop/products/loadProducts",
      productsCategory: "shop/products/productsCategory",
    }),
    numberOfPages () {
      return Math.ceil(this.productsCategory.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keysMain.filter(key => key !== 'Name')
    },
    vm () {
      return this;
    },
    keys() {
      return [
        this.vm.$t('name'),
        this.vm.$t('price'),
      ]
    }
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
  }
};
</script>

<style scoped>

</style>
