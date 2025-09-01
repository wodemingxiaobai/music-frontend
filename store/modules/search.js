import api from "@/api";
const state = {
    recommendedSongs:[]
};
const actions = {
    async getrecommendedSongs({commit}){
        let recommendedSongs=await api.getrecommendedSongs(1);
        commit('GetrecommendedSongs',recommendedSongs);
        console.log('音乐推荐数据是',recommendedSongs);
    }
};
const mutations = {
    GetrecommendedSongs(state,value){
        state.recommendedSongs=value || []
    }
};
const getters = {};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
