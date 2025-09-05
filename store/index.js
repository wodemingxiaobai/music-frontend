import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import recommend from './modules/recommend'
import search from './modules/search'
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
    search,
  }
})
