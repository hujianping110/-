// 引入vue
import Vue from 'vue'
// 引入vuex 
import Vuex from 'vuex'
// 声明使用Vuex
// 引入state
import state from './state'
// 引入actions
import actions from "./actions"
// 引入mutations
import mutations from './mutations'
// 引入getters
import getters from './getters'
// 引入modules
import modules from './modules'
Vue.use(Vuex)
// 实例化Store并暴露出去
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules,
})