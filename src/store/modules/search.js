import { reqSearch } from '../../api'
const state = {
  searchData: {}, //搜索的数据
}
const mutations = {
  // 修改搜索的数据
  RECEIVE_SEARCH(state, searchData) {
    state.searchData = searchData
  },
}

const actions = {
  // 获取搜索的数据
  async getSearch({ commit }, parameter) {
    parameter = { ...parameter }
    // 值为空或者为空数组的参数删除掉
    Object.keys(parameter).forEach((index) => {
      if (
        parameter[index] === '' ||
        (parameter[index] instanceof Array && parameter[index].length === 0)
      ) {
        delete parameter[index]
      }
    })
    const promise = await reqSearch(parameter)
    // 修改数据
    if (promise.code === 200) {
      commit('RECEIVE_SEARCH', promise.data)
    }
  },
}

const getters = {
  // 品牌数据
  trademarkList(state) {
    return state.searchData.trademarkList || []
  },
  // 平台属性
  attrsList(state) {
    return state.searchData.attrsList || []
  },
  // 产品信息
  goodsList(state) {
    return state.searchData.goodsList || []
  },
}
export default {
  state,
  actions,
  mutations,
  getters,
}
