<template>
  <footer class="music-footer">
    <div class="footer-content">
      <div class="footer-links">
        <div class="link-group">
          <h4>关于我们</h4>
          <ul>
            <li><a href="#">公司简介</a></li>
            <li><a href="#">联系我们</a></li>
            <li><a href="#">加入我们</a></li>
          </ul>
        </div>
        <div class="link-group">
          <h4>帮助中心</h4>
          <ul>
            <li><a href="#">用户指南</a></li>
            <li><a href="#">常见问题</a></li>
            <li><a href="#">意见反馈</a></li>
          </ul>
        </div>
        <div class="link-group">
          <h4>法律信息</h4>
          <ul>
            <li><a href="#">服务条款</a></li>
            <li><a href="#">隐私政策</a></li>
            <li><a href="#">版权声明</a></li>
          </ul>
        </div>
        <div class="link-group">
          <h4>关注我们</h4>
          <div class="social-icons">
            <i class="el-icon-weibo"></i>
            <i class="el-icon-wechat"></i>
            <i class="el-icon-qq"></i>
          </div>
        </div>
      </div>
      <div class="copyright">
        <p>© 2023 MusicCloud 音乐云平台 版权所有</p>
        <p>备案号：粤ICP备12345678号-1</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="less">
.music-footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 40px 0 20px;
  width: 100%;

  .footer-content {
    margin: 0;
    padding: 0 20px;
  }

  .footer-links {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    flex-wrap: wrap;

    .link-group {
      flex: 1;
      min-width: 200px;
      margin-bottom: 20px;

      h4 {
        font-size: 16px;
        margin-bottom: 15px;
        color: #42b983;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 8px;

          a {
            color: #ddd;
            text-decoration: none;
            transition: color 0.3s;

            &:hover {
              color: #42b983;
            }
          }
        }
      }

      .social-icons {
        font-size: 24px;
        display: flex;
        gap: 15px;
        margin-top: 10px;

        i {
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #42b983;
          }
        }
      }
    }
  }

  .copyright {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #34495e;
    font-size: 12px;
    color: #aaa;

    p {
      margin: 5px 0;
    }
  }
}

@media (max-width: 900px) {
  .music-footer {
    .footer-content {
      width: 100%;
    }

    .footer-links {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
}
</style>