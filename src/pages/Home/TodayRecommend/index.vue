<template>
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="./images/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li
          class="banner"
          v-for="recommends in recommends"
          :key="recommends.id"
        >
          <img :src="recommends.imageUrl" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// 引入vuex辅助函数
import { mapState } from 'vuex'
export default {
  name: 'TodayRecommend',
  // 获取今日推荐数据
  computed: {
    ...mapState({ recommends: (state) => state.home.recommends }),
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .recommend {
      height: 165px;
      background-color: #eaeaea;
      margin: 10px 0;
      display: flex;

      .clock {
        width: 16.67%;
        background-color: #5c5251;
        color: #fff;
        font-size: 18px;
        text-align: center;

        .time {
          padding: 30px 0;
        }

        h3 {
          margin: 9px 0;
          font-weight: 700;
          font-size: 18px;
          line-height: 30.06px;
        }
      }

      .banner {
        width: 20.83%;

        img {
          width: 100%;
          height: 100%;
          transition: all 400ms;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
