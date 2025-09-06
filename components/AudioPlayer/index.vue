<template>
  <!-- 使用v-show替代v-if，确保DOM元素始终存在 -->
  <div class="audio-player" v-show="currentSong">
    <!-- 小型播放器 (默认显示) -->
    <div class="mini-player" @click="showDetail = true" v-show="!showDetail">
      <div class="player-info">
        <h4 class="song-title">{{ currentSong.OriSongName || '暂无播放歌曲' }}</h4>
        <p class="song-artist">{{ currentSong.SingerName || '无名' }}</p>
      </div>

      <div class="player-controls">
        <button class="control-btn" @click.stop="prevSong" :disabled="playList.length <= 1">
          <i class="el-icon-arrow-left"></i>
        </button>
        <button class="play-btn" @click.stop="togglePlay">
          <i v-if="isPlaying" class="el-icon-video-pause"></i>
          <i v-else class="el-icon-video-play"></i>
        </button>
        <button class="control-btn" @click.stop="nextSong" :disabled="playList.length <= 1">
          <i class="el-icon-arrow-right"></i>
        </button>
      </div>

      <div class="progress-container">
        <span class="demonstration">
          
        </span>
        <el-slider v-model="progress" @change.stop="changeProgressBySlider" :step="0.01"
          :show-tooltip="false"></el-slider>
        <span class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
      </div>
    </div>

    <!-- 详细播放器 (点击小型播放器后显示) -->
    <div class="detail-player" v-show="showDetail">
      <!-- 内容保持不变 -->
      <div class="detail-header">
        <h3>正在播放</h3>
        <button class="close-btn" @click="showDetail = false">
          <i class="el-icon-close"></i>
        </button>
      </div>

      <div class="detail-body">
        <div class="album-cover">
          <img :src="currentSong && currentSong.Image ? currentSong.Image.replace('{size}', '300') : ''"
            :alt="currentSong.OriSongName || '专辑封面'" />
        </div>

        <div class="song-info">
          <h2>{{ currentSong.OriSongName || '未知歌曲' }}</h2>
          <p>{{ currentSong.SingerName || '未知歌手' }}</p>
          <p>{{ currentSong.AlbumName || '未知专辑' }}</p>
        </div>

        <!-- 音量条 -->
        <div class="audio-controls">
          <div class="volume-control">
            <i class="el-icon-volume-up"></i>
            <el-slider v-model="volume" @change="changeVolume" :step="1" :show-tooltip="false"></el-slider>
          </div>

          <!-- 歌曲进度条 -->
          <div class="progress-detail">
            <span>{{ formatTime(currentTime) }}</span>
            <el-slider v-model="progress" @change="changeProgressBySlider" :step="0.01" :show-tooltip="false"></el-slider>
            <span>{{ formatTime(duration) }}</span>
          </div>

          <div class="control-buttons">
            <button @click="prevSong" :disabled="playList.length <= 1"><i class="el-icon-arrow-left"></i></button>
            <button class="big-play-btn" @click="togglePlay">
              <i v-if="isPlaying" class="el-icon-video-pause"></i>
              <i v-else class="el-icon-video-play"></i>
            </button>
            <button @click="nextSong" :disabled="playList.length <= 1"><i class="el-icon-arrow-right"></i></button>
            <button @click="downloadSong" :disabled="!currentSongUrl"><i class="el-icon-download"></i> 下载</button>
          </div>
        </div>

        <div class="lyrics-container">
          <h4>歌词</h4>
          <div class="lyrics">
            <p v-if="!lyrics.length">暂无歌词</p>
            <p v-for="(line, index) in lyrics" :key="index" :class="{ 'active-lyric': currentLyricIndex === index }">
              {{ line }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 音频元素 (始终存在于DOM中) -->
    <audio ref="audio" :src="currentSongUrl" @timeupdate="updateProgress" @loadedmetadata="updateDuration"
      @ended="handleEnded" :volume="volume / 100" preload="none" style="display: none;">
    </audio>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AudioPlayer',
  data() {
    return {
      showDetail: false,
      currentTime: 0,
      duration: 0,
      progress: 0,
      volume: 80,
      lyrics: [],
      currentLyricIndex: -1,
      lyricTimer: null,
      isLoading: false
    }
  },
  computed: {
    ...mapState({
      currentSong: state => state.player.currentSong,
      currentSongUrl: state => state.player.currentSongUrl,
      isPlaying: state => state.player.isPlaying,
      playList: state => state.player.playList,
      currentIndex: state => state.player.currentIndex
    }),
    PreOrNextAble() {

    }
  },
  watch: {
    currentSongUrl(newVal, oldVal) {
      // 2. 新值有效且和旧值不同，才加载（避免重复加载）
      if (newVal && newVal !== oldVal) {
        this.$nextTick(() => {
          this.loadAndPlayAudio(newVal); // 调用你的加载播放方法
        });
      }
    },
    currentSong(newVal) {
      if (newVal && newVal.FileHash && this.showDetail) {
        this.loadLyrics(newVal)
      } else {
        this.lyrics = []
      }
    }
  },
  methods: {
    ...mapActions('player', ['playSong', 'setPlayingState', 'setCurrentSongUrl']),


    // 加载并播放音频，增加安全检查
    async loadAndPlayAudio(url) {
      if (!this.currentSongUrl) {
        console.warn('音频地址无效');
        return;
      }
      try {
        // 检查音频元素是否存在
        if (!this.$refs.audio) {
          console.warn('音频元素尚未准备好')
          // 等待元素准备好再试一次
          await new Promise(resolve => setTimeout(resolve, 100))
          if (!this.$refs.audio) {
            throw new Error('无法获取音频元素')
          }
        }

        this.isLoading = true
        const audio = this.$refs.audio

        // 使用可选链操作符增加安全性
        if (!audio.paused) {
          await audio.pause()
        }

        this.currentTime = 0
        this.progress = 0


        audio.src = url; // 设置有效 url
        audio.load(); // 手动触发加载（因为 preload="none"）

        // 等待音频可以播放
        await new Promise((resolve, reject) => {
          const handleCanPlay = () => {
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('error', handleError)
            resolve()
          }

          const handleError = (e) => {
            audio.removeEventListener('canplay', handleCanPlay)
            audio.removeEventListener('error', handleError)
            reject(new Error('音频加载失败'))
          }

          audio.addEventListener('canplay', handleCanPlay)
          audio.addEventListener('error', handleError)

          // 超时处理
          setTimeout(() => {
            reject(new Error('音频加载超时'))
          }, 10000)
        })

        await audio.play()
        this.setPlayingState(true)
        this.startLyricSync()
      } catch (error) {
        console.error('音频加载播放失败:', error)
        this.setPlayingState(false)
        this.$message.error('播放失败: ' + error.message)
      } finally {
        this.isLoading = false
      }
    },

    // 播放/暂停切换
    async togglePlay() {
      if (this.isLoading) return

      // 检查音频元素是否存在
      if (!this.$refs.audio) {
        this.$message.warning('播放器尚未准备好')
        return
      }

      if (this.isPlaying) {
        this.pause()
      } else {
        try {
          await this.$refs.audio.play()
          this.setPlayingState(true)
          this.startLyricSync()
        } catch (error) {
          console.error('播放失败:', error)
          this.$message.error('播放失败，请稍后重试')
        }
      }
    },

    // 其他方法保持不变...
    pause() {
      if (this.$refs.audio) {
        this.$refs.audio.pause()
      }
      this.setPlayingState(false)
      this.stopLyricSync()
    },

    prevSong() {
      if (this.playList.length <= 1) return

      let index = this.currentIndex - 1
      if (index < 0) index = this.playList.length - 1

      this.playSong(this.playList[index])
    },

    nextSong() {
      if (this.playList.length <= 1) return

      let index = this.currentIndex + 1
      if (index >= this.playList.length) index = 0

      this.playSong(this.playList[index])
    },

    updateProgress() {
      if (!this.$refs.audio) return

      const audio = this.$refs.audio
      this.currentTime = audio.currentTime
      this.duration = audio.duration
      this.progress = (this.currentTime / this.duration) * 100 || 0
    },

    updateDuration() {
      if (this.$refs.audio) {
        this.duration = this.$refs.audio.duration
      }
    },

    changeProgress(e) {
      if (!this.$refs.audio) return

      const rect = e.currentTarget.getBoundingClientRect()
      const pos = (e.clientX - rect.left) / rect.width
      this.$refs.audio.currentTime = pos * this.duration
      this.progress = pos * 100
    },

    changeProgressBySlider(value) {
      if (this.$refs.audio) {
        this.$refs.audio.currentTime = (value / 100) * this.duration
      }
      this.progress = value
    },

    changeVolume(value) {
      this.volume = value
      if (this.$refs.audio) {
        this.$refs.audio.volume = value / 100
      }
    },

    handleEnded() {
      this.nextSong()
    },

    handleAudioError(error) {
      console.error('音频错误:', error)
      this.setPlayingState(false)
      this.$message.error('音频播放出错，请尝试其他歌曲')
    },

    formatTime(seconds) {
      if (isNaN(seconds)) return '00:00'
      const minutes = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    },

    loadLyrics(song) {
      this.lyrics = [
        `[00:00.00] 正在播放: ${song.OriSongName || '未知歌曲'}`,
        `[00:10.00] 演唱: ${song.SingerName || '未知歌手'}`,
        '[00:20.00] 歌词加载中...'
      ]
    },

    startLyricSync() {
      this.stopLyricSync()
      this.lyricTimer = setInterval(() => {
        this.syncLyric()
      }, 1000)
    },

    stopLyricSync() {
      if (this.lyricTimer) {
        clearInterval(this.lyricTimer)
        this.lyricTimer = null
      }
    },

    syncLyric() {
      const currentSecond = Math.floor(this.currentTime)
      for (let i = this.lyrics.length - 1; i >= 0; i--) {
        const lyric = this.lyrics[i]
        const timeMatch = lyric.match(/\[(\d+):(\d+)\.(\d+)\]/)
        if (timeMatch) {
          const minute = parseInt(timeMatch[1])
          const second = parseInt(timeMatch[2])
          const totalSecond = minute * 60 + second

          if (currentSecond >= totalSecond) {
            this.currentLyricIndex = i
            break
          }
        }
      }
    },

    downloadSong() {
      if (!this.currentSongUrl) return

      const a = document.createElement('a')
      a.href = this.currentSongUrl
      a.download = `${this.currentSong.OriSongName || '未知歌曲'} - ${this.currentSong.SingerName || '未知歌手'}.mp3`
      document.body.appendChild(a)
      a.click()
      setTimeout(() => document.body.removeChild(a), 100)
    }
  },
  beforeDestroy() {
    this.stopLyricSync()
    if (this.$refs.audio) {
      this.$refs.audio.pause()
    }
  },
  mounted() {
    // 初始渲染时，如果 currentSongUrl 为空，手动清空 audio
    if (!this.currentSongUrl && this.$refs.audio) {
      this.$refs.audio.src = '';
    }
  }
}
</script>

