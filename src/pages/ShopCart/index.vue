<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="shopCartLists in shopCartList"
          :key="shopCartLists.createTime"
        >
          <li
            v-for="cortInfo in shopCartLists.cartInfoList"
            :key="cortInfo.skuId"
          >
            <ul class="shopInfo">
              <!-- 商品是否选中 -->
              <li class="cart-list-con1">
                <input
                  type="checkbox"
                  name="chk_list"
                  :checked="cortInfo.isChecked"
                  @click="isCheck(cortInfo)"
                />
              </li>
              <!-- 商品图片和名字 -->
              <li class="cart-list-con2">
                <img :src="cortInfo.imgUrl" />
                <a
                  href="javascript:"
                  class="item-msg"
                  @click="$router.replace(`/detail/${cortInfo.skuId}`)"
                  >{{ cortInfo.skuName }}</a
                >
              </li>
              <!-- 优惠券和促销 -->
              <li class="cart-list-con4">
                <span class="price">{{ cortInfo.cartPrice }}</span>
                <!--优惠券-->
                <div
                  v-if="
                    cortInfo.couponInfoList !== null &&
                      cortInfo.couponInfoList.length > 0
                  "
                >
                  <a
                    href="javascript:;"
                    class="sales-promotion"
                    @click="couponInfoIndex = cortInfo.id"
                    >优惠券<b></b
                  ></a>
                  <div
                    class="promotion-tips"
                    style="width: 315px"
                    v-if="couponInfoIndex === cortInfo.id"
                  >
                    <div class="promotion-tit">优惠券<b></b></div>
                    <div class="promotion-cont" style="width: auto">
                      <div
                        class="p-coupon-item p-coupon-item-gray"
                        v-for="couponInfo in cortInfo.couponInfoList"
                        :key="couponInfo.id"
                      >
                        <div
                          class="coupon-price"
                          style="border-color: rgb(231, 70, 73)"
                        >
                          <span
                            class="txt"
                            style="color: rgb(231, 70, 73)"
                            v-if="couponInfo.couponType === 'CASH'"
                            >{{ couponInfo.benefitAmount }}元</span
                          >
                          <span
                            class="txt"
                            style="color: rgb(231, 70, 73)"
                            v-else-if="
                              couponInfo.couponType === 'FULL_REDUCTION'
                            "
                            >{{ couponInfo.benefitAmount }}元</span
                          >
                          <span
                            class="txt"
                            style="color: rgb(231, 70, 73)"
                            v-else-if="
                              couponInfo.couponType === 'FULL_DISCOUNT'
                            "
                            >{{ couponInfo.benefitDiscount }}折</span
                          >
                          <span
                            class="txt"
                            style="color: rgb(231, 70, 73)"
                            v-else-if="couponInfo.couponType === 'DISCOUNT'"
                            >{{ couponInfo.benefitDiscount }}折</span
                          >
                          >
                        </div>
                        <div class="coupon-msg">
                          <div>
                            <span
                              class="ctype"
                              v-if="couponInfo.couponType === 'CASH'"
                              >现金券</span
                            >
                            <span
                              class="ctype"
                              v-else-if="
                                couponInfo.couponType === 'FULL_REDUCTION'
                              "
                              >满减券</span
                            >
                            <span
                              class="ctype"
                              v-else-if="
                                couponInfo.couponType === 'FULL_DISCOUNT'
                              "
                              >满件打折券</span
                            >
                            <span
                              class="ctype"
                              v-else-if="couponInfo.couponType === 'DISCOUNT'"
                              >折扣券</span
                            >

                            <span
                              class="cinfo"
                              v-if="couponInfo.couponType === 'CASH'"
                              >现金券{{ couponInfo.benefitAmount }}元</span
                            >
                            <span
                              class="cinfo"
                              v-else-if="
                                couponInfo.couponType === 'FULL_REDUCTION'
                              "
                              >满{{ couponInfo.conditionAmount }}元减{{
                                couponInfo.benefitAmount
                              }}元</span
                            >
                            <span
                              class="cinfo"
                              v-else-if="
                                couponInfo.couponType === 'FULL_DISCOUNT'
                              "
                              >满{{ couponInfo.conditionNum }}件折{{
                                couponInfo.benefitDiscount
                              }}</span
                            >
                            <span
                              class="cinfo"
                              v-else-if="couponInfo.couponType === 'DISCOUNT'"
                              >折扣卷{{ couponInfo.benefitDiscount }}折</span
                            >
                          </div>
                          <div class="clearfix">
                            <div class="ftx-03 J_cpitems">
                              {{ couponInfo.rangeDesc }}
                            </div>
                            <i class="zyc-ico"></i>
                          </div>
                        </div>
                        <div class="coupon-opbtns">
                          <span
                            class="ftx-03"
                            v-if="
                              couponInfo.isGet > 0 &&
                                couponInfo.couponStatus === 'NOT_USED'
                            "
                            >已领取</span
                          >
                          <button
                            class="ftx-03"
                            v-if="couponInfo.isGet === 0"
                            @click="getDiscounts(couponInfo.id)"
                          >
                            领取
                          </button>
                        </div>
                      </div>
                      <div class="op-btns ac mt20">
                        <a
                          href="javascript:"
                          class="btn-9 ml10 del cancel-promotion"
                          @click="couponInfoIndex = null"
                          >取消</a
                        >
                      </div>
                    </div>
                    <div class="clr"></div>
                  </div>
                </div>
                <!-- 促销区域 -->
                <div
                  v-if="
                    shopCartLists.activityRuleList !== null &&
                      shopCartLists.activityRuleList.length > 0
                  "
                >
                  <a
                    href="javascript:;"
                    class="sales-promotion"
                    @click="promotionIndex = cortInfo.id"
                    >促销<b></b
                  ></a>
                  <div
                    class="promotion-tips"
                    v-if="promotionIndex === cortInfo.id"
                  >
                    <div class="promotion-tit" style="width: 43px">
                      促销<b></b>
                    </div>
                    <div class="promotion-cont">
                      <ul>
                        <template
                          v-for="(activity,
                          index) in shopCartLists.activityRuleList"
                        >
                          <li
                            :key="activity.id"
                            v-if="activity.activityType === 'FULL_REDUCTION'"
                          >
                            <input
                              type="radio"
                              :name="activity.skuId"
                              :value="index"
                              :checked="cortInfo.isChecked"
                            />满{{ activity.conditionAmount }}减{{
                              activity.benefitAmount
                            }}元
                          </li>
                          <li
                            :key="activity.id"
                            v-else-if="
                              activity.activityType === 'FULL_DISCOUNT'
                            "
                          >
                            <input
                              type="radio"
                              :name="activity.skuId"
                              :value="index"
                              :checked="cortInfo.isChecked"
                            />满{{ activity.conditionNum }}件打{{
                              activity.benefitDiscount
                            }}折
                          </li>
                        </template>
                      </ul>
                      <div class="op-btns ac mt20">
                        <a href="#none" class="btn-1 select-promotion">确定</a
                        ><a
                          href="#none"
                          class="btn-9 ml10 del cancel-promotion"
                          @click="promotionIndex = null"
                          >取消</a
                        >
                      </div>
                      <div class="clr"></div>
                    </div>
                  </div>
                </div>
              </li>
              <!-- 数量加减 -->
              <li class="cart-list-con5">
                <a
                  href="javascript:void(0)"
                  class="mins"
                  @click="updataSkuNum(cortInfo, -1)"
                  >-</a
                >
                <input
                  autocomplete="off"
                  type="text"
                  class="itxt"
                  :value="cortInfo.skuNum"
                  @input="validInput"
                  @change="
                    updataSkuNum(
                      cortInfo,
                      $event.target.value - cortInfo.skuNum,
                      $event
                    )
                  "
                />
                <a
                  href="javascript:void(0)"
                  class="plus"
                  @click="updataSkuNum(cortInfo, 1)"
                  >+</a
                >
              </li>
              <!-- 单个商品总价 -->
              <li class="cart-list-con6">
                <span class="sum">{{
                  cortInfo.cartPrice * cortInfo.skuNum
                }}</span>
              </li>
              <!-- 删除 -->
              <li class="cart-list-con7">
                <a
                  href="#none"
                  class="sindelet"
                  @click="deleteCart(cortInfo.skuId)"
                  >删除</a
                >
                <br />
                <a href="#none">移到收藏</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          type="checkbox"
          class="chooseAll"
          :checked="isAllCheck"
          @click="clickAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:" @click="deleteCheck">删除选中的商品</a>
        <a href="javascript:">移到我的关注</a>
        <a href="javascript:">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入vuex辅助函数
