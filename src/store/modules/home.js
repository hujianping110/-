// 引入api接口函数
import { reqListContainer, reqBanner, reqReommends, reqFloors } from '../../api'
const state = {
  baseCategoryList: [], // 储存三级分类信息数据
  banner: [], // 储存轮播图数据
  recommends: [], // 储存今日推荐数据
  floors: [], // 储存楼层数据
}
const mutations = {
  RECEIVE_BASE_CATEGORY_LIST(state, baseCategoryList) {
    // 截取数据
    state.baseCategoryList = baseCategoryList.splice(
      0,
      baseCategoryList.length - 2
    )
  },
  // 直接修改轮播图数据
  RECEIVE_BANNER(state, banner) {
    state.banner = banner
  },
  // 直接修改今日推荐数据
  RECEIVE_RECOMMENDS(state, recommends) {
    state.recommends = recommends
  },
  // 直接修改楼层数据
  RECEIVE_FLOORS(state, floors) {
    state.floors = floors
  },
}
const actions = {
  async getbaseCategoryList({ commit }) {
    // 执行api接口函数
    const promise = await reqListContainer()
    // 判断成功后再执行mutation方法
    if (promise.code === 200) {
      commit('RECEIVE_BASE_CATEGORY_LIST', promise.data)
    }
  },
  async getBanner({ commit }) {
    // 执行api接口函数
    const promise = await reqBanner()
    // 判断成功后再执行mutation方法
    if (promise.code === 200) {
      commit('RECEIVE_BANNER', promise.data)
    }
  },
  // 间接修改今日推荐数据
  async getrecommends({ commit }) {
    // 执行api接口函数
    const promise = await reqReommends()
    // 判断成功后再执行mutation方法
    if (promise.code === 200) {
      commit('RECEIVE_RECOMMENDS', promise.data)
    }
  },
  // 间接修改楼层数据
  async getfloors({ commit }) {
    // 执行api接口函数
    const promise = await reqFloors()
    // 判断成功后再执行mutation方法
    if (promise.code === 200) {
      commit('RECEIVE_FLOORS', promise.data)
    }
  },
}
const getter = {}
export default {
  state,
  actions,
  mutations,
  getter,
}
