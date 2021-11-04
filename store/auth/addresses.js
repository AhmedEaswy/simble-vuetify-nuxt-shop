export const state = () => ({
  addresses: null,
  logProccess: null,
})

export const getters = {
  addresses: state => state.addresses,
  logProccess: state => state.logProccess,
}

export const mutations = {
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses.data.data
  },
  ADD_ADDRESSE(state, addresse) {
    state.addresses = [addresse, ...state.addresses];
  },
  REMOVE_ADDRESSE(state, addresse) {
    if(state.addresses.find((item) => item.id === addresse.id)) {
      state.addresses = state.addresses.filter(item => item.id != addresse.id)
    }
  },
  EDIT_ADDRESSE(state, addresse) {
    state.addresses.map((item) => {
      if (item.id === addresse.id) {
        item.name = addresse.name;
        item.city = addresse.city;
        item.details = addresse.city;
        item.notes = addresse.city;
        item.longitude = addresse.city;
        item.longitude = addresse.city;
      }
    })
  }
}
export const actions = {
  getAddresses(vuexContext) {
    if(!vuexContext.state.addresses) {
      vuexContext.state.logProccess = true;
      this.$axios.get(
        'addresses',
        {
          headers: {
            "lang": this.$cookiz.get('lang') || "en",
            "Content-Type": "application/json",
            "Authorization": this.$cookiz.get('token')
          }
        }
      ).then(res => {
        vuexContext.state.logProccess = false;
        vuexContext.commit("SET_ADDRESSES", res.data);
      })
    }

  },

  addAddresses(vuexContext, Address) {
    vuexContext.state.logProccess = true;
    this.$axios.post(
      'addresses',
      {
        "name": Address.name,
        "city": Address.city,
        "region": Address.region,
        "details": Address.details,
        "notes": Address.notes,
        "latitude": "00.00",
        "longitude": "00.00",
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
        vuexContext.commit("ADD_ADDRESSE", res.data.data)
        vuexContext.state.logProccess = false;
      }
    })
  },

  deleteAddresses({ commit, state }, address) {
    state.logProccess = true;
    this.$axios.delete(
      `addresses/${address.id}`,
      {
        headers: {
          "lang": this.$cookiz.get('lang') || "en",
          "Content-Type": "application/json",
          "Authorization": this.$cookiz.get('token')
        }
      }
    ).then(res => {
      if (res.data.status === true) {
        commit("REMOVE_ADDRESSE", res.data.data)
        state.logProccess = false;
      }
    })
  },

  editAddresses({ commit, state }, address) {
    state.logProccess = true;
    this.$axios.put(
      `addresses/${address.id}`,
      {
        "name": address.name,
        "city": address.city,
        "region": address.region,
        "details": address.details,
        "notes": address.notes,
        "latitude": "00.00",
        "longitude": "00.00",
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
        commit("EDIT_ADDRESSE", res.data.data)
        state.logProccess = false;
      }
    })
  },

}
