<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span>{{ categoryView.category1Name }}</span>
        <span>{{ categoryView.category2Name }}</span>
        <span>{{ categoryView.category3Name }}</span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom
            v-if="skuImageList.length > 0"
            :smallIma="skuImageList[currentIndex].imgUrl"
            :biglIma="skuImageList[currentIndex].imgUrl"
          />
          <!-- 小图列表 -->
          <ImageList @clickImg="clickImg" />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{ skuInfo.skuName }}
            </h3>
            <p class="news">
              {{ skuInfo.skuDesc }}
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">价 格</div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="couponWrap">
                <div class="fl title">
                  <i>优 惠 券</i>
                </div>
                <!-- 优惠券 -->
                <div class="fl fix-width" v-if="couponInfoList.length > 0">
                  <div class="fl fix-width" @click="isshow = !isshow">
                    <a
                      href="javascript:;"
                      :title="couponInfo.couponName"
                      v-for="couponInfo in couponInfoList"
                      :key="couponInfo.id"
                    >
                      <i
                        class="red-bg i-coupon"
                        v-if="couponInfo.couponType === 'CASH'"
                        >现金券{{ couponInfo.benefitAmount }}元</i
                      >

                      <i
                        class="red-bg i-coupon"
                        v-else-if="couponInfo.couponType === 'FULL_REDUCTION'"
                        >满{{ couponInfo.conditionAmount }}元减{{
                          couponInfo.benefitAmount
                        }}元</i
                      >

                      <i
                        class="red-bg i-coupon"
                        v-else-if="couponInfo.couponType === 'FULL_DISCOUNT'"
                        >满{{ couponInfo.conditionNum }}件折{{
                          couponInfo.benefitDiscount
                        }}</i
                      >

                      <i
                        class="red-bg i-coupon"
                        v-else-if="couponInfo.couponType === 'DISCOUNT'"
                        >折扣卷{{ couponInfo.benefitDiscount }}折</i
                      >
                    </a>
                  </div>
                </div>
              </div>
              <!-- 促销券 -->
              <div class="activityWrap" v-if="activityRuleList.length > 0">
                <div class="fl title">
                  <i>促 销</i>
                </div>
                <div class="fl fix-width">
                  <div v-for="activity in activityRuleList" :key="activity.id">
                    <i class="red-bg">
                      {{
                        activity.activityType === 'FULL_REDUCTION'
                          ? '满减'
                          : '折扣'
                      }}
                    </i>
                    <em
                      class="t-gray"
                      v-if="activity.activityType === 'FULL_REDUCTION'"
                    >
                      满{{ activity.conditionAmount }}减{{
                        activity.benefitAmount
                      }}元
                    </em>
                    <em
                      class="t-gray"
                      v-else-if="activity.activityType === 'FULL_DISCOUNT'"
                    >
                      满{{ activity.conditionNum }}件打{{
                        activity.benefitDiscount
                      }}折
                    </em>
                  </div>
                </div>
              </div>
            </div>
            <!-- 重量 -->
            <div class="support">
              <div class="supportArea">
                <div class="title">支 持</div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">北京市 昌平区 宏福苑</div>
              </div>
              <div class="supportArea">
                <div class="title">重量</div>
                <div class="fixWidth">{{ skuInfo.weight }}</div>
              </div>
            </div>
          </div>
          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="(spuSale, index) in spuSaleAttrList" :key="spuSale.id">
                <dt class="title">{{ spuSale.saleAttrName }}</dt>
                <dd
                  changepirce="0"
                  :class="{ active: spuSaleAttr.isChecked === '1' }"
                  v-for="spuSaleAttr in spuSale.spuSaleAttrValueList"
                  :key="spuSaleAttr.id"
                  @click="setVal(spuSaleAttr, spuSale, index)"
                >
                  {{ spuSaleAttr.saleAttrValueName }}
                  <span
                    title="点击取消选择"
                    :class="{ cancel: spuSaleAttr.isChecked === '1' }"
                  ></span>
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="amount" />
                <a href="javascript:" class="plus" @click="amount += 1">+</a>
                <a
                  href="javascript:"
                  class="mins"
                  @click="amount = amount === 1 ? 1 : amount - 1"
                  >-</a
                >
              </div>
              <div class="add">
                <a href="javascript:" v-if="isAddShop" @click="addCart"
                  >加入购物车</a
                >
                <a href="javascript:" v-else style="background:#ccc"
                  >加入购物车</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!--侧栏面板开始-->
    <div class="J-global-toolbar">
      <div class="toolbar-wrap J-wrap">
        <div class="toolbar" :style="isshow ? 'width: 270px' : ''">
          <div class="toolbar-panels J-panel">
            <div
              id="coupon-div"
              class="J-content toolbar-panel tbar-panel-history toolbar-animate-in"
            >
              <h3 class="tbar-panel-header J-panel-header coupon-more">
                <a href="#none" class="title">
                  <i></i>
                  <em class="title">我的优惠券</em>
                </a>
                <span class="close-panel J-close"></span>
              </h3>
              <div class="tbar-panel-main">
                <div class="tbar-panel-content J-panel-content">
                  <div
                    class="jt-history-wrap"
                    style="height: 1000px; overflow-y: scroll;"
                  >
                    <ul style="overflow: auto;">
                      <li
                        class="jth-item"
                        style="width: 190px; height: 100%; padding: 10px;"
                        v-for="couponInfo in couponInfoList"
                        :key="couponInfo.id"
                      >
                        <div class="coupon-price">
                          <span
                            class="token"
                            v-if="couponInfo.couponType === 'CASH'"
                            >{{ couponInfo.benefitAmount }}元</span
                          >
                          <span
                            class="token"
                            v-else-if="
                              couponInfo.couponType === 'FULL_REDUCTION'
                            "
                            >{{ couponInfo.benefitAmount }}元</span
                          >
                          <span
                            class="token"
                            v-else-if="
                              couponInfo.couponType === 'FULL_DISCOUNT'
                            "
                            >{{ couponInfo.benefitDiscount }}折</span
                          >
                          <span
                            class="token"
                            v-else-if="couponInfo.couponType === 'DISCOUNT'"
                            >{{ couponInfo.benefitDiscount }}折</span
                          >

                          <span
                            class="coupon-name"
                            v-if="couponInfo.couponType === 'CASH'"
                            >现金券</span
                          >
                          <span
                            class="coupon-name"
                            v-else-if="
                              couponInfo.couponType === 'FULL_REDUCTION'
                            "
                            >满减券</span
                          >
                          <span
                            class="coupon-name"
                            v-else-if="
                              couponInfo.couponType === 'FULL_DISCOUNT'
                            "
                            >满件打折券</span
                          >
                          <span
                            class="coupon-name"
                            v-else-if="couponInfo.couponType === 'DISCOUNT'"
                            >折扣券</span
                          >
                        </div>
                        <div class="coupon-info">
                          <span
                            class="condition"
                            v-if="couponInfo.couponType === 'CASH'"
                            >现金券{{ couponInfo.benefitAmount }}元</span
                          >
                          <span
                            class="condition"
                            v-else-if="
                              couponInfo.couponType === 'FULL_REDUCTION'
                            "
                            >满{{ couponInfo.conditionAmount }}元减{{
                              couponInfo.benefitAmount
                            }}元</span
                          >
                          <span
                            class="condition"
                            v-else-if="
                              couponInfo.couponType === 'FULL_DISCOUNT'
                            "
                            >满{{ couponInfo.conditionNum }}件折{{
                              couponInfo.benefitDiscount
                            }}</span
                          >
                          <span
                            class="condition"
                            v-else-if="couponInfo.couponType === 'DISCOUNT'"
                            >折扣卷{{ couponInfo.benefitDiscount }}折</span
                          >

                          <p>{{ couponInfo.rangeDesc }}</p>
                        </div>
                        <p class="coupon-time">
                          过期时间：{{ couponInfo.expireTime }}
                        </p>
                        <div
                          class="coupon-seal"
                          v-if="
                            couponInfo.isGet > 0 &&
                              couponInfo.couponStatus === 'NOT_USED'
                          "
                        ></div>
                        <div
                          class="coupon-term"
                          v-if="
                            couponInfo.isGet > 0 &&
                              couponInfo.couponStatus === 'USED'
                          "
                        ></div>

                        <button
                          type="button"
                          class="sui-btn btn-primary btn-large hm-action-statistics"
                          v-if="couponInfo.isGet === 0"
                          @click="receiveCouponInfo(couponInfo.id, couponInfo)"
                        >
                          领&nbsp;取
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="tbar-panel-footer J-panel-footer"></div>
            </div>
          </div>
          <div class="toolbar-header"></div>
          <div class="toolbar-tabs J-tab">
            <div data="购物车" tag="cart" class="toolbar-tab tbar-tab-cart">
              <i class="tab-ico"></i>
              <em class="tab-text"></em>
              <span id="tab-sub-cart-count" class="tab-sub J-count">0</span>
            </div>
            <div
              data="我的关注"
              tag="follow"
              class="toolbar-tab tbar-tab-follow"
            >
              <i class="tab-ico"></i>
              <em class="tab-text"></em>
              <span class="tab-sub J-count hide">0</span>
            </div>
            <div
              data="我的足迹"
              tag="history"
              class="toolbar-tab tbar-tab-history"
            >
              <i class="tab-ico"></i>
              <em class="tab-text"></em>
              <span class="tab-sub J-count hide">0</span>
            </div>
          </div>
          <div class="toolbar-footer">
            <div class="toolbar-tab tbar-tab-top">
              <a href="#">
                <i class="tab-ico"></i>
                <em class="footer-tab-text">顶部</em>
              </a>
            </div>
            <div class="toolbar-tab tbar-tab-feedback">
              <a href="#" target="_blank">
                <i class="tab-ico"></i>
                <em class="footer-tab-text">反馈</em>
              </a>
            </div>
          </div>
          <div class="toolbar-mini"></div>
        </div>
        <div id="J-toolbar-load-hook"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ImageList from './ImageList/ImageList'
