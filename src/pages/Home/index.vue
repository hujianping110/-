<template>
  <div>
    <!-- 商品分类导航 -->
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor"/>
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
// 引入vux辅助函数
import {mapState} from 'vuex'
import Floor from './Floor'
import Brand from './Brand'
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
export default {
  name: 'Home',
  components: {
    Floor,
    Brand,
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
  },
  // 分发action获取轮播图数据
  mounted() {
    this.$store.dispatch('getBanner')
    this.$store.dispatch('getfloors')
    this.$store.dispatch('getrecommends')
  },
  // 计算属性
  computed: {
    ...mapState({
      floors:state=>state.home.floors
    })
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped></style>
