// 引入vue
import vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入路由
import routes from './routes'
// 引入store
import store from '../store'
// 声明使用vue-router
vue.use(VueRouter)

const origanPush = VueRouter.prototype.push
const origanReplace = VueRouter.prototype.replace
// 重写编程式路由push
VueRouter.prototype.push = function(location, onComplete = () => {}, onAbort) {
  return origanPush.call(this, location, onComplete, onAbort)
}
// 重写编程式路由replace
VueRouter.prototype.replace = function(
  location,
  onComplete = () => {},
  onAbort
) {
  return origanReplace.call(this, location, onComplete, onAbort)
}
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

// 创建全局前置导航守卫
// to即将要进入的目标
// from 当前正要离开的路由
// 定义一个需要的登录才能跳转的路径的集合的数组
const checkPaths = ['/center', '/pay', '/paySuccess', '/trade']
router.beforeEach(async (to, from, next) => {
  // 获取userInfo.name,token
  const {
    userInfo: { name },
    token,
  } = store.state.user
  //  获取即将要进入的路径
  const toPath = to.path
  // 获取你需要检测的地址
  const needPaths = checkPaths.some((path) => toPath.startsWith(path))
  // 如果是登录状态随便跳转(判断是否有userInfo.name)
  if (name) {
    next()
    return
  }
  // 如果有token就分发获取用户信息的action（实现自动登录）
  if (token) {
    try {
      await store.dispatch('getUserInfo')
      next()
      return
    } catch (error) {
      // 如果token存在问题就清除当前token和用户信息,
      store.dispatch('Logout')
      vue.prototype.$message.error('登录已经过期')
      // 跳转到login页面
      next('/login')
      return
    }
  }
  // 判断这个跳转的路径是否是需要登录才能跳转的路径
  if (!needPaths) {
    next()
    return
  }
  next('/login?redirect=' + to.path)
})

// 实例化VueRouter并暴露出去
export default router
