<template>
    <div class="home-container">
        <!-- 页面标题区 -->
        <div class="page-header">
            <h1 class="site-title">Pure Music</h1>
            <p class="site-desc">专注于纯粹的音乐体验</p>
        </div>

        <!-- <!~~ 推荐歌曲区域 ~~>
      <section class="recommended-songs section">
        <div class="section-header">
          <h2>为你推荐</h2>
          <button class="see-all" @click="viewAll('recommended')">查看全部</button>
        </div>
        
        <div class="song-grid">
          <div 
            class="song-card" 
            v-for="song in recommendedSongs" 
            :key="song.id"
            @click="playSong(song)"
          >
            <div class="song-cover">
              <img :src="song.coverUrl" alt="歌曲封面: {{ song.name }}" class="cover-img">
              <div class="play-icon">
                <i class="fas fa-play"></i>
              </div>
            </div>
            <h3 class="song-title">{{ song.name }}</h3>
            <p class="song-artist">{{ song.artist }}</p>
          </div>
        </div>
      </section>
  
      <!~~ 热门榜单区域 ~~>
      <section class="top-charts section">
        <div class="section-header">
          <h2>热门播放</h2>
          <button class="see-all" @click="viewAll('charts')">查看全部</button>
        </div>
        
        <div class="charts-list">
          <div 
            class="chart-item" 
            v-for="(song, index) in topCharts" 
            :key="song.id"
            @click="playSong(song)"
          >
            <div class="chart-rank">
              <span :class="{ 'top-3': index < 3 }">{{ index + 1 }}</span>
            </div>
            <div class="chart-info">
              <h4 class="chart-song">{{ song.name }}</h4>
              <p class="chart-artist">{{ song.artist }}</p>
            </div>
            <div class="chart-playcount">
              {{ formatPlayCount(song.playCount) }}
            </div>
            <button class="chart-play-btn">
              <i class="fas fa-play"></i>
            </button>
          </div>
        </div>
      </section>
  
      <!~~ 分类歌单区域 ~~>
      <section class="playlists section">
        <div class="section-header">
          <h2>精选歌单</h2>
          <button class="see-all" @click="viewAll('playlists')">查看全部</button>
        </div>
        
        <div class="playlist-grid">
          <div 
            class="playlist-card" 
            v-for="playlist in featuredPlaylists" 
            :key="playlist.id"
            @click="goToPlaylist(playlist.id)"
          >
            <div class="playlist-cover">
              <img :src="playlist.coverUrl" alt="歌单封面: {{ playlist.name }}" class="playlist-img">
              <div class="song-count">
                <i class="fas fa-music"></i>
                <span>{{ playlist.songCount }}</span>
              </div>
            </div>
            <h3 class="playlist-title">{{ playlist.name }}</h3>
          </div>
        </div>
      </section>-->
    </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'Home',
    data() {
        return {
            // // 推荐歌曲数据
            // recommendedSongs: [],
            // // 热门榜单数据
            // topCharts: [],
            // // 精选歌单数据
            // featuredPlaylists: []
        }
    },
    mounted() {
        this.getrecommendedSongs();
    },
    computed: {
        //存放vuex的数据
        ...mapState('recommend', ['recommendedSongs'])
    },
    methods: {
        //存放vuex的数据
        ...mapActions('recommend', ['getrecommendedSongs'])
    },



}
</script>
  
<style lang="less" scoped>
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.page-header {
    text-align: center;
    margin: 40px 0 60px;
}

.site-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #3498db, #9b59b6);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.site-desc {
    font-size: 1.1rem;
    color: #666;
}

.section {
    margin-bottom: 80px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.section-header h2 {
    font-size: 1.8rem;
    font-weight: 600;
    position: relative;
    padding-left: 10px;
}

.section-header h2::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 70%;
    background-color: #3498db;
    border-radius: 2px;
}

.see-all {
    background: none;
    border: none;
    color: #3498db;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    transition: color 0.3s;
}

.see-all:hover {
    color: #2980b9;
}

.see-all i {
    margin-left: 5px;
    font-size: 0.8rem;
}

/* 推荐歌曲样式 */
.song-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 25px;
}

.song-card {
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    padding: 10px;
    border-radius: 8px;
}

.song-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.song-cover {
    position: relative;
    width: 100%;
    padding-top: 100%;
    /* 正方形比例 */
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
}

.cover-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.song-card:hover .cover-img {
    transform: scale(1.05);
}

.play-icon {
    position: absolute;
    right: 10px;
    bottom: 10px;
    width: 40px;
    height: 40px;
    background-color: #3498db;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s, transform 0.3s;
}

.song-card:hover .play-icon {
    opacity: 1;
    transform: translateY(0);
}

.song-title {
    font-weight: 600;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.song-artist {
    font-size: 0.9rem;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 热门榜单样式 */
.charts-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.chart-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 8px;
    transition: background-color 0.3s;
    cursor: pointer;
}

.chart-item:hover {
    background-color: #f5f7fa;
}

.chart-rank {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-right: 15px;
}

.top-3 {
    color: #e74c3c;
    font-size: 1.2rem;
}

.chart-info {
    flex: 1;
}

.chart-song {
    font-weight: 500;
    margin-bottom: 3px;
}

.chart-artist {
    font-size: 0.85rem;
    color: #666;
}

.chart-playcount {
    color: #999;
    font-size: 0.85rem;
    margin-right: 15px;
}

.chart-play-btn {
    background: none;
    border: none;
    color: #999;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s, background-color 0.3s, color 0.3s;
}

.chart-item:hover .chart-play-btn {
    opacity: 1;
}

.chart-play-btn:hover {
    background-color: #3498db;
    color: white;
}

/* 精选歌单样式 */
.playlist-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 25px;
}

.playlist-card {
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    padding: 10px;
    border-radius: 8px;
}

.playlist-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.playlist-cover {
    position: relative;
    width: 100%;
    padding-top: 100%;
    /* 正方形比例 */
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
}

.playlist-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
}

.playlist-card:hover .playlist-img {
    transform: scale(1.05);
}

.song-count {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 0.8rem;
    padding: 3px 8px;
    border-radius: 12px;
    display: flex;
    align-items: center;
}

.song-count i {
    margin-right: 5px;
    font-size: 0.7rem;
}

.playlist-title {
    font-weight: 600;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
}

/* 响应式调整 */
@media (max-width: 768px) {

    .song-grid,
    .playlist-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    }

    .site-title {
        font-size: 2rem;
    }

    .section-header h2 {
        font-size: 1.5rem;
    }

    .chart-playcount {
        display: none;
    }
}</style>
  