import Zoom from './Zoom/Zoom'

export default {
  name: 'Detail',

  components: {
    ImageList,
    Zoom,
  },
  data() {
    return {
      isshow: false,
      currentIndex: 0,
      spuSaleAttrValueList: [],
      isAddShop: true,
      amount: 1, // 商品数量
    }
  },
  /* mounted () {
    this.$store.dispatch('getDetailInfo', this.$route.params.skuId)
    this.$store.dispatch('getCouponActivity', this.$route.params.skuId)
  }, */
  computed: {
    ...mapGetters([
      'valuesSkuJson',
      'categoryView',
      'spuSaleAttrList',
      'skuInfo',
      'skuImageList',
    ]),
    ...mapState({
      couponInfoList: (state) => state.detail.couponInfoList,
      activityRuleList: (state) => state.detail.activityRuleList,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    clickImg(index) {
      this.currentIndex = index
    },
    // val=>spuSaleAttrValueList，attr=>spuSaleAttrList ,
    setVal(val, attr, index) {
      // 将所有的都变灰色
      attr.spuSaleAttrValueList.forEach((value) => {
        value.isChecked = '0'
      })
      // 把选中的那个高亮
      val.isChecked = '1'
      // 获取当前选中的属性对象的ID
      const valId = val.id
      // 获取JSON对象
      const valuesSkuJson = JSON.parse(this.valuesSkuJson)
      // 插入到数组当中
      this.spuSaleAttrValueList[index] = valId
      // 变成字符串
      const spuSaleAttrValue = this.spuSaleAttrValueList.join('|')
      //
      let currentSkuId = valuesSkuJson[spuSaleAttrValue]
      if (currentSkuId) {
        if (currentSkuId !== this.$route.params.skuId) {
          this.isAddShop = true
          this.$router.replace(`/detail/${currentSkuId}`)
        }
      } else {
        // 修改购物车样式，不高亮
        this.isAddShop = false
      }
    },
    // 点击购物车
    async addCart() {
      // 需要两个参数sukId 和skuNum
      const skuId = this.$route.params.skuId
      const skuNum = this.amount
      try {
        // 分发action
        await this.$store.dispatch('addTocart', { skuId, skuNum })
        // 跳转到addCartSuccess并传递数量
        this.$router.replace({ name: 'addCartSuccess', query: { skuNum } })
        // 把skuinfo商品信息缓存到浏览器
        sessionStorage.setItem('SKUINFO_KEY', JSON.stringify(this.skuInfo))
      } catch (error) {
        alert(error.message || '添加购物车失败')
      }
    },
    // 领券操作
    async receiveCouponInfo(couponInfoId, couponInfo) {
      // 获取当前的skuId
      const skuId = this.$route.params.skuId
      // 判断是否登录
      if (!this.userInfo.name) {
        // 未登录,则跳转到登录界面,同时传入一个query参数,记录当前的路由地址信息
        this.$router.replace(`/login?redirect=/detail/${skuId}`)
      } else {
        // 如果已经登录了,则先领券--直接调用领券的api接口函数

        // 领券成功了,则重新根据当前的skuId获取领券的相关信息
        const promice = await this.$API.reqCouponId(couponInfoId)
        // 判断领券是否成功
        if (promice.code === 200) {
          this.$store.dispatch('getCouponActivity', skuId)
          couponInfo.couponStatus = 'NOT_USED'
        } else {
          // 失败了,则提示,领券失败
          this.$message.error(promice.message)
        }
      }
    },
  },
  watch: {
    // 监视路由,路由发生变化就发送请求
    $route: {
      handler(route) {
        const skuId = route.params.skuId
        this.$store.dispatch('getDetailInfo', skuId)
        this.$store.dispatch('getCouponActivity', skuId)
      },
      immediate: true,
    },
    // 监视
    spuSaleAttrList: {
      handler(spuSaleAttrList) {
        this.spuSaleAttrValueList = []
        spuSaleAttrList.forEach((spuSaleAttr) => {
          spuSaleAttr.spuSaleAttrValueList.forEach((val) => {
            if (val.isChecked === '1') {
              this.spuSaleAttrValueList.push(val.id)
            }
          })
        })
      },
      deep: true,
    },
    // 监视数量
    amount(value) {
      // 只能输入数字
      const reg = /^0+|\D+0*/g
      value += ''
      if (value === '') {
        this.amount = 1
      } else if (value.match(reg)) {
        this.amount = value.replace(reg, '') || 1
      }
      this.amount = this.amount * 1
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  .con {
    width: 1200px;
    margin: 15px auto 0;

    .conPoin {
      padding: 9px 15px 9px 0;

      & > span + span:before {
        content: '/\00a0';
        padding: 0 5px;
        color: #ccc;
      }

      .skuDesc {
        color: #999;
      }
    }

    .mainCon {
      overflow: hidden;
      margin: 5px 0 15px;

      .previewWrap {
        float: left;
        width: 400px;
        position: relative;
      }

      .InfoWrap {
        width: 700px;
        float: right;

        .InfoName {
          font-size: 14px;
          line-height: 21px;
          margin-top: 15px;
        }

        .news {
          color: #e12228;
          margin-top: 15px;
        }

        .priceArea {
          background: #fee9eb;
          padding: 7px;
          margin: 13px 0;

          .priceArea1 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              float: left;
              margin-right: 15px;
            }

            .price {
              float: left;
              color: #c81623;

              i {
                font-size: 16px;
              }

              em {
                font-size: 24px;
                font-weight: 700;
              }

              span {
                font-size: 12px;
              }
            }

            .remark {
              float: right;
            }
          }

          .priceArea2 {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;

              .red-bg {
                background: #c81623;
                color: #fff;
                padding: 3px;
              }

              .t-gray {
                color: #999;
              }
            }
          }

          .couponWrap,
          .activityWrap {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;
            .fl {
              float: left;
            }

            .title {
              margin-right: 15px;
              float: left;
            }

            .fix-width {
              width: 520px;
              float: left;
              color: #999;
              .i-coupon {
                background: #ffdedf;
                border: 1px solid #df3033;
                font-size: 12px;
                color: #df3033;
                padding: 3px 12px;
                margin-right: 12px;
              }
            }
          }

          .activityWrap {
            .red-bg {
              background: #c81623;
              color: #fff;
              padding: 3px;
            }
            .t-gray {
              margin-left: 5px;
              color: #999;
            }
          }
        }

        .support {
          border-bottom: 1px solid #ededed;
          padding-bottom: 5px;

          .supportArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            .title {
              margin-right: 15px;
              float: left;
            }

            .fixWidth {
              width: 520px;
              float: left;
              color: #999;
            }
          }
        }

        .choose {
          .chooseArea {
            overflow: hidden;
            line-height: 28px;
            margin-top: 10px;

            dl {
              overflow: hidden;
              margin: 13px 0;

              dt {
                margin-right: 15px;
                float: left;
              }

              dd {
                position: relative;
                float: left;
                margin-right: 5px;
                color: #666;
                line-height: 24px;
                padding: 2px 14px;
                border-top: 1px solid #eee;
                border-right: 1px solid #bbb;
                border-bottom: 1px solid #bbb;
                border-left: 1px solid #eee;

                &.active {
                  color: green;
                  border: 1px solid green;
                  span {
                    background: url(./images/choosed.png) no-repeat;
                  }
                }
                .cancel {
                  width: 13px;
                  height: 13px;
                  position: absolute;
                  right: 0;
                  bottom: 0;
                  overflow: hidden;
                }
              }
            }
          }

          .cartWrap {
            .controls {
              width: 48px;
              position: relative;
              float: left;
              margin-right: 15px;

              .itxt {
                width: 38px;
                height: 37px;
                border: 1px solid #ddd;
                color: #555;
                float: left;
                border-right: 0;
                text-align: center;
              }

              .plus,
              .mins {
                width: 15px;
                text-align: center;
                height: 17px;
                line-height: 17px;
                background: #f1f1f1;
                color: #666;
                position: absolute;
                right: -8px;
                border: 1px solid #ccc;
              }

              .mins {
                right: -8px;
                top: 19px;
                border-top: 0;
              }

              .plus {
                right: -8px;
              }
            }

            .add {
              float: left;

              a {
                background-color: #e1251b;
                padding: 0 25px;
                font-size: 16px;
                color: #fff;
                height: 36px;
                line-height: 36px;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .product-detail {
    width: 1200px;
    margin: 30px auto 0;
    overflow: hidden;

    .aside {
      width: 210px;
      float: left;
      border: 1px solid #ccc;

      .tabWraped {
        height: 40px;

        h4 {
          border-top: 3px solid #fff;
          float: left;
          line-height: 37px;
          width: 105px;
          text-align: center;
          border-bottom: 1px solid #ccc;

          &.active {
            border-top: 3px solid #e1251b;
            border-bottom: 0;
            font-weight: normal;
          }
        }
      }

      .tabContent {
        padding: 10px;

        .tab-pane {
          display: none;

          &.active {
            display: block;
          }

          &:nth-child(1) {
            .partList {
              overflow: hidden;

              li {
                width: 50%;
                float: left;
                border-bottom: 1px dashed #ededed;
                line-height: 28px;
              }
            }

            .goodsList {
              & > li {
                margin: 5px 0 15px;
                border-bottom: 1px solid #ededed;
                padding-bottom: 5px;

                .list-wrap {
                  .p-img {
                    text-align: center;

                    img {
                      width: 152px;
                    }
                  }

                  .price {
                    font-size: 16px;
                    color: #c81623;
                  }

                  .operate {
                    text-align: center;
                    margin: 5px 0;

                    a {
                      background-color: transparent;
                      border: 1px solid #8c8c8c;
                      color: #8c8c8c;
                      display: inline-block;
                      padding: 2px 14px;
                      line-height: 18px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .detail {
      width: 980px;
      float: right;

      .fitting {
        border: 1px solid #ddd;
        margin-bottom: 15px;

        .kt {
          border-bottom: 1px solid #ddd;
          background: #f1f1f1;
          color: #333;
          padding: 5px 0 5px 15px;
        }

        .good-suits {
          height: 170px;
          padding-top: 10px;

          .master {
            width: 127px;
            height: 165px;
            text-align: center;
            position: relative;
            float: left;

            img {
              width: 87px;
            }

            p {
              color: #c81623;
              font-size: 16px;
              font-weight: 700;
            }

            i {
              position: absolute;
              top: 48px;
              right: -25px;
              font-size: 16px;
            }
          }

          .suits {
            width: 668px;
            height: 165px;
            float: left;

            .suitsItem {
              float: left;
              width: 127px;
              padding: 0 20px;
              text-align: center;

              img {
                width: 120px;
                height: 130px;
              }

              p {
                font-size: 12px;
              }

              label {
                display: block;
                position: relative;

                input {
                  vertical-align: middle;
                }

                span {
                  vertical-align: middle;
                }
              }
            }
          }

          .result {
            border-left: 1px solid #ddd;
            width: 153px;
            height: 165px;
            padding-left: 20px;
            float: left;

            .num {
              font-size: 14px;
              margin-bottom: 10px;
              margin-top: 10px;
            }

            .price-tit {
              font-weight: bold;
              margin-bottom: 10px;
            }

            .price {
              color: #b1191a;
              font-size: 16px;
              margin-bottom: 10px;
            }

            .addshopcar {
              background-color: #e1251b;
              border: 1px solid #e1251b;
              padding: 10px 25px;
              font-size: 16px;
              color: #fff;
              display: inline-block;
              box-sizing: border-box;
            }
          }
        }
      }

      .intro {
        .tab-wraped {
          background: #ededed;
          // border: 1px solid #ddd;
          overflow: hidden;

          li {
            float: left;

            & + li > a {
              border-left: 1px solid #ddd;
            }

            &.active {
              a {
                // border: 0;
                background: #e1251b;
                color: #fff;
              }
            }

            a {
              display: block;
              height: 40px;
              line-height: 40px;
              padding: 0 11px;
              text-align: center;
              color: #666;
              background: #fcfcfc;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
            }
          }
        }

        .tab-content {
          .tab-pane {
            display: none;

            &.active {
              display: block;
            }

            &:nth-child(1) {
              .goods-intro {
                padding-left: 10px;

                li {
                  margin: 10px 0;
                }
              }

              .intro-detail {
                img {
                  width: 100%;
                }
              }
            }
          }
        }
      }
    }
  }

  .J-global-toolbar {
    .toolbar-wrap {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 9990;
      width: 35px;
      height: 100%;
      .toolbar {
        position: absolute;
        right: 0;
        top: 0;
        width: 29px;
        height: 100%;
        border-right: 6px solid #7a6e6e;
        transition: width 400ms ease;
        .toolbar-panels {
          position: absolute;
          left: 35px;
          top: 0;
          width: 270px;
          height: 100%;
          z-index: 2;
          background: #eceaea none repeat scroll 0 0;
          .toolbar-panel {
            width: 270px;
            height: 100%;
            position: absolute;
            background: #eceaea none repeat scroll 0 0;
            .tbar-panel-header {
              position: relative;
              width: 270px;
              height: 40px;
              line-height: 40px;
              background: #eceaea none repeat scroll 0 0;
              font-family: 'microsoft yahei';
              font-weight: 400;
              margin: 0;
              padding: 0;
              .title {
                display: inline-block;
                height: 40px;
                color: #5e5050;
                font: 16px/40px '微软雅黑';
                i {
                  display: inline-block;
                  background-image: url(./images/cartPanelViewIcons.png);
                  background-repeat: no-repeat;
                  margin-right: 4px;
                  margin-left: 10px;
                  vertical-align: top;
                  width: 20px;
                  height: 17px;
                  margin-top: 11px;
                  background-position: 0 -100px;
                }
                em {
                  display: inline-block;
                  vertical-align: top;
                  height: 40px;
                  color: #5e5050;
                  font: 16px/40px '微软雅黑';
                  margin-right: 15px;
                }
              }
              .close-panel {
                width: 12px;
                height: 12px;
                background-position: 0 -250px;
                position: absolute;
                right: 8px;
                top: 16px;
                cursor: pointer;
                transition: transform 0.2s ease-out 0s;
                display: inline-block;
                font-style: normal;
                background-image: url(./images/cartPanelViewIcons.png);
                background-repeat: no-repeat;
              }
            }
            .tbar-panel-main {
              position: relative;
              margin: 0;
              padding: 0;
              font: 12px/150% Arial, Verdana, '宋体';
              color: #666;
              .tbar-panel-content {
                width: 270px;
                overflow-y: auto;
                overflow-x: hidden;
                position: relative;
                .hide {
                  display: none;
                }
                .tbar-tipbox {
                  .tip-inner {
                    padding: 6px 5px;
                    border: 1px solid #edd28b;
                    background: #fffdee none repeat scroll 0 0;
                    text-align: center;
                    .tip-text {
                      display: inline-block;
                      line-height: 20px;
                      vertical-align: middle;
                      color: #333;
                    }
                    .tip-btn {
                      display: inline-block;
                      height: 20px;
                      line-height: 20px;
                      padding: 0 5px;
                      margin-left: 5px;
                      color: #fff;
                      vertical-align: middle;
                      background: #c81623 none repeat scroll 0 0;
                    }
                  }
                }
                .jt-history-wrap {
                  height: 1000px;
                  overflow-y: scroll;
                  width: 235px;
                  margin: 0 auto;
                  .jth-item {
                    float: left;
                    position: relative;
                    width: 190px;
                    height: 100%;
                    padding: 10px;
                    margin-right: 15px;
                    background: #fff none repeat scroll 0 0;
                    margin-bottom: 15px;
                    .coupon-price {
                      float: left;
                      width: 180px;
                      font-family: Arial;
                      font-size: 0;
                      font-weight: 700;
                      display: inline;
                      color: #74d2d4;
                      .token {
                        position: relative;
                        font-size: 16px;
                        font-family: 'microsoft yahei';
                        top: -8px;
                        left: 2px;
                        font-weight: 400;
                        color: #74d2d4;
                      }
                      .coupon-name {
                        font-size: 12px;
                        font-family: 'Microsoft Yahei';
                        font-weight: normal;
                        padding-left: 8px;
                        color: #74d2d4;
                      }
                    }
                    .coupon-info {
                      float: left;
                      display: inline;
                      width: 180px;
                      margin: 0 2px 0 0;
                      height: auto;
                      line-height: 18px;
                      color: #666;
                      font-family: 'Microsoft Yahei';
                      position: relative;
                    }
                    .coupon-time {
                      clear: both;
                      color: #999;
                      font-family: 'Microsoft Yahei';
                      width: 190px;
                    }
                    .coupon-seal {
                      position: absolute;
                      right: 12px;
                      bottom: 5px;
                      width: 47px;
                      height: 47px;
                      background: url(https://static.360buyimg.com/item/default/1.0.37/components/toolbar/i/coupon-new.png)
                        no-repeat;
                    }
                    .coupon-term {
                      position: absolute;
                      right: 12px;
                      bottom: 5px;
                      z-index: 2;
                      width: 55px;
                      height: 55px;
                      background: url(https://static.360buyimg.com/item/default/1.0.37/components/toolbar/i/coupon-new.png)
                        no-repeat -176px 0;
                    }
                    .sui-btn {
                      display: inline-block;
                      box-sizing: border-box;
                      margin-bottom: 0;
                      text-align: center;
                      vertical-align: middle;
                      cursor: pointer;
                      border-radius: 2px;
                      user-select: none;
                      border: 1px solid #1299ec;
                      color: #fff;
                      background-color: #28a3ef;
                      padding: 2px 14px;
                      line-height: 22px;
                      font-size: 14px;
                    }
                  }
                }
              }
            }
          }
        }
        .toolbar-tab {
          position: relative;
          width: 35px;
          height: 35px;
          margin-bottom: 1px;
          cursor: pointer;
          background-color: #7a6e6e;
          border-radius: 3px 0 0 3px;
          font: 12px/150% Arial, Verdana, '宋体';
          color: #666;
          display: inline-block;
          background-image: url(./images/cartPanelViewIcons.png);
          background-repeat: no-repeat;
          .tab-text {
            width: 62px;
            height: 35px;
            line-height: 35px;
            color: #fff;
            text-align: center;
            font-family: '微软雅黑';
            position: absolute;
            z-index: 1;
            left: 35px;
            top: 0;
            background-color: #7a6e6e;
            border-radius: 3px 0 0 3px;
            transition: left 0.3s ease-in-out 0.1s;
            font-style: normal;
            margin: 0;
            padding: 0;
            cursor: pointer;
          }
          .tab-sub {
            position: absolute;
            z-index: 3;
            right: 2px;
            top: -5px;
            height: 11px;
            padding: 1px 2px;
            border: 1px solid #e1251b;
            overflow: hidden;
            color: #fff;
            font: 11px/11px verdana;
            text-align: center;
            min-width: 11px;
            border-radius: 10px;
            background-color: #e1251b;
            cursor: pointer;
          }
        }
        .tab-ico {
          width: 34px;
          height: 35px;
          margin-left: 1px;
          position: relative;
          z-index: 2;
          background-color: #7a6e6e;
        }
        .toolbar-tabs {
          position: absolute;
          top: 50%;
          left: 0;
          width: 35px;
          margin-top: -61px;
          .tbar-tab-cart {
            background-position: -50px 0;
          }
          .tbar-tab-follow {
            background-position: -50px -50px;
          }
          .tbar-tab-history {
            background-position: -50px -100px;
          }
        }
        .toolbar-footer {
          position: absolute;
          bottom: -1px;
          width: 100%;
          margin: 0;
          padding: 0;
          font: 12px/150% Arial, Verdana, '宋体';
          color: #666;
          .tbar-tab-top {
            background-position: -50px -250px;
          }
          .tbar-tab-feedback {
            background-position: -50px -300px;
          }
          a {
            margin: 0;
            padding: 0;
            font: 12px/150% Arial, Verdana, '宋体';
            color: #666;
            text-decoration: none;
          }
          .footer-tab-text {
            width: 50px;
            height: 35px;
            line-height: 35px;
            color: #fff;
            text-align: center;
            font-family: '微软雅黑';
            position: absolute;
            z-index: 1;
            left: 35px;
            top: 0;
            background-color: #7a6e6e;
            border-radius: 3px 0 0 3px;
            transition: left 0.3s ease-in-out 0.1s;
            font-style: normal;
            margin: 0;
            padding: 0;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
