
import RegisterOrLogin from "@/views/RegisterOrLogin"
import Home from '@/views/Home'
export default [
    {
        path: '/', // 首页路径
        name: 'Home',
        component: Home
      },
     
      {
        path: '/registerOrLogin', // 注册路径
        name: 'registerOrLogin',
        component: RegisterOrLogin
      },
      {
        path: '/search/:keyword?', // 搜索路径
        name: 'registerOrLogin',
        component: RegisterOrLogin
      },



    {     
      path: '*',  // Vue Router 3.x 语法
      redirect: '/'  // 重定向到首页
    }

    

    
      
]