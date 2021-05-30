import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authorizeId: null
  },
  mutations: {
    authorizeId(state, payload) {
      state.authorizeId = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
