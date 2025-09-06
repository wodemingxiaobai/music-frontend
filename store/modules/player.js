// src/store/modules/player.js
import api from "@/api";

const state = {
  currentSong: {}, // 当前播放歌曲
  currentSongUrl: "", // 当前播放歌曲URL
  isPlaying: false, // 是否正在播放
  playList: [], // 播放列表
  currentIndex: -1, // 当前播放索引
};

const actions = {
  // 播放歌曲
  async playSong({ commit, state, dispatch }, song) {
    try {
      // 检查歌曲是否已在播放列表中
      let index = state.playList.findIndex(
        (item) => item.FileHash === song.FileHash
      );

      // 如果不在播放列表中，则添加
      if (index === -1) {
        // 获取歌曲URL
        const response = await api.getSongUrl(song.FileHash);
        const songUrl = response.backupUrl || ""; // 假设backupUrl是mp3地址
        commit("ADD_TO_PLAYLIST", response);

        index = state.playList.length - 1;
        // 更新当前索引
        commit("SET_CURRENT_INDEX", index);

        // 更新当前歌曲和URL
        commit("SET_CURRENT_SONG", song);
        commit("SET_CURRENT_SONG_URL", songUrl);
      }
      //反正没人要返回值一律视为只要主义真即可
      return true;
    } catch (error) {
      console.error("获取歌曲播放地址失败:", error);
      throw error;
    }
  },

  // 设置播放状态
  setPlayingState({ commit }, isPlaying) {
    commit("SET_PLAYING_STATE", isPlaying);
  },

  // 添加到播放列表
  addToPlayList({ commit }, song) {
    commit("ADD_TO_PLAYLIST", song);
  },
};

const mutations = {
  SET_CURRENT_SONG(state, song) {
    state.currentSong = song;
  },
  SET_CURRENT_SONG_URL(state, url) {
    state.currentSongUrl = url;
  },
  SET_PLAYING_STATE(state, isPlaying) {
    state.isPlaying = isPlaying;
  },
  ADD_TO_PLAYLIST(state, song) {
    // 避免重复添加
    const exists = state.playList.some(
      (item) => item.FileHash === song.FileHash
    );
    if (!exists) {
      state.playList.push(song);
    }
  },
  SET_CURRENT_INDEX(state, index) {
    state.currentIndex = index;
  },
};

const getters = {
  // 可以添加一些计算属性
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
