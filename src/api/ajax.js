// 二次封装axios
// 引入axios
import axios from 'axios'
// 引入Nprogress （带进度条效果的插件）
import Nprogress from 'nprogress'
// 引入store
import store from '../store'
import router from '../routers'
import { Message } from 'element-ui'
// 引用该插件的样式
import 'nprogress/nprogress.css'
// 设置请求的超时时间和根路径
const ajax = axios.create({
  // 设置根路径
  baseURL: '/api',
  // 设置请求1的超时时间
  timeOut: 20000,
})
// 设置请求拦截器
ajax.interceptors.request.use((config) => {
  // 发送请求应该先显示进度条
  Nprogress.start()
  // 获取到UUID
  let userTempId = store.state.user.userTempId
  // 获取到token
  let token = store.state.user.token
  if (token) {
    config.headers.token = token
  }
  // 在请求头添加userTempId
  config.headers.userTempId = userTempId

  return config
})
// 设置响应拦截器
ajax.interceptors.response.use(
  (response) => {
    // 拿到数据就隐藏进度条
    Nprogress.done()
    // 我要的是data数据
    return response.data
  },
  (error) => {
    // 失败也要隐藏进度条
    Nprogress.done()
    // 请求的时候出现的错误信息
    const { response } = error
    // 判断这个信息是否存在
    if (response && response.status) {
      // 判断当前错误码是不是401,则是token的问题
      if (response.status === 401) {
        // 先清理掉token和用户信息
        store.dispatch('Logout')
        // 判断是不是在login页面
        if (router.currentRoute.path !== '/login') {
          // 跳转到login页面
          router.replace('/login')
        }
      } else {
        Message.error('请求出错了' + error.message)
      }
    } else if (!response) {
      Message.error('您的网络资源有问题,服务器异常')
    }
    // 返回中断信息
    return Promise.reject(error)
  }
)
export default ajax
