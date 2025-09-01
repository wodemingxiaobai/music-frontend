import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//这里存放全局组件的使用
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import api from '@/api'; // 导入 api 总对象
//使用全局组件
Vue.component(Header.name,Header)
Vue.component(Footer.name,Footer)
// 关键：将 api 挂载到 Vue 原型
Vue.prototype.$api = api;


//这里存放要全局引入的第三方工具
// 1. 引入 Element UI
import ElementUI from 'element-ui'
// 2. 引入 Element UI 样式（必须引入，否则组件无样式）
import 'element-ui/lib/theme-chalk/index.css'

// 引入 normalize.css（如果用的是它）
import 'normalize.css/normalize.css'

// 3. 全局注册 Element UI（关键步骤）
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
