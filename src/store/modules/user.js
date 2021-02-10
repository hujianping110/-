import { userID, setToken, getToken, removeToken } from '../../utils'
import { reqLogin, reqUserInfo, reqRegister, reqLogout, reqUserAddress} from '../../api'
const state = {
  userTempId: userID(), // uuid
  userInfo: {}, // 用户信息
  token: getToken, // 字符
  userAddressList: [] //用户地址信息
}
const mutations = {
  // 直接修改用户信息
  RECEIVE_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清空用户信息
  RESET_USER_INFO(state) {
    state.userInfo = {}
  },
  // 直接修改token
  RECEIVE_TOKEN(state, token) {
    state.token = token
  },
  // 重置token(清空)
  RESET_TOKEN(state) {
    state.token = ''
  },
  // 直接修改用户地址信息
  RECEIVE_USERADDRESSLIST(state, userAddressList) {
    state.userAddressList = userAddressList
  },
}
const actions = {
  // 注册
  /* eslint-disable no-unused-vars */
  async register({ commit }, userInfo) {
    const promice = await reqRegister(userInfo)
    if (promice.code !== 200) {
      throw new Error(promice.message || '帐号或密码错误')
    }
  },
  // 登录
  async login({ commit }, { phone, password }) {
    const promice = await reqLogin(phone, password)
    if (promice.code === 200) {
      //获取用户信息
      const userInfo = promice.data
      // 获取token
      const token = userInfo.token
      // 删除用户信息中的token
      delete userInfo.token
      // 储存用户信息
      commit('RECEIVE_USER_INFO', userInfo)
      // 储存vuex的token
      commit('RECEIVE_TOKEN', token)
      // 储存到浏览器的缓存中
      setToken(token)
    }else {
      throw new Error(promice.message || '登录失败')
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    const promice = await reqUserInfo()
    if(promice.code === 200) {
      // 修改用户数据
      commit('RECEIVE_USER_INFO', promice.data)
    }else {
      throw new Error(promice.message)
    }
  },
  // 退出
  async Logout({ commit }) {
    const promice = await reqLogout()
    if(promice.code === 200) {
      // 删除vuex中的用户数据
      commit('RESET_USER_INFO')
      // 清空vuex中的token
      commit('RESET_TOKEN')
      // 删除浏览器缓存中的token
      removeToken()
    }else {
       throw new Error(promice.message || '退出失败')
    }
  },
  // 获取用户端地址信息
  async getuserAddressList({commit}) {
    const promice = await reqUserAddress()
    if(promice.code === 200) {
      commit('RECEIVE_USERADDRESSLIST',promice.data)
    }
  }
}

const getters = {}
export default {
  state,
  actions,
  mutations,
  getters,
}
