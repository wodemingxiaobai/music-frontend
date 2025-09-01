<template>
    <div class="search-container">
      <!-- 搜索框区域 -->
      <div class="search-box">
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="输入歌曲名搜索..."
          @keyup.enter="handleSearch"
          class="search-input"
        >
        <button @click="handleSearch" class="search-btn">
          <i class="fas fa-search"></i> 搜索
        </button>
      </div>
  
      <!-- 加载状态 -->
      <div v-if="isLoading" class="loading">
        <i class="fas fa-spinner fa-spin"></i> 搜索中...
      </div>
  
      <!-- 错误提示 -->
      <div v-if="errorMsg" class="error">
        <i class="fas fa-exclamation-circle"></i> {{ errorMsg }}
      </div>
  
      <!-- 搜索结果区域 -->
      <div v-if="!isLoading && !errorMsg && searchResult.length" class="search-result">
        <h3 class="result-title">
          搜索结果: "{{ searchKeyword }}" ({{ searchResult.length }})
        </h3>
        
        <div class="song-list">
          <div 
            class="song-item" 
            v-for="song in searchResult" 
            :key="song.id"
            @click="playSong(song)"
          >
            <div class="song-info">
              <h4 class="song-name">{{ song.name }}</h4>
              <p class="song-meta">
                {{ song.singer }} · {{ song.album }}
              </p>
            </div>
            <div class="song-duration">{{ song.duration }}</div>
            <button class="play-btn">
              <i class="fas fa-play"></i>
            </button>
          </div>
        </div>
      </div>
  
      <!-- 无结果提示 -->
      <div v-if="!isLoading && !errorMsg && !searchResult.length && searchKeyword" class="no-result">
        <i class="fas fa-music"></i> 没有找到与 "{{ searchKeyword }}" 相关的歌曲
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex'
  import { formatDuration } from '@/utils/format' // 引入时长格式化工具
  
  export default {
    data() {
      return {
        searchKeyword: '', // 搜索关键词
        timer: null // 用于防抖的定时器
      }
    },
    computed: {
      ...mapGetters('search', [
        'searchResult', // 搜索结果
        'isLoading',    // 加载状态
        'errorMsg'      // 错误信息
      ])
    },
    methods: {
      ...mapActions('search', ['fetchSearchResult']),
      ...mapActions('player', ['playSong']),
  
      /**
       * 处理搜索
       */
      handleSearch() {
        // 去除空格并验证
        const keyword = this.searchKeyword.trim()
        if (!keyword) {
          this.errorMsg = '请输入搜索关键词'
          return
        }
  
        // 防抖处理：避免频繁输入时多次请求
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // 调用Vuex action发送搜索请求
          this.fetchSearchResult(keyword)
        }, 300) // 300毫秒防抖
      },
  
      /**
       * 播放搜索结果中的歌曲
       */
      playSong(song) {
        this.playSong(song)
      }
    }
  }
  </script>
  
  <style scoped>
  .search-container {
    max-width: 800px;
    margin: 30px auto;
    padding: 0 20px;
  }
  
  .search-box {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
  }
  
  .search-input {
    flex: 1;
    padding: 12px 15px;
    border: 2px solid #eee;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s;
  }
  
  .search-input:focus {
    outline: none;
    border-color: #3498db;
  }
  
  .search-btn {
    padding: 0 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  .search-btn:hover {
    background-color: #2980b9;
  }
  
  .loading, .error, .no-result {
    text-align: center;
    padding: 40px 0;
    color: #666;
    font-size: 16px;
  }
  
  .error {
    color: #e74c3c;
  }
  
  .result-title {
    margin-bottom: 20px;
    color: #333;
    font-size: 18px;
  }
  
  .song-list {
    border-top: 1px solid #f0f0f0;
  }
  
  .song-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .song-item:hover {
    background-color: #f9f9f9;
  }
  
  .song-info {
    flex: 1;
  }
  
  .song-name {
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
  }
  
  .song-meta {
    font-size: 14px;
    color: #666;
  }
  
  .song-duration {
    color: #999;
    font-size: 14px;
    margin-right: 20px;
  }
  
  .play-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #f0f0f0;
    border: none;
    color: #3498db;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  
  .song-item:hover .play-btn {
    background-color: #3498db;
    color: white;
  }
  </style>
  