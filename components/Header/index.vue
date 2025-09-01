<template>
  <div class="music-header">
    <div class="left-area">
      <!-- 品牌展示区 -->
      <div class="music-logo">
        <img src="@/assets/music-frontend.png" alt="">
      </div>
      <!-- 导航栏内容 -->
      <div class="music-menu">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-headset"></i>
              <span>推荐音乐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="2">
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span>专辑</span>
            </template>
          </el-menu-item>
          <el-menu-item index="3">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>音乐人</span>
            </template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="search-area">
      <el-input placeholder="搜索歌曲、专辑或歌手" clearable prefix-icon="el-icon-search" v-model="searchWord"
        class="custom-search"></el-input>
    </div>

    <div class="user-area">

      <div v-show="!isLogined" class="login-section"><el-button size="medium" round class="login-btn" @click="$router.push('/registerOrLogin')">登录/注册</el-button>
      </div>
      <div v-show="isLogined">
        <!-- 用户头像 -->

        <div class="user-section">
          <el-dropdown>
            <div class="user-info">
              <el-avatar size="medium" :src="userAvatarUrl" class="user-avatar"></el-avatar>
              <span class="user-name">用户</span>
              <i class="el-icon-arrow-down"></i>
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>收藏</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      activeIndex: '0',//默认选中的导航栏
      searchWord: '',
      isLogined: false,//是否已经登陆过了
      userAvatarUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",//用户头像
    }
  },
  methods: {
    handleSelect() {
      console.log('要选择了');
    }
  }
}
</script>

<style scoped lang="less">
.music-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  color: white;
  background-color: #fff;
  height: 80px;
  padding: 0 50px;
  box-sizing: border-box;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;


  //左侧区域
  .left-area {
    display: flex;
    align-items: center;
    gap: 40px;
    

    .music-logo {
      img {
        height: 80px;
        width: auto;
        object-fit: contain;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .music-menu {
      z-index: 1;
      .el-menu-demo {
        border-bottom: none;
      }

      .el-menu-item {
        padding: 0 20px;
        margin: 0 5px;
        height: 80px;
        line-height: 80px;
        font-size: 15px;
        transition: all 0.3s ease;
      

        &:hover {
          background-color: rgba(44, 62, 80, 0.03);
          color: #2c3e50;
        }

        i {
          margin-right: 8px;
          font-size: 16px;
        }

        &.is-active {
          position: relative;
          font-weight: 500;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: #3498db;
            border-radius: 3px 3px 0 0;
          }
        }
      }

    }
  }

  //搜索区域
  .search-area {
   
    
    width: 250px;

    .custom-search {
      height: 42px;
      border-radius: 21px;
      border-color: #e5e7eb;
      transition: all 0.3s ease;

      &:focus-within {
        border-color: #3498db;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
      }

      ::v-deep .el-input__inner {
        border-radius: 21px;
        padding-left: 40px;
      }

      ::v-deep .el-input__icon {
        left: 15px;
        color: #9ca3af;
      }
    }
  }

  //用户区域
  .user-area {
    display: flex;
    align-items: center;
    gap: 15px;

    .login-section {

      ::v-deep .login-btn {

        color: #000000;

        padding: 0 24px;
        height: 42px;
        transition: all 0.3s ease;

        &:hover {

          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
        }
      }
    }

    .user-section {
      .user-info {

        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 10px;
        border-radius: 25px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: rgba(0, 0, 0, 0.03);
        }

        .user-avatar {
          border: 2px solid #f0f2f5;
          transition: transform 0.3s ease;

          &:hover {
            transform: scale(1.1);
          }


        }

        ::v-deep .el-icon-arrow-down {
          color: #999;
          font-size: 14px;
          transition: transform 0.3s ease;

        }

        &:hover ::v-deep .el-icon-arrow-down {
          transform: rotate(180deg);
        }

        .user-name {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
      }
    }
  }
}

// 适配移动端
@media (max-width: 1400px) {
  .music-header {
    padding: 0 2px;
    height: 70px;
    justify-content: space-between;
    .left-area,
    .search-area,
    .right-area {
      flex: 1;
    }

    

    .left-area {
      .el-menu-demo{
        display: flex;
       
        
        .el-menu-item{
          padding: 0;
          flex: 1;
          margin-right: 0 2px;
          
        }
        
      }
    
    }
  }
}
</style>