import axios from 'axios'


// 创建基础实例
const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:8080/mymusic',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器，暂时不需要，可能要在用户认证时使用
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 添加认证信息
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// 响应拦截器
request.interceptors.response.use(
  (response) => response.data, // 直接返回数据部分
//   (error) => {
//     const status = error.response?.status
//     if (status === 401) {
//       localStorage.removeItem('token')
//       router.push('/login')
//       alert('登录已过期，请重新登录')
//     }
//     return Promise.reject(error)
//   }
)

export default request