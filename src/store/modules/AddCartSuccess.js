import {
  reqaddtoCart,
  reqCartList,
  reqCheckCart,
  reqCheckCarts,
  reqDeleteCart,
  reqDeleteCarts,
} from '../../api'
const state = {
  shopCartList: [], // 用来储存购物车中商品列表
}
const mutations = {
  // 修改储存购物车中商品列表
  RECEIVE_CARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList
  },
}
const actions = {
  // 获取单个商品详细信息数据
  /* eslint-disable no-unused-vars */
  async addTocart({ commit }, { skuId, skuNum }) {
    const promise = await reqaddtoCart(skuId, skuNum)
    // 修改数据
    if (promise.code !== 200) {
      /* commit('RECEIVE_DETAILINFO', promise.data) */
      throw new Error(promise.message || '添加购物车')
    }
  },
  // 获取购物车中商品列表
  async getCartList({ commit }) {
    const promise = await reqCartList()
    if (promise.code === 200) {
      commit('RECEIVE_CARTLIST', promise.data)
    }
  },
  // 切换商品选中状态
  async CheckCart({ dispatch }, { skuId, isChecked }) {
    const isCheckeds = isChecked ? 0 : 1
    const promice = await reqCheckCart(skuId, isCheckeds)
    if (promice.code !== 200) {
      throw new Error(promice.message || '选中失败')
    } else {
      // 成功就刷新
      dispatch('getCartList')
    }
  },
  // 批量切换商品选中状态
  async CheckCarts({ state, dispatch }, isCheck) {
    let isChecked = isCheck ? 0 : 1
    const skuIdList = []
    // 遍历获取所有与全选按钮相反的状态的商品ID
    state.shopCartList.forEach((shopCartList) => {
      shopCartList.cartInfoList.forEach((item) => {
        if (item.isChecked !== isCheck) {
          // 将这Id放入数组中
          skuIdList.push(item.skuId)
        }
      })
    })
    // 商品列表必须有商品才允许点击发送请求
    if (skuIdList.length > 0) {
      const promice = await reqCheckCarts(skuIdList, isChecked)
      if (promice.code === 200) {
        dispatch('getCartList')
      } else {
        throw new Error(promice.message || '选中失败')
      }
    }
  },
  // 删除购物车商品
  async deleteCart({ dispatch }, skuId) {
    const promice = await reqDeleteCart(skuId)
    if (promice.code !== 200) {
      throw new Error(promice.message || '删除失败')
    } else {
      dispatch('getCartList')
    }
  },
  // 批量删除购物车商品
  async deleteCarts({ state, dispatch }) {
    const skuIdList = []
    // 获取所有被选中的商品的skuId
    state.shopCartList.forEach((cartItem) => {
      cartItem.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          // 添加到数组当中
          skuIdList.push(item.skuId)
        }
      })
    })
    const promice = await reqDeleteCarts(skuIdList)
    if (promice.code === 200) {
      // 更新数据
      dispatch('getCartList')
    } else {
      // 抛出错误
      throw new Error(promice.message || '批量删除失败')
    }
  },
}

const getters = {
  // 计算所有的商品个数
  cartInfoLists(state) {
    const cartInfoLista = []
    state.shopCartList.forEach((Item) => {
      Item.cartInfoList.forEach((item) => {
        cartInfoLista.push(item)
      })
    })
    return cartInfoLista
  },
  // 计算购物项目的总价格
  totalPrice(state, getters) {
    return getters.cartInfoLists.reduce((pr, item) => {
      return (pr += item.isChecked === 1 ? item.cartPrice * item.skuNum : 0)
    }, 0)
  },
  // 计算购物项的是否全选状态
  isAllCheck(state, getters) {
    return (
      getters.cartInfoLists.every((item) => item.isChecked == 1) &&
      getters.cartInfoLists.length > 0
    )
  },
  // 计算购物项的总数量(选中)
  totalNum(state, getters) {
    return getters.cartInfoLists.reduce((pr, item) => {
      return (pr += item.isChecked === 1 ? item.skuNum : 0)
    }, 0)
  },
}
export default {
  state,
  actions,
  mutations,
  getters,
}
