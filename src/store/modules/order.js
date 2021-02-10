import { reqTrade } from '../../api'
const state = {
  orderDate: {}, // 用户订单信息
}
const mutations = {
  // 直接修改用户订单信息
  RECEIVE_ORDERDATE(state, orderDate) {
    state.orderDate = orderDate
  },
}
  // 获取用户订单信息
const actions = {
  async getOrderDate({ commit }) {
    const promice = await reqTrade()
    if (promice.code === 200) {
      commit('RECEIVE_ORDERDATE', promice.data)
    }
  },
}

const getters = {}
export default {
  state,
  actions,
  mutations,
  getters,
}
