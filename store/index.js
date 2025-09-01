import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import recommend from './modules/recommend'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    recommend,
  }
})
