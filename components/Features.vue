<template>
  <div>
    <v-sheet>
      <v-container class="mt-10">
        <v-row no-gutters>
          <v-col
            v-for="item in features"
            :key="item.index"
            cols="12"
            sm="4"
          >
            <v-card
              class="pa-5"
              elevation="0"
            >

              <v-card-title class="text-h5">
                <v-icon size="40" class="mr-3 ml-3" color="blue">{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: "Features",
  data() {
    return {
      features: [
        {
          icon: 'mdi-truck',
          title: this.$t('features.fast')
        },
        {
          icon: 'mdi-account-supervisor',
          title: this.$t('features.support')
        },
        {
          icon: 'mdi-hours-24',
          title: this.$t('features.all_day')
        },
      ],
    }
  }

};
</script>

<style scoped>

</style>
