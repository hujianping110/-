import { reqDetailInfo, reqCouponActivity } from '../../api'
const state = {
  detailInfo: {}, //单个商品详细信息数据
  couponInfoList: [], // 优惠券数据
  activityRuleList: [], // 活动列表数组数据
}
const mutations = {
  // 单个商品详细信息数据
  RECEIVE_DETAILINFO(state, detailInfo) {
    state.detailInfo = detailInfo
  },
  // 修改优惠券数据
  RECEIVE_COUPON(state, { couponInfoList, activityRuleList }) {
    state.couponInfoList = couponInfoList
    state.activityRuleList = activityRuleList
  },
}

const actions = {
  // 获取单个商品详细信息数据
  async getDetailInfo({ commit }, skuId) {
    const promise = await reqDetailInfo(skuId)
    // 修改数据
    if (promise.code === 200) {
      commit('RECEIVE_DETAILINFO', promise.data)
    }
  },
  // 获取优惠券数据
  async getCouponActivity({ commit }, skuId) {
    const promise = await reqCouponActivity(skuId)
    const { couponInfoList, activityRuleList } = promise.data
    // 修改数据
    if (promise.code === 200) {
      commit('RECEIVE_COUPON', { couponInfoList, activityRuleList })
    }
  },
}

const getters = {
  // json数据
  valuesSkuJson(state) {
    return state.detailInfo.valuesSkuJson || ''
  },
  // 分类信息数据
  categoryView(state) {
    return state.detailInfo.categoryView || {}
  },
  // 销售属性数据
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || []
  },
  // 产品详细信息数据
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  // 轮播图数据
  skuImageList(state) {
    const skuInfo = state.detailInfo.skuInfo
    return skuInfo ? skuInfo.skuImageList : []
  },
}
export default {
  state,
  actions,
  mutations,
  getters,
}
