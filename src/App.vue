<template>
  <div>
    <Heater></Heater>
    <router-view></router-view>
    <Footer v-if="!$route.meta.isshow"></Footer>
  </div>
</template>
<script>
// 引入axios
/* import { reqListContainer } from './api' */
// 引入Heater
import Heater from './components/Header'
// 引入Footer
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Heater,
    Footer,
  },
  // 页面加载后发送axios请求获取数据
  mounted() {
    this.$store.dispatch('getbaseCategoryList')
  },
}
</script>
<style scoped></style>
