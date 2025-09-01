// src/store/modules/auth.js
const state = {
    // 初始状态：从本地存储读取（关闭浏览器后重新打开，登录状态不会丢失）
    user: JSON.parse(localStorage.getItem('user')) || null, // 用户信息
    token: localStorage.getItem('token') || null, // 登录令牌（类似“通行证”）
    isAuthenticated: !!localStorage.getItem('token'), // 是否已登录（true/false）
    loading: false, // 登录/注册时的加载状态（显示“登录中...”）
    error: null // 错误信息（比如“密码错误”）
  }
  
  const mutations = {
    // 修改状态的方法（只能在这里改，保证数据可追踪）
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(user)) // 存到本地存储
    },
    SET_TOKEN(state, token) {
      state.token = token
      localStorage.setItem('token', token) // 存到本地存储
    },
    SET_LOADING(state, loading) {
      state.loading = loading
    },
    SET_ERROR(state, error) {
      state.error = error
    },
    LOGOUT(state) {
      // 退出登录：清空所有状态
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
  
  const actions = {
    // 登录动作（调用后端接口，处理登录逻辑）
    login({ commit }, credentials) {
      // 这里暂时空着，后面会对接后端接口
    },
    // 注册动作
    register({ commit }, userData) {
      // 这里暂时空着，后面会对接后端接口
    },
    // 退出登录
    logout({ commit }) {
      commit('LOGOUT')
    }
  }
  
  const getters = {
    // 方便其他组件获取状态（比如在页面中判断是否已登录）
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user,
    loading: state => state.loading,
    error: state => state.error
  }
  
  export default {
    namespaced: true, // 避免不同模块的方法名冲突
    state,
    mutations,
    actions,
    getters
  }