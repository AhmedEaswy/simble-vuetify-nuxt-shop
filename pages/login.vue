<template>
  <div>
    <v-card
      style="padding: 20px"
      class="mx-auto my-12"
      max-width="500">
      <p class="text-h4 text--primary">
        {{ $t('login') }}
      </p>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >

        <v-text-field
          v-model="loginForm.email"
          :rules="emailRules"
          :label="$t('form.email')"
          required
          outlined
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
      <p class="mt-5">{{ $t('not_have_account') }} <NuxtLink :to='localePath("register")'>{{ $t('register') }}</NuxtLink></p>
    </v-card>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
// import router from "@/router";

export default {
  name: "login",
  middleware: 'logger',
  data: () => ({
    loading: false,
    valid: true,
    show1: false,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    loginForm: {
      email: '',
      password: '',
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
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
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch("auth/LogIn", this.loginForm);
      } else {
        this.$refs.form.validate();
      }
    },
  },
  // beforeMount() {
  //   store.dispatch("auth/checkAuth");
  // }
};
</script>

<style scoped>

</style>
