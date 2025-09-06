<!-- src/components/SongItem/index.vue -->
<template>
    <div class="song-item-container">
        <el-table :data="song" border stripe style="width: 100%; margin-top: 20px;" :row-class-name="tableRowClassName">
            <!-- 序号列 -->
            <el-table-column label="序号" width="60" align="center">
                <template #default="scope">
                    <span class="index-number">{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>

            <!-- 专辑封面 + 歌曲名 -->
            <el-table-column label="歌曲信息" min-width="400">
                <template #default="scope">
                    <div class="song-info">
                        <div class="album-cover-container">
                            <el-image :src="scope.row.Image.replace('{size}', '100')" :alt="scope.row.OriSongName"
                                class="album-cover" fit="cover"></el-image>
                            <div class="play-icon-hover">
                                <i class="el-icon-play"></i>
                            </div>
                        </div>
                        <div class="song-detail">
                            <div class="song-title">{{ scope.row.OriSongName }}</div>
                            <div class="song-artist">{{ scope.row.SingerName }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>

            <!-- 专辑列 -->
            <el-table-column prop="AlbumName" label="专辑" min-width="200">
                <template #default="scope">
                    <div class="album-name">{{ scope.row.AlbumName || '未知专辑' }}</div>
                </template>
            </el-table-column>

            <!-- 时长列 -->
            <el-table-column label="时长" width="100" align="center">
                <template #default="scope">
                    {{ formatDuration(scope.row.Duration) }}
                </template>
            </el-table-column>

            <!-- 操作列 -->
            <el-table-column label="操作" width="120" align="center">
                <template #default="scope">
                    <el-button type="primary" round icon="el-icon-play" size="mini" @click="handlePlay(scope.row)"
                        class="play-button">播放</el-button>
                    <el-button round icon="el-icon-add" size="mini" @click="handleAdd(scope.row)"
                        class="add-button">收藏</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex'
export default {
    name: 'SongItem',
    props: {
        song: {
            type: Array,
            required: true,
            default: () => []
        },
    },
    methods: {
        ...mapActions('search', ['getSong']),
        ...mapActions('player', ['playSong']),
        formatDuration(seconds) {
            if (!seconds) return '00:00'
            const minute = Math.floor(seconds / 60)
            const second = seconds % 60
            return `${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
        },
        tableRowClassName({ row, rowIndex }) {
            return 'custom-table-row';
        },
        async handlePlay(row) {
            const loading = this.$loading({
                text: '正在加载音乐...',
                lock:true,
                fullscreen: true,
                background: 'rgba(255, 255, 255, 0.7)'
            })
            try {
                console.log('点击按钮后的当前歌曲',row);
                // 调用Vuex action播放歌曲
                await this.playSong(row)

            } catch (error) {
                console.error('播放失败:', error)
                this.$message.error('播放失败，请稍后重试')

            } finally {
                loading.close()
            }
        },
        handleAdd(row) {
            // 添加到播放列表逻辑
            this.$emit('add-to-playlist', row);
        }
    }
}
</script>
  
<style scoped lang="less">
.song-item-container {
    .el-table {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

        &::before {
            height: 0;
        }

        .el-table__header th {
            background-color: #f7f8fa;
            font-weight: 600;
            color: #333;
            border-bottom: 1px solid #eee;
        }
    }

    .custom-table-row {
        transition: background-color 0.3s;

        &:hover {
            background-color: #f7f8fa;
        }
    }

    .index-number {
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 50%;
        font-size: 12px;
        color: #666;

        &:hover {
            background-color: #3498db;
            color: white;
        }
    }

    .song-info {
        display: flex;
        align-items: center;
        padding: 8px 0;
    }

    .album-cover-container {
        position: relative;
        width: 60px;
        height: 60px;
        margin-right: 15px;

        .album-cover {
            width: 60px;
            height: 60px;
            border-radius: 4px;
            transition: transform 0.3s;
        }

        .play-icon-hover {
            position: absolute;
            right: -5px;
            bottom: -5px;
            width: 28px;
            height: 28px;
            background-color: #3498db;
            border-radius: 50%;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: all 0.3s;

            i {
                font-size: 14px;
                margin-left: 2px;
            }
        }

        &:hover {
            .album-cover {
                transform: scale(1.05);
            }

            .play-icon-hover {
                opacity: 1;
            }
        }
    }

    .song-detail {
        overflow: hidden;

        .song-title {
            font-weight: 500;
            color: #333;
            margin-bottom: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: color 0.3s;

            &:hover {
                color: #3498db;
            }
        }

        .song-artist {
            font-size: 12px;
            color: #999;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .album-name {
        color: #666;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: color 0.3s;

        &:hover {
            color: #3498db;
            text-decoration: underline;
        }
    }

    .play-button {
        background-color: #3498db;
        border-color: #3498db;
        margin-right: 5px;

        &:hover {
            background-color: #2980b9;
            border-color: #2980b9;
        }
    }

    .add-button {
        background-color: transparent;
        color: #666;
        border-color: #ddd;

        &:hover {
            color: #3498db;
            border-color: #3498db;
            background-color: rgba(52, 152, 219, 0.05);
        }
    }
}
</style>