<template>
  <div class="auth-container">

    <!-- 左侧品牌展示区 -->
    <div class="auth-banner">
      <div class="banner-content">
        <h1 class="banner-title">科技云平台</h1>
        <p class="banner-desc">
          专注于提供高效、安全的云端服务，助力企业数字化转型
        </p>
        <div class="banner-features">
          <div class="feature-item">
            <i class="el-icon-lock"></i>
            <span>银行级数据安全</span>
          </div>
          <div class="feature-item">
            <i class="el-icon-cloudy"></i>
            <span>高性能云服务器</span>
          </div>
          <div class="feature-item">
            <i class="el-icon-service"></i>
            <span>7×24小时技术支持</span>
          </div>
        </div>
        <div class="banner-stats">
          <div class="stat-item">
            <span class="stat-number">100万+</span>
            <span class="stat-label">企业用户</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">99.9%</span>
            <span class="stat-label">服务可用性</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">全球</span>
            <span class="stat-label">分布式部署</span>
          </div>
        </div>
      </div>

    </div>
    <!-- 表单区 -->
     <div class="auth-form">
      <RegisterForm v-show="!isLogin" :changeIsLogin="changeIsLogin"></RegisterForm>
      <LoginForm v-show="isLogin" :changeIsLogin="changeIsLogin"></LoginForm>
    </div>
   

  </div>
</template>
  
<script>
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'

export default {
  name: 'RegisterOrLogin',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      isLogin: false  // 控制显示登录还是注册表单
    }
  },
  computed: {

  },
  methods: {
    changeIsLogin() {
      this.isLogin = !this.isLogin;
    },
    
  }

}
</script>
  
<style scoped lang="less">
.auth-container {
  display: flex;
  width: 100%;
  min-height: 100vh;

  .auth-banner,
  .auth-form {
    flex: 1;
  }

  .auth-banner {

    background: linear-gradient(135deg, #2c3e50 0%, #4a69bd 100%);
    align-items: center;
    // justify-content: center;
    display: flex;
    position: relative;

    //设置圆圈
    &::before {
      content: '';
      width: 400px;
      height: 400px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      position: absolute;
      top: -100px;
      right: -100px;
    }

    &::after {
      content: '';
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      position: absolute;
      left: 20px;
      bottom: 20px;
    }

    .banner-content {
      z-index: 1;
      color: white;
      margin: 0 auto;
      text-align: center;

      .banner-features {
        text-align: left;
        margin-bottom: 50px;

        .feature-item {
          margin-bottom: 10px;

          i {
            margin: 0 5px;
          }
        }
      }

      .banner-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;

        .stat-item {
          text-align: center;

          span {
            display: block;
          }

          .stat-number {
            font-size: 2rem;
            margin-bottom: 3px;
          }
        }
      }
    }

  }

  .auth-form {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9fafb;
    flex: 1;
  }


}

@media (max-width: 900px) {
  .auth-container {
    flex-direction: column;

  }
}
</style>
