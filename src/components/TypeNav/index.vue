<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="removeFirst" @mouseenter="hideFirst">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" @click="toSearch" v-show="isFirst">
          <div class="all-sort-list2">
            <div
              class="item"
              v-for="(c1, index) in baseCategoryList"
              :key="c1.categoryId"
              :class="{ item_on: currentIndex === index }"
              @mouseenter="showSubcategory(index)"
            >
              <h3>
                <!-- 一级分类信息 -->
                <a
                  href="javascript:;"
                  :data-categoryname="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dt>
                      <!-- 二级分类信息 -->
                      <a
                        href="javascript:;"
                        :data-categoryname="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- 三级分类信息 -->
                        <a
                          href="javascript:;"
                          :data-categoryname="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
// import _ from '../../../node_modules/lodash'
import throttle from 'lodash/throttle'
// 引入mapState
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -2,
      isFirst: true, // 是否显示商品目录
    }
  },
  computed: {
    ...mapState({
      // home模块中的baseCategoryList数据
      baseCategoryList: (state) => state.home.baseCategoryList,
    }),
  },
  methods: {
    // 移入改变currentIndex为当前target的index
    // throttle为节流函数
    showSubcategory: throttle(function (index) {
      // currentIndex不等于-2的时候才赋值index
      if (this.currentIndex !== -2) {
        this.currentIndex = index
      }
    }, 200),
    toSearch(event) {
      const nodeTarget = event.target
      // 判断当前标签是否为a标签
      if (nodeTarget.nodeName === 'A') {
        const {
          categoryname,
          category1id,
          category2id,
          category3id,
        } = nodeTarget.dataset
        // 哪个Id存在就给路由传参传哪个Id
        const { path,query, params } = this.$route
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
          query.categoryName=categoryname
        // 判断路由里面有没有/search
        if (path.indexOf('/search') === 0) {
          // 如有有就把query加上
          this.$router.replace({ path, query, params})
        }else {
          // 没有就正常跳转
          this.$router.replace({ path: '/search', query})
        }
        // 路由跳转

        // 跳转后取消高亮
        this.currentIndex = -2
      }
    },
    // 鼠标移出商品目录
    removeFirst() {
      this.currentIndex = -2
      // 不在首页才有移出效果
      if (this.$route.path !== '/') {
        this.isFirst = false
      }
    },
    // 鼠标移入商品目录
    hideFirst() {
      // 不在首页才有移入效果
      if (this.$route.path !== '/') {
        this.isFirst = true
      }
      this.currentIndex = -1
    },
  },
  // 界面渲染完毕
  mounted() {
    // 判断当前路由不为首页才不显示三级页面
    if (this.$route.path !== '/') {
      this.isFirst = false
    }
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #02a774;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
