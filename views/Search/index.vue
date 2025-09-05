<!-- src/views/Search/index.vue -->
<template>
  <!-- 优化v-loading样式：添加文字提示、居中加载动画 -->
  <div class="search-container">
    <!-- 搜索结果标题区 -->
    <div class="search-header">
      <h2>搜索结果: <span class="keyword">{{ keyword }}</span></h2>
      <p v-if="searchSongLists.length > 0" class="result-count">找到 {{ total }} 首歌曲</p>
      <p v-else class="no-result">未找到相关歌曲，请尝试其他关键词</p>
    </div>

    <!-- 搜索结果列表 -->
    <div class="song-list" v-show="searchSongLists.length > 0">
      <SongItem :song="searchSongLists"></SongItem>
    </div>

    <!-- 分页控件 -->
    <div class="pagination-container">
      <el-pagination background layout="prev, pager, next, jumper, ->, total" :total="total" :page-size="pageSize"
        :current-page="currentPage" @current-change="handlePageChange" @size-change="handleSizeChange"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
     keyword:'',
      songUrls: {}, // 存储歌曲URL的缓存
      currentPage: 1, // 当前页码，默认第1页
      pageSize: 30 // 每页条数，默认30条（与接口默认一致）
    }
  },
  computed: {
    ...mapGetters('search', ['searchSongLists', 'pagesize', 'total']),
    
  },

  methods: {
    ...mapActions('search', ['getSearchSong']),
    // 封装搜索逻辑，精确控制加载状态
    async fetchSearchData() {
      if (!this.keyword.trim()) return

      // 1. 显示加载动画，并保存实例
      const loadingInstance = this.$loading({
        text: '正在搜索音乐...',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.8)',
        fullscreen: true
      })

      try {
        // 2. 执行搜索
        await this.getSearchSong({
          keyword: this.keyword,
          page: this.currentPage,
          pagesize: this.pageSize
        })
      } catch (error) {
        console.error('搜索失败:', error)
        this.$message.error('搜索失败，请稍后重试')
      } finally {
        // 3. 无论成功失败，都关闭加载（关键：调用实例的close方法）
        loadingInstance.close()
      }
    },
    // 页码变化时触发
    handlePageChange(page) {
      this.currentPage = page
      this.fetchSearchData() // 重新请求当前页数据
    },

    // 每页条数变化时触发
    handleSizeChange(size) {
      this.pageSize = size
      this.currentPage = 1 // 重置为第1页
      this.fetchSearchData() // 重新请求数据
    },

  },
  created() {
    this.keyword = this.$route.params.keyword || '';
  },
  mounted() {
    console.log('被挂载了');
    this.fetchSearchData() // 调用封装的方法
  },
  // 监听路由参数变化，重新搜索（比如从A关键词切换到B关键词）
  watch: {
    '$route.params.keyword'() {
      this.currentPage=1
      this.keyword=this.$route.params.keyword
      this.fetchSearchData()
    }
  }
}
</script>

<style scoped lang="less">
// 基础容器样式
.search-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #fff;
  min-height: calc(100vh - 160px); // 减去header和footer高度

  .pagination-container {
    margin-top: 30px;
    text-align: center; // 分页居中
  }
}

// 搜索结果标题区
.search-header {
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f2f5;

  h2 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 10px;
    font-weight: 600;

    .keyword {
      color: #3498db;
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }

  .result-count {
    color: #666;
    font-size: 0.95rem;
    padding-left: 5px;
  }

  .no-result {
    color: #999;
    font-size: 1rem;
    padding: 20px 0;
    text-align: center;
  }
}

// 歌曲列表容器样式
.song-list {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  // 穿透修改SongItem组件内的表格样式
  ::v-deep .el-table {
    border: none;

    &::before {
      height: 0; // 去除表格底部边框
    }
  }

  // 表头样式
  ::v-deep .el-table__header-wrapper th {
    background-color: #f7f8fa;
    color: #666;
    font-weight: 500;
    height: 50px;
    border-bottom: 1px solid #f0f2f5;
  }

  // 表格行样式
  ::v-deep .el-table__body-wrapper tr {
    height: 80px;
    transition: background-color 0.2s;

    &:hover>td {
      background-color: #f7faff !important;
    }

    &:nth-child(even) {
      background-color: #fcfcfc;
    }
  }

  // 单元格样式
  ::v-deep .el-table__body-wrapper td {
    border-bottom: 1px solid #f0f2f5;
    padding: 10px 0;
  }

  // 歌曲信息单元格样式
  ::v-deep .song-info {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 5px 0;

    .album-cover {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .song-detail {
      line-height: 1.5;

      .song-title {
        font-weight: 500;
        color: #333;
        transition: color 0.2s;

        &:hover {
          color: #3498db;
        }
      }

      .song-artist {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }

  // 操作按钮样式
  ::v-deep .el-button {
    transition: all 0.2s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .search-container {
    padding: 20px 15px;
  }

  .search-header h2 {
    font-size: 1.5rem;
  }

  ::v-deep .song-info {
    gap: 10px;

    .album-cover {
      width: 50px;
      height: 50px;
    }
  }

  // 隐藏专辑列以适应小屏幕
  ::v-deep .el-table-column:nth-child(2) {
    display: none;
  }
}
</style>