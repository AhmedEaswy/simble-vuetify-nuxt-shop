export const state = () => ({
  user: null,
  errorMessage: null,
  successMessage: null,
  logProccess: null
})

export const getters = {
  isAuthenticated: state => !!state.user,
  user: state => state.user,
  errorMessage: state => state.errorMessage,
  successMessage: state => state.successMessage,
  logProccess: state => state.logProccess
}

export const mutations = {

  SET_USER(state, user) {
    state.user = user;
  }

}

export const actions = {

  LogIn({ commit, state }, user) {
    state.logProccess = true;
    this.$axios.post(
      "login",
      {
        "email": user.email,
        "password": user.password
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.$cookiz.get("token")
        }
      }
    ).then(res => {
      if (res.data.status === true) {
        commit("SET_USER", res.data.data);
        this.$cookiz.set('token', res.data.data.token)
        $nuxt.$router.push('/profile');
      } else {
        state.errorMessage = res.data.message;
      }
      state.logProccess = false;
    });

  },

  register({ commit, state }, user) {
    state.logProccess = true;
    this.$axios.post(
      "register",
      {
        "email": user.email,
        "password": user.password,
        "name": user.name,
        "phone": user.phone,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "lang": this.$cookiz.get('lang') || "en"
        }
      }
    ).then(res => {
      if (res.data.status === true) {
        commit("SET_USER", res.data.data);
        this.$cookiz.set('token', res.data.data.token)
        $nuxt.$router.push('/profile');
      } else {
        state.errorMessage = res.data.message;
      }
      state.logProccess = false;
    });

  },

  updateProfile({ commit, state }, user) {
    state.logProccess = true;
    this.$axios.put(
      'update-profile',
      {
        "email": user.email,
        "password": user.password,
        "name": user.name,
        "phone": user.phone,
      },
      {
        headers: {
          "lang": this.$cookiz.get('lang') || "en",
          "Content-Type": "application/json",
          "Authorization": this.$cookiz.get('token')
        }
      }
    ).then(res => {
      if (res.data.status === true) {
        commit("SET_USER", res.data.data);
        state.logProccess = false;
        state.successMessage = res.data.message;
      } else {
        state.logProccess = false;
        state.errorMessage = res.data.message;
      }
    })

  },

  async tokenLogAuth({ commit, state }) {
    let lang = this.$cookiz.get("lang") || "en";
    if (this.$cookiz.get("token")) {
      await this.$axios.get(
        'profile',
        {
          headers: {
            "lang": lang,
            "Content-Type": "application/json",
            "Authorization": this.$cookiz.get("token")
          }
        }
      ).then(res => {
        if (res.data.status === true) {
          commit("SET_USER", res.data.data);
        }
      })
    }
  },

  logout({ commit, state }) {
    this.$cookiz.set('token', '');
    commit("SET_USER", null);
    this.$router.push("/")
  }

}



