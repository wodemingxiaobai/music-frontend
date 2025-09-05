import api from "@/api";
import  {saveStroeToJson}  from "@/utils/storeJSON";

const state = {
  searchSong: {},
  song: {},
};
const actions = {
  //处理搜索歌曲的函数
  async getSearchSong({ commit }, { keyword, page, pagesize }) {
    let searchSong = await api.search(keyword, page, pagesize);
    commit("GetSearchSong", searchSong);
    console.log("音乐搜索数据是", searchSong);

    // // 生成 JSON 文件并下载
    // const jsonString = JSON.stringify(searchSong, null, 2);
    // const blob = new Blob([jsonString], { type: "application/json" });
    // const url = URL.createObjectURL(blob);

    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "search.json"; // 文件名固定为 search.json
    // document.body.appendChild(a);
    // a.click();

    // // 清理资源
    // document.body.removeChild(a);
    // URL.revokeObjectURL(url);
    // console.log("search.json 文件已生成，请保存");
  },

  //处理点击歌曲的函数
  async getSong({ commit }, hash) {
    if (hash) {
      let result=await api.getSongUrl(hash);
      saveStroeToJson(result,'songUrl.json')
      commit("GetSong", result);    
        
    }
  },
};
const mutations = {
  GetSearchSong(state, value) {
    state.searchSong = value || {};
  },
  GetSong(state, value) {
    state.song = value || {};
  },
};
const getters = {
  searchSongLists(state) {
    return state.searchSong.data?.lists || [];
  },
  pagesize(state) {
    return state.searchSong?.data?.pagesize || 0; // 同理处理
  },
  total(state) {
    return state.searchSong?.data?.total || 0; // 同理处理
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
