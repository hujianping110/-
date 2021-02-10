import Vue from 'vue'
import App from './App.vue'

// 设置控制台不打印默认提示
Vue.config.productionTip = false
// 引入router
import router from './routers/index'
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'
// 设置全局通用组件
Vue.component('TypeNav', TypeNav)
Vue.component('Pagination', Pagination)
import * as API  from './api'
Vue.prototype.$API = API
// 用一下VueAwesomeSwiper
import './plugins/swiper'
// 用一下VeeValidate
import './plugins/VeeValidate'
// 用一下elementui
import './plugins/element-ui'
// 用一下mock
import './mock'
// 引入组件
import './components/AddressModel'
// 引入Vuex的store
import store from './store'

import VueLazyLoad from 'vue-lazyload'
import loading from './assets/images/loading.gif'
Vue.use(VueLazyLoad, {
  loading
})
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = new Vue()
  },
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')
