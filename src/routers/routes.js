// 引入Home组件
import Home from '../pages/Home'
// 引入Login组件
import Login from '../pages/Login'
// 引入Register组件
import Register from '../pages/Register'
// 引入Search组件
import Search from '../pages/Search'
// 引入Detail组件
import Detail from '../pages/Detail'
// 引入AddCartSuccess组件
import AddCartSuccess from '../pages/AddCartSuccess'
// 引入ShopCart组件
import ShopCart from '../pages/ShopCart'
// 引入Center组件
import Center from '../pages/Center'
// 引入Pay组件
import Pay from '../pages/Pay'
// 引入PaySuccess组件
import PaySuccess from '../pages/PaySuccess'
// 引入Trade组件
import Trade from '../pages/Trade'
// 引入MyOrder
import MyOrder from '../pages/Center/MyOrder'
// 引入OrderDetail
import OrderDetail from '../pages/Center/OrderDetail'
// 引入Refund
import Refund from '../pages/Center/Refund'
// 引入RefundList
import RefundList from '../pages/Center/RefundList'
export default [
  // Center个人中心页面
  {
    path: '/center',
    component: Center,
    children: [
      // 订单列表MyOrder
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: '',
        redirect: 'myorder',
      },
      // 订单详情的路由器OrderDetail
      {
        path: '/center/orderdetail/:id',
        component: OrderDetail,
      },
      // 退款清单的路由器RefundList
      {
        path: '/center/refundlist',
        component: RefundList,
      },
      // 退款申请的路由器Refund
      {
        path: 'refund',
        component: Refund,
      },
    ],
  },
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: Login,
    meta: {
      isshow: true,
    },
  },
  {
    path: '/register',
    component: Register,
    meta: {
      isshow: true,
    },
  },
  {
    path: '/search/:keyword?',
    /* path: '/search', */
    name: 'search',
    component: Search,
  },
  {
    path: '/detail/:skuId?',
    /* path: '/search', */
    name: 'detail',
    component: Detail,
  },
  // 添加到购物车路由
  {
    path: '/addCartSuccess',
    name: 'addCartSuccess',
    component: AddCartSuccess,
    beforeEnter: (to, from, next) => {
      if (
        from.path.indexOf('/detail') === 0 ||
        from.path.indexOf('/addCartSuccess')
      ) {
        next()
      } else {
        next('/search')
      }
    },
  },
  // 购物车列表路由
  {
    path: '/shopcart',
    name: 'shopcart',
    component: ShopCart,
  },

  // 支付页面
  {
    path: '/pay',
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade' || from.path.indexOf('/center') === 0) {
        next()
      } else {
        next('/trade')
      }
    },
  },
  // PaySuccess支持成功页面
  {
    path: '/paySuccess',
    component: PaySuccess,
    beforeEnter: (to, from, next) => {
      if (from.path === '/pay') {
        next()
      } else {
        next('/pay')
      }
    },
  },
  // Trade结算地址页面
  {
    path: '/trade',
    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next('/shopcart')
      }
    },
  },
  // 组件通信高级
  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      // 原生事件和自定义事件的技术点的组件
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true,
        },
      },
      // v-model的本质的技术点组件
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true,
        },
      },
      // .sync 修饰符的技术点组件
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true,
        },
      },
      // $attrs和$listeners技术点组件
      {
        path: 'attrs-listeners',
        component: () =>
          import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true,
        },
      },
      // $children和$parent技术点组件
      {
        path: 'children-parent',
        component: () =>
          import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true,
        },
      },
      // 作用域插槽的技术点组件
      {
        path: 'scope-slot',
        component: () =>
          import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true,
        },
      },
      // provide和inject 技术点组件
      {
        path: 'provide-inject',
        component: () =>
          import('@/pages/Communication/ProvideInjectTest/ProvideInjectTest'),
        meta: {
          isHideFooter: true,
        },
      },
    ],
  },
  {
    path: '/',
    redirect: '/',
  },
]
