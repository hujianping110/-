<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 渲染首页三级数据 -->
            <li class="with-x" v-if="options.categoryName">
              {{ options.categoryName }} <i @click="removecategory">×</i>
            </li>
            <!-- 渲染keyword -->
            <li class="with-x" v-if="options.keyword">
              {{ options.keyword }} <i @click="removekeyword">×</i>
            </li>
            <!-- 渲染品牌 -->
            <li class="with-x" v-if="options.trademark">
              {{ options.trademark }} <i @click="removetrademark">×</i>
            </li>
            <!-- 渲染平台属性 -->
            <li
              class="with-x"
              v-for="(props, index) in options.props"
              :key="props"
              @click="removeprops(index)"
            >
              {{ props }} <i>×</i>
            </li>
            <!-- <li class="with-x">iphone<i>×</i></li>
            <li class="with-x">华为<i>×</i></li>
            <li class="with-x">OPPO<i>×</i></li> -->
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarks="trademarks" @searchProps="searchProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: setClass('1') }" @click="setOrder('1')">
                  <a href="javascript:;">综合{{ setIcon('1') }}</a>
                </li>
                <li>
                  <a href="javascript:;">销量</a>
                </li>
                <li>
                  <a href="javascript:;">新品</a>
                </li>
                <li>
                  <a href="javascript:;">评价</a>
                </li>
                <li :class="{ active: setClass('2') }" @click="setOrder('2')">
                  <a href="javascript:;">价格{{ setIcon('2') }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img  v-lazy="goods.defaultImg"/></router-link>
                    <!-- <a href="javascript:;"><img :src="goods.defaultImg"/></a> -->
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to='`/detail/${goods.id}`' :title="goods.title">{{
                      goods.title
                    }}</router-link>
                    <!-- <a href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a> -->
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="javascript:;"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:;" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <Pagination
              :pageConfig="{
                total: searchData.total,
                showPageNo: 5,
                pageNo: options.pageNo,
                pageSize: options.pageSize,
              }"
            ></Pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex的辅助函数
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data() {
    return {
      options: {
        category1Id: '', // 一级分类的id
        category2Id: '', // 二级分类的id
        category3Id: '', // 三级分类的id
        categoryName: '', // 分类的名字
        keyword: '', // 搜索关键字
        props: [], // 平台属性的条件 ['属性的id:属性值:属性名字'], 如:[23:4G:运行内存33]
        trademark: '', // 品牌的条件 '品牌id:品牌名字' 如:  '5:小米'
        order: '1:desc', // 排序的方式	 1: 综合,2: 价格 asc: 升序,desc: 降序 示例: "1:desc"
        pageNo: 1, // 默认第一页的数据,页码是1
        pageSize: 3, // 默认每页显示的条数
      }, // 参数
    }
  },
  components: {
    SearchSelector,
  },
  mounted() {
    const { query, params } = this.$route
    // 准备参数
    const options = {
      ...this.options,
      ...query,
      ...params,
    }
    this.options = options
    // 到search页面就获取数据
    this.getSearchSelector()
    this.$bus.$on('switchPage', (switchPage) => {
      this.options.pageNo = switchPage
      this.getSearchSelector()
    })
  },
  methods: {
    // 获取数据方法
    getSearchSelector() {
      // 数据都是从params和query里面拿
      const { params, query } = this.$route
      this.options = {
        ...this.options,
        ...params,
        ...query,
      }
      this.$store.dispatch('getSearch', this.options)
    },
    // 点击删除categoryName
    removecategory() {
      this.options.categoryName = ''
      const { path, params } = this.$route
      this.$router.replace({ path, params })
    },
    // 点击删除keyword
    removekeyword() {
      this.options.keyworde = ''
      const { query } = this.$route
      this.$bus.$emit('removekeyword')
      this.$router.replace({ path: '/search', query })
    },
    // 点击品牌插入
    trademarks(trm) {
      this.options.trademark = trm

      this.getSearchSelector()
    },
    // 点击删除品牌
    removetrademark() {
      this.options.trademark = ''
      this.getSearchSelector()
    },
    // 平台属性插入
    searchProps(prop) {
      this.options.props.push(prop)
      this.getSearchSelector()
    },
    // 平台属性删除
    removeprops(index) {
      this.options.props.splice(index, 1)
      this.getSearchSelector()
    },
    // 判断哪个高亮
    setClass(num) {
      return this.options.order.indexOf(num) === 0
    },
    // 点击按钮,实现排序选项切换且高亮显示及排序功能的实现 价格 asc: 升序,desc
    setOrder(num) {
      let [orderflag, ordertype] = this.options.order.split(':')
      if (num === orderflag) {
        ordertype = ordertype === 'desc' ? 'asc' : 'desc'
      } else {
        orderflag = num
        ordertype = 'desc'
      }
      this.options.order = orderflag + ':' + ordertype
      this.getSearchSelector()
    },
    setIcon(flag) {
      let [orderflag, ordertype] = this.options.order.split(':')
      if (orderflag === flag) {
        return ordertype === 'desc' ? '下' : '上'
      } else {
        return ''
      }
    },
  },
  // 计算属性
  computed: {
    // 产品信息
    ...mapGetters(['goodsList']),
    ...mapState({
      searchData: (state) => state.search.searchData,
    }),
  },
  // 监视属性
  watch: {
    // 如果路由跳转时只改变参数，当前页面会复用，生命周期钩子函数只会调用一次，所以需要监视路由信息
    $route(to) {
      const { params, query } = to
      const options = {
        ...this.options,
        category1Id: '', // 一级分类Id
        category2Id: '', // 二级分类Id
        category3Id: '', // 三级分类Id
        categoryName: '', // 分类名称
        keyword: '', // 搜索关键字
        ...params,
        ...query,
      }
      this.options = options
      this.getSearchSelector()
    },
  },
  // 界面渲染后
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