import { mapGetters, mapState } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  name: 'ShopCart',
  data() {
    return {
      isShow2: false,
      isShow1: false,
      couponInfoIndex: null, //判断是否显示优惠券
      promotionIndex: null,
    }
  },
  methods: {
    // 切换商品是否选中
    isCheck: debounce(async function(cart) {
      const { skuId, isChecked } = cart
      try {
        // 分发action
        await this.$store.dispatch('CheckCart', { skuId, isChecked })
      } catch (error) {
        this.$message.erroe(error.message || '领取失败')
      }
    }, 200),
    // 领取优惠券
    async getDiscounts(couponInfoid) {
      try {
        // 成功就分发action并且更新数据
        await this.$API.reqCouponId(couponInfoid)
        this.$store.dispatch('getCartList')
      } catch (error) {
        this.$message.error(error.message || '领取失败')
      }
    },
    // 修改数量
    updataSkuNum: debounce(async function(cart, num, event) {
      const { skuId, skuNum } = cart
      const targetNum = skuNum + num
      if (targetNum > 0) {
        try {
          await this.$store.dispatch('addTocart', { skuId, skuNum: num })
          this.$store.dispatch('getCartList')
        } catch (error) {
          this.$message.error(error.message || '修改数量失败了')
        }
      } else {
        if (event) {
          event.target.value = skuNum
        }
      }
    }, 200),
    // 输入事件
    validInput(event) {
      const value = event.target.value

      event.target.value = value.replace(/^0+|\D+0*/, '')
    },
    // 删除单个商品
    deleteCart: debounce(function(skuId) {
      this.$confirm('你确定要删除这个商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store
            .dispatch('deleteCart', skuId)
            .then(() => {
              this.$message.success('删除成功')
            })
            .catch((error) => {
              this.$message.error(error || '删除失败')
            })
        })
        .catch(() => {
          this.$message.error('已取消删除')
        })
    }, 200),
    // 全选按钮
    clickAll: debounce(async function() {
      try {
        await this.$store.dispatch('CheckCarts', this.isAllCheck)
      } catch (error) {
        this.$message.error(error || '选中失败')
      }
    }, 200),
    // 删除选中商品
    deleteCheck: debounce(function() {
      this.$confirm('你确定要删除这个商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$store
            .dispatch('deleteCarts')
            .then(() => {
              this.$message.success('删除成功')
            })
            .catch((error) => {
              this.$message.error(error || '删除失败')
            })
        })
        .catch(() => {
          this.$message.success('已取消删除')
        })
    }, 200),
  },
  computed: {
    ...mapGetters(['cartInfoLists', 'totalPrice', 'isAllCheck', 'totalNum']),
    ...mapState({
      shopCartList: (state) => state.AddCartSuccess.shopCartList,
    }),
  },
  mounted() {
    this.$store.dispatch('getCartList')
  },
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 5%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 35%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 15%;
      }
    }

    .cart-body {
      margin: 15px 0;

      .cart-list {
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-left: 1px solid #ddd;
        width: 1198px;
        margin-bottom: 30px;
        /*height:82px;*/ /*不能设置高度，如果描述内容过多会溢出，应该由内容撑开*/
        /*overflow: hidden;*/
        &:after {
          content: '';
          display: block;
          clear: both;
        }
        & > li {
          float: left;
          width: 100%;
          border-top: 1px solid #ddd;
          padding: 20px;
          box-sizing: border-box;

          .shopInfo {
            width: 100%;
            /*overflow: hidden;*/
            & > li {
              float: left;
            }
            .cart-list-con1 {
              width: 5%;
            }

            .cart-list-con2 {
              width: 35%;

              img {
                width: 82px;
                height: 82px;
                float: left;
              }

              .item-msg {
                float: left;
                width: 150px;
                margin: 0 10px;
                line-height: 18px;
              }
            }

            .cart-list-con4 {
              width: 15%;
              div {
                position: relative;
                .sales-promotion {
                  color: #e2231a;
                  display: inline-block;
                  width: 56px;
                  border: 1px solid #f9d2d3;
                  text-align: left;
                  line-height: 20px;
                  padding: 0 5px 0 5px;
                  cursor: pointer;
                  background: #fff;
                  text-decoration: none;
                  overflow: hidden;
                  position: relative;
                  b {
                    position: absolute;
                    right: 8px;
                    top: 8px;
                    width: 7px;
                    height: 4px;
                    overflow: hidden;
                    font-weight: bolder;
                    background: url(https://misc.360buyimg.com/user/cart/css/i/cart-icons-202004.png) -82px -3px;
                  }
                  &:hover {
                    color: #e2231a !important;
                  }
                }
                .promotion-tips {
                  position: absolute;
                  padding: 10px 14px 10px 10px;
                  width: 276px;
                  top: 19px;
                  box-shadow: 0 0 2px 2px #eee;
                  border: 1px solid #e4393c;
                  background: none repeat scroll 0 0 #fff;
                  text-align: left;
                  z-index: 99;
                  .promotion-tit {
                    position: absolute;
                    height: 19px;
                    line-height: 17px;
                    border: 1px solid #e4393c;
                    border-bottom: 0;
                    top: -20px;
                    left: -1px;
                    background: #fff;
                    color: #e2231a;
                    padding: 0 15px 0 8px;
                    cursor: pointer;
                    width: 43px;
                  }
                  .promotion-cont {
                    position: relative;
                    z-index: 99;
                    line-height: 23px;
                    width: 280px;
                    ul {
                      display: block;
                      li {
                        display: block !important;
                        padding: 2px 5px;
                        .input {
                          border: 1px solid #ddd;
                          cursor: pointer;
                          box-sizing: border-box;
                          padding: 0;
                        }
                      }
                    }
                    .op-btns {
                      margin-top: 20px;
                      text-align: center;
                      .select-promotion {
                        font-family: arial, Microsoft YaHei;
                        display: inline-block;
                        height: 25px;
                        line-height: 25px;
                        background-color: #e74649;
                        background-image: linear-gradient(
                          0deg,
                          #e74649 0,
                          #df3134
                        );
                        border-radius: 3px;
                        color: #fff;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0 10px;
                        vertical-align: middle;
                        cursor: pointer;
                        border: 0;
                        float: none;
                        transition: all 0.2s ease-out;
                      }
                      .cancel-promotion {
                        margin-left: 10px;
                        transition: all 0.2s ease-out;
                        display: inline-block;
                        height: 23px;
                        line-height: 23px;
                        background-color: #f2f2f2;
                        background-image: linear-gradient(
                          0deg,
                          #f2f2f2 0,
                          #f7f7f7
                        );
                        border-radius: 3px;
                        color: #323333;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 0 9px;
                        vertical-align: middle;
                        cursor: pointer;
                        float: none;
                        border: 1px solid #e1e1e1;
                      }
                    }
                    .p-coupon-item {
                      display: block;
                      margin: 10px 0;
                      overflow: hidden;
                      .coupon-price {
                        border-color: rgb(231, 70, 73);
                        position: relative;
                        height: 29px;
                        line-height: 29px;
                        width: 54px;
                        float: left;
                        font-size: 0;
                        margin: 2px 10px 0 0;
                        border: 1px solid #f9d2d3;
                        text-align: center;
                        padding: 0 2px;
                        .txt {
                          font-size: 12px;
                          color: rgb(231, 70, 73);
                          font-weight: 700;
                        }
                      }
                      .coupon-msg {
                        float: left;
                        width: 200px;
                        line-height: 18px;
                        font-weight: 400;
                      }
                      .coupon-opbtns {
                        float: left;
                        .coupon-btn {
                          display: inline-block;
                          height: 25px;
                          line-height: 25px;
                          background-color: #e74649;
                          border-radius: 3px;
                          color: #fff;
                          font-size: 12px;
                          font-weight: 400;
                          padding: 0 10px;
                          vertical-align: middle;
                          cursor: pointer;
                          border: 0;
                          float: none;
                        }
                      }
                    }
                  }
                }
              }
            }

            .cart-list-con5 {
              width: 15%;

              .mins {
                border: 1px solid #ddd;
                border-right: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }

              input {
                border: 1px solid #ddd;
                width: 40px;
                height: 31px;
                float: left;
                text-align: center;
                font-size: 14px;
              }

              .plus {
                border: 1px solid #ddd;
                border-left: 0;
                float: left;
                color: #666;
                width: 6px;
                text-align: center;
                padding: 8px;
              }
            }

            .cart-list-con6 {
              width: 15%;

              .sum {
                font-size: 16px;
              }
            }

            .cart-list-con7 {
              width: 15%;

              a {
                color: #666;
              }
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
