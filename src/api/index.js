// 封装api的请求函数
// 引入axios
import ajax from './ajax'
// 引入mock请求
import ajaxmock from './ajaxmock'
// 获取首页三级分类数据
export const reqListContainer = () => {
  return ajax.get(`/product/getBaseCategoryList`)
}
//获取轮播图数据
export const reqBanner = () => {
  return ajax.get(`/cms/banner`)
}
// 获取今日推荐数据
export const reqReommends = () => {
  return ajaxmock.get(`/recommends`)
}
// 获取楼层数据
export const reqFloors = () => {
  return ajaxmock.get(`/floors`)
}
// 获取search数据
export const reqSearch = (parameter) => {
  return ajax.post('/list', parameter)
}
// 根据skuId获取当前产品详细信息的接口
export const reqDetailInfo = (skuId) => {
  return ajax.get(`/item/${skuId}`)
}
// 根据skuId获取当前优惠券的接口
export const reqCouponActivity = (skuId) => {
  return ajax.get(`/activity/findActivityAndCoupon/${skuId}`)
}
// 返回一个成功或者失败
export const reqCouponId = (couponId) => {
  return ajax.get(`/activity/auth/getCouponInfo/${couponId}`)
}

// 登录
export const reqLogin = (phone, password) => {
  return ajax.post(`/user/passport/login`, { phone, password })
}
// 获取用户信息
export const reqUserInfo = () => {
  return ajax.get(`/user/passport/auth/getUserInfo`)
}
// 获取短信验证码
export const reqsendCode = (phone) => {
  return ajax.get(`/user/passport/sendCode/${phone}`)
}
// 注册用户
export const reqRegister = (userInfo) => {
  return ajax.post(`/user/passport/register`, userInfo)
}
// 退出登录
export const reqLogout = () => {
  return ajax.get(`/user/passport/logout`)
}

// 添加购物车 并且可以修改数量
export const reqaddtoCart = (skuId, skuNum) => {
  return ajax.post(`/cart/addToCart/${skuId}/${skuNum}`)
}
// 获取购物车列表，
export const reqCartList = () => {
  return ajax.get(`/cart/cartList`)
}

// 切换商品选中状态
export const reqCheckCart = (skuId, isChecked) => {
  return ajax.get(`/cart/checkCart/${skuId}/${isChecked}`)
}
// 批量切换商品选中状态
export const reqCheckCarts = (skuIdList, isChecked) => {
  return ajax.post(`/cart/batchCheckCart/${isChecked}`, skuIdList)
}
// 删除购物车商品
export const reqDeleteCart = (skuId) => {
  return ajax.delete(`/cart/deleteCart/${skuId}`)
}
// 批量删除购物车商品
export const reqDeleteCarts = (skuIdList) => {
  return ajax.delete(`/cart/batchDeleteCart`, { data: skuIdList })
}

//获取用户地址信息接口
export const reqUserAddress = () => {
  return ajax.get(`/user/userAddress/auth/findUserAddressList`)
}

// 获取订单交易页信息(获取的就是结算页里的数据)
export const reqTrade = () => {
  return ajax.get(`/order/auth/trade`)
}

// 获取大区地址信息的接口
export const reqBaseRegion = () => {
  return ajax.get(`/user/userAddress/auth/findBaseRegion`)
}

// 根据大区地址id获取省份信息的接口函数
export const reqAddressBaseProvince = (regionId) => {
  return ajax.get(
    `/user/userAddress/auth/findBaseProvinceByRegionId/${regionId}`
  )
}

// 新增用户地址
export const reqUserAddresssave = (userAddressInfo) => {
  return ajax.post(`/user/userAddress/auth/save`, userAddressInfo)
}

// 删除用户地址

export const reqUserDeleteress = (userAddressInfo) => {
  return ajax.get(`/user/userAddress/auth/delete/${userAddressInfo}`)
}

// 更新用户地址

export const reqUpdateUserAddress = (userAddressInfo) => {
  return ajax.post(`/user/userAddress/auth/update`, userAddressInfo)
}

// 提交订单的api接口函数
export const reqSubmitOrderInfo = (tradeNo, orderInfo) =>
  ajax({
    method: 'POST', // 方式
    url: '/order/auth/submitOrder', // 地址
    params: { tradeNo }, // 参数
    data: orderInfo, // 数据对象
  })

//  获取订单商品详情信息（pay页面使用）
export const reqOrderDetail = (orderId) => {
  return ajax.get(`/order/auth/getOrderDetail/${orderId}`)
}

// 获取订单支付信息

export const reqCreateNative = (payInfoId) => {
  return ajax.get(`/payment/weixin/createNative/${payInfoId}`)
}
// 查询支付是否成功
export const reqQueryPayStatus = (orderId) => {
  return ajax.get(`/payment/weixin/queryPayStatus/${orderId}`)
}

// 获取我的订单列表
export const reqMyOrder = (page, limit) => {
  return ajax.get(`/order/auth/${page}/${limit}`)
}

// 获取订单详细信息
export const reqMyOrderDetail = (orderId) => {
  return ajax.get(`/order/auth/${orderId}`)
}

// 发起退货接口
export const reqOrderRefundInfo = (orderRefundInfo) => {
  return ajax.post(`/order/orderRefundInfo/auth/save`, orderRefundInfo)
}

// 获取退货列表

export const reqRefundInfoList = (page, limit) => {
  return ajax.get(`/order/orderRefundInfo/auth/${page}/${limit}`)
}
