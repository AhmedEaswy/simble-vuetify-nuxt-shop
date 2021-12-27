<template>
  <div>
    <v-card
      style="padding: 20px"
      class="mx-auto my-12"
      max-width="500">
      <p class="text-h4 text--primary">
        {{ $t('register') }}
      </p>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="loginForm.name"
          :rules="[nameRules.required, nameRules.min]"

          :label="$t('form.name')"
          required
          outlined
        ></v-text-field>
        <v-text-field
          v-model="loginForm.email"
          :rules="[emailRules.required, emailRules.valid]"
          :label="$t('form.email')"
          required
          outlined
        ></v-text-field>

        <v-text-field
          v-model="loginForm.phone"
          :rules="phoneRules"
          :label="$t('form.phone')"
          required
          outlined
          :counter="11"
        ></v-text-field>
        <v-text-field
          v-model="loginForm.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          :label="$t('form.password')"
          hint="At least 8 characters"
          counter
          outlined
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          :label="$t('agree')"
          required
        ></v-checkbox>
        <v-alert
          dense
          outlined
          type="error"
          v-if="errMessage"
          v-text="errMessage"
        >

        </v-alert>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          :loading="logProccess"
          @click="submit"
        >
          {{ $t('submit') }}
        </v-btn>
      </v-form>
      <p class="mt-5">{{ $t('have_account') }} <NuxtLink :to='localePath("login")'>{{ $t('login', lang) }}</NuxtLink></p>
    </v-card>
  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  name: "register",
  middleware: 'logger',
  data: () => ({
    loading: false,
    valid: true,
    show1: false,
    // nameRules: [
    //     v => !!v || "test" + "vm.$('valid.name.index')",
    //     v => (v && v.length > 3) || "vm.$('valid.name.less_three')",
    // ],
    loginForm: {
      name: '',
      email: '',
      password: '',
      phone: ''
    },
    phoneRules: [
      v => !!v || 'Phone is required',
      v => v.length === 11 || 'Phone must be 11 characters'
      // v => (v.length !== 11) || 'Phone must be 11 characters',
    ],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Min 6 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
    checkbox: false,

  }),

  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      errMessage: "auth/errorMessage",
      logProccess: "auth/logProccess",
      lang: "theme/lang",
    }),
    vm () {
      return this;
    },
    test() {
      return this.vm.$t("logo")
    },
    nameRules() {
      return {
        required: v => !!v || this.vm.$t('valid.name.index'),
        min: v => v.length >= 3 || this.vm.$t('valid.name.less_3'),
      }
    },
    emailRules() {
      return {
        required: v => !!v || this.vm.$t('valid.email.index'),
        valid: v => /.+@.+\..+/.test(v) || this.vm.$t('valid.email.valid'),
      }
    },


  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch("auth/register", this.loginForm);
      } else {
        this.$refs.form.validate();
      }
    },
  },
};
</script>

<style scoped>

</style>