<style scoped lang="less">
/* 样式保持不变 */
.audio-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;

  .mini-player {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    height: 60px;

    .player-info {
      flex: 1;
      margin-right: 20px;

      .song-title {
        font-weight: 500;
        margin: 0 0 3px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .song-artist {
        font-size: 12px;
        color: #666;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .player-controls {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .control-btn {
        background: none;
        border: none;
        color: #333;
        font-size: 18px;
        margin: 0 10px;
        cursor: pointer;

        &:hover {
          color: #3498db;
        }

        &:disabled {
          color: #ccc;
          cursor: not-allowed;
        }
      }

      .play-btn {
        background-color: #313132;
        color: white;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        cursor: pointer;

        &:hover {
          background-color: #2980b9;
        }
      }
    }

    .progress-container {
      flex: 2;

      .progress-bar {
        height: 4px;
        background-color: #eee;
        border-radius: 2px;
        cursor: pointer;

        .progress-played {
          height: 100%;
          background-color: #3498db;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      }

      .time-display {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
        display: inline-block;
      }
    }
  }

  .detail-player {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 20px;
    box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(0);
    transition: transform 0.3s ease;

    .detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      .close-btn {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #666;

        &:hover {
          color: #333;
        }
      }
    }

    .detail-body {
      display: flex;
      flex-direction: column;
      align-items: center;

      .album-cover {
        width: 200px;
        height: 200px;
        margin-bottom: 20px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.05);
          }
        }
      }

      .song-info {
        text-align: center;
        margin-bottom: 20px;

        h2 {
          margin: 0 0 10px 0;
          font-size: 20px;
        }

        p {
          margin: 5px 0;
          color: #666;
        }
      }

      .audio-controls {
        width: 100%;
        max-width: 600px;
        margin-bottom: 20px;

        .volume-control {
          display: flex;
          align-items: center;
          margin-bottom: 15px;

          i {
            margin-right: 10px;
            color: #666;
          }

          .el-slider {
            flex: 1;
          }
        }

        .progress-detail {
          display: flex;
          align-items: center;
          margin-bottom: 20px;

          span {
            font-size: 14px;
            color: #666;
            margin: 0 10px;
          }

          .el-slider {
            flex: 1;
          }
        }

        .control-buttons {
          display: flex;
          justify-content: center;
          align-items: center;

          button {
            background: none;
            border: none;
            font-size: 24px;
            margin: 0 15px;
            cursor: pointer;
            color: #333;

            &:hover {
              color: #3498db;
            }

            &:disabled {
              color: #ccc;
              cursor: not-allowed;
            }
          }

          .big-play-btn {
            width: 50px;
            height: 50px;
            background-color: #3498db;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            margin: 0 25px;
            box-shadow: 0 2px 8px rgba(52, 152, 219, 0.4);

            &:hover {
              background-color: #2980b9;
              color: white;
              transform: scale(1.05);
            }
          }
        }
      }

      .lyrics-container {
        width: 100%;
        max-width: 600px;
        height: 200px;
        overflow: hidden;
        border-top: 1px solid #eee;
        padding-top: 20px;

        .lyrics {
          height: 100%;
          overflow-y: auto;
          text-align: center;

          p {
            margin: 10px 0;
            color: #666;
            transition: all 0.3s ease;

            &.active-lyric {
              color: #3498db;
              font-weight: 500;
              transform: scale(1.05);
            }
          }
        }
      }
    }
  }
}</style>
