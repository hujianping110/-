<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">
        收件人信息
        <a href="javascript:;" style="float:right" @click="addConsignee"
          >新增收件人地址</a
        >
      </h5>

      <div
        class="address clearFix"
        v-for="(userAddress, index) in userAddressList"
        :key="userAddress.id"
        @click="userAddressIndex = index"
      >
        <span
          class="username"
          :class="{ selected: userAddressIndex === index }"
          >{{ userAddress.consignee }}</span
        >
        <p>
          <span class="s1">{{ userAddress.fullAddress }}</span>
          <span class="s2">{{ userAddress.phoneNum }}</span>
          <span class="s3" v-if="userAddress.isDefault == 1">默认地址</span>
        </p>
        <div style="float:right">
          <a href="javascript:;" @click="updata(userAddress)">修改</a>
          <a
            href="javascript:;"
            style="margin-left:10px"
            @click="deleteDate(userAddress.id)"
            >删除</a
          >
        </div>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
          class="list clearFix"
          v-for="item in orderDate.detailArrayList"
          :key="item.skuId"
        >
          <!-- 商品图片 -->
          <li>
            <img :src="item.imgUrl" alt="" width="100" />
          </li>
          <!-- 优惠 -->
          <li class="activity">
            <div class="goods-suit-tit" v-if="item.activityRule !== null">
              <template
                v-if="item.activityRule.activityType === 'FULL_REDUCTION'"
              >
                <strong
                  >满{{ item.activityRule.conditionAmount }}元,减{{
                    item.activityRule.benefitAmount
                  }}元</strong
                >
                <span class="ml20">
                  &nbsp;返现：<em>{{ item.activityRule.benefitAmount }}元</em>
                </span>
              </template>

              <template
                v-else-if="item.activityRule.activityType === 'FULL_DISCOUNT'"
              >
                <strong
                  >满{{ item.activityRule.conditionNum }}件打{{
                    item.activityRule.benefitDiscount
                  }}折</strong
                >
                <span class="ml20">
                  &nbsp;打折：<em>{{ item.activityRule.benefitDiscount }}折</em>
                </span>
              </template>
            </div>
            <p>{{ item.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>

          <li>
            <h3>￥{{ item.orderPrice }}</h3>
          </li>
          <li>X{{ item.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="orderComment"
        ></textarea>
      </div>
      <div class="line"></div>
      <!-- 发票信息区域 -->
      <div class="linkInfo">
        <div class="step-tit">
          <h5>发票信息</h5>
        </div>
        <div class="step-cont">
          <span>普通发票（电子）</span>
          <span>个人</span>
          <span>明细</span>
        </div>
      </div>
      <!-- 优惠券选择区域 -->
      <div class="cardInfo">
        <div class="step-tit">
          <h5>使用优惠/抵用</h5>
          <div class="coupon-enable">
            <div
              class="c-detail"
              v-for="(couponInfo, index) in orderDate.couponInfoList"
              :key="couponInfo.id"
              :class="couponInfoIndex === index ? 'item-selected' : ''"
              @click="discount(index, couponInfo.benefitAmount)"
            >
              <div class="c-msg c-dong c-nopointer">
                <div class="c-top-dong"></div>
                <div class="c-price">
                  <em v-if="couponInfo.couponType === 'CASH'"
                    >{{ couponInfo.benefitAmount }}元</em
                  >
                  <em v-else-if="couponInfo.couponType === 'FULL_REDUCTION'"
                    >{{ couponInfo.benefitAmount }}元</em
                  >
                  <em v-else-if="couponInfo.couponType === 'FULL_DISCOUNT'"
                    >{{ couponInfo.benefitDiscount }}折</em
                  >
                  <em v-else-if="couponInfo.couponType === 'DISCOUNT'"
                    >{{ couponInfo.benefitDiscount }}折</em
                  >
                </div>
                <div class="c-limit">
                  <span class="ctype" v-if="couponInfo.couponType === 'CASH'"
                    >现金券</span
                  >
                  <span
                    class="ctype"
                    v-else-if="couponInfo.couponType === 'FULL_REDUCTION'"
                    >满减券</span
                  >
                  <span
                    class="ctype"
                    v-else-if="couponInfo.couponType === 'FULL_DISCOUNT'"
                    >满件打折券</span
                  >
                  <span
                    class="ctype"
                    v-else-if="couponInfo.couponType === 'DISCOUNT'"
                    >折扣券</span
                  >
                </div>
                <div class="c-time c-time-dong">
                  <span>有效期至{{ couponInfo.expireTime }}</span>
                </div>
              </div>
              <div class="c-type c-type-dong">
                <span class="c-type-l">[东券]</span>
                <span class="c-type-r">[限品类]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单优惠信息区域 -->
    <div class="order-summary">
      <div class="static fr">
        <div class="list">
          <span><i class="number">5</i>件商品，总商品金额</span>
          <em class="allprice">¥{{ orderDate.totalAmount }}元</em>
        </div>
        <div class="list">
          <span>运费：</span>
          <em class="transport">¥0元</em>
        </div>
        <div class="list">
          <span>返现：</span>
          <em class="money">¥0元</em>
        </div>
        <div class="list">
          <span>优惠券：</span>
          <em class="transport">¥{{ couponAmount }}元</em>
        </div>
      </div>
    </div>
    <div class="trade">
      <div class="price">
        应付金额: <span>¥{{ orderDate.totalAmount - couponAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ selectedAddress.fullAddress }}</span>
        收货人：<span>{{ selectedAddress.consignee }}</span>
        <span>{{ selectedAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <!-- <router-link class="subBtn" to="/pay">提交订单</router-link> -->
      <a href="javascript:;" class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Trade',
  data() {
    return {
      userAddressIndex: null,
      couponInfoIndex: null, // 优惠券高亮
      couponAmount: 0,
      orderComment: '',
    }
  },
  computed: {
    ...mapState({
      userAddressList: (state) => state.user.userAddressList, // 用户购物信息
      orderDate: (state) => state.order.orderDate, // 用户地址信息
      // 选中的地址信息的索引变化了，选中的地址信息对象就要跟着变化
      selectedAddress() {
        return this.userAddressList[this.userAddressIndex] || {}
      },
    }),
  },

  methods: {
    // 获取商品列表
    getOrderDate() {
      this.$store.dispatch('getOrderDate')
    },
    // 获取收件人地址
    getuserAddressList() {
      this.$store.dispatch('getuserAddressList')
    },
    // 新建收件人
    addConsignee() {
      this.address = this.$address()
      // 点取消
      this.address.cancel = () => {
        this.address.unmount()
      }
      // 点确定
      this.address.confirm = async (formData) => {
        try {
          // 成功调用接口添加地址
          await this.$API.reqUserAddresssave(formData)
          this.$message.success('成功')
          this.getuserAddressList()
          this.address.unmount()
        } catch (error) {
          this.$message.error('失败')
        }
      }
    },
    // 修改地址
    updata(data) {
      this.address = this.$address()
      // 点取消
      this.address.cancel = () => {
        this.address.unmount()
      }
      // 点确定
      this.address.confirm = async (formData) => {
        try {
          // 修改地址
          await this.$API.reqUpdateUserAddress(formData)
          this.getuserAddressList()
          this.$message.success('成功')
          this.address.unmount()
        } catch (error) {
          this.$message.error('失败')
        }
      }
      this.address.formData = data
    },
    // 删除数据
    deleteDate(id) {
      this.$confirm('你确定要删除这个商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$API
            .reqUserDeleteress(id)
            .then(() => {
              this.getuserAddressList()
              this.$message.success('删除成功')
            })
            .catch((error) => {
              this.$message.error(error || '删除失败')
            })
        })
        .catch(() => {
          this.$message.success('已取消删除')
        })
    },
    // 点击优惠券
    discount(index, benefitAmount) {
      // 点击的下标和当前的下标相等时取消高亮并且把优惠金额变成0
      if (this.couponInfoIndex == index) {
        // 相等就取消高亮
        this.couponInfoIndex = null
        this.couponAmount = 0
      } else {
        // 不相等就然他高亮
        this.couponInfoIndex = index
        this.couponAmount = benefitAmount
      }
    },
    // 提交订单
    async submitOrder() {
      let {
        userAddressIndex,
        userAddressList,
        orderDate: { detailArrayList, couponInfoList, tradeNo },
        couponInfoIndex,
      } = this
      let {
        consignee,
        phoneNum,
        fullAddress,
        orderComment,
        provinceId,
      } = userAddressList[userAddressIndex]
      // 优惠券数组列表
      let selectedCouponInfo = couponInfoList[couponInfoIndex]
      if (selectedCouponInfo) {
        couponInfoList = [selectedCouponInfo]
      } else {
        couponInfoList = []
      }
      const orderInfo = {
        consignee, //收件人姓名
        consigneeTel: phoneNum, //收件人电话
        deliveryAddress: fullAddress, //收件地址
        paymentWay: 'ONLINE', //支付方式(ONLINE代表在线)
        orderComment, //订单备注
        orderDetailList: detailArrayList, //存储多个商品对象的数组
        couponInfoList, // 优惠券列表信息
        provinceId, //收货地址地区ID
      }
      const promice = await this.$API.reqSubmitOrderInfo(tradeNo, orderInfo)
      const orderId = promice.data
      if (promice.code === 200) {
        this.$router.push({ path: 'pay', query: { orderId } })
      } else {
        alert(promice.message)
      }
    },
  },
  mounted() {
    this.getOrderDate()
    this.getuserAddressList()
  },
  watch: {
    // 监视用户地址获取到被选中地址的下标
    userAddressList(newVal) {
      this.userAddressIndex = newVal.findIndex((item) => item.isDefault == '1')
    },
    // 监视优惠券
    'orderDate.couponInfoList'(newVal) {
      if (newVal.length > 0) {
        // 获取到下标
        this.couponInfoIndex = newVal.findIndex((item) => item.isChecked == '1')
        // 获取到优惠金额
        this.couponAmount = newVal[this.couponInfoIndex].benefitAmount
      }
    },
  },
}
</script>
<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .receive {
      a {
        font-size: 12px;
        float: right;
        &:hover {
          color: #4cb9fc;
          text-decoration: underline;
        }
      }
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: '';
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;
      padding: 15px;
      background: #f4f4f4;
      margin: 5px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;
        background: #feedef;
        margin-bottom: 5px;
        .activity {
          width: 500px;
          strong {
            font-weight: bold;
          }
          .ml20 {
            margin-left: 20px;
            font-weight: 700;
            display: inline-block;
            border: 1px solid rgb(122, 189, 84);
            color: rgb(122, 189, 84);
            padding: 2px 5px;
          }
        }
        li {
          line-height: 30px;

          // p {
          //   margin-bottom: 20px;
          // }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .cardInfo {
      margin-bottom: 25px;
      .step-tit {
        line-height: 36px;
        margin: 15px 0;
        .coupon-enable {
          display: block;
          width: 920px;
          clear: both;
          margin-top: 10px;
          .c-detail {
            width: 200px;
            height: 120px;
            margin-left: 20px;
            display: inline-block;
            &.item-selected {
              border: 2px solid #e43a3d;
              background-image: url(//misc.360buyimg.com/user/purchase/2.0.0/css/i/coupon-selected.png);
              background-repeat: no-repeat;
              background-position: bottom right;
            }
            .c-nopointer {
              cursor: default !important;
              background-color: rgb(116, 210, 212);
              height: 85px;
              width: 100%;
              position: relative;
              border-left: 0;
              border-right: 0;
              .c-top-dong {
                height: 3px;
                width: 100%;
                background: #fff
                  url(https://misc.360buyimg.com/user/purchase/2.0.0/css/i/virtual-spite.png) -36px -6px
                  no-repeat;
              }
              .c-price {
                color: #fff;
                font: 24px Arial, Verdana, 'Microsoft YaHei', SimSun;
                display: inline;
                position: relative;
                top: 8px;
                margin-left: 12px;
                vertical-align: bottom;
                cursor: default !important;
              }
              .c-limit {
                color: #f5f5f5;
                font-size: 12px;
                display: inline;
                position: relative;
                top: 7px;
              }
              .c-time {
                padding-left: 12px;
                margin-top: 10px;
              }
            }
            .c-type {
              color: #74d2d4;
              border: 1px solid #cef0f1;
              width: 100%;
              box-sizing: border-box;
              .c-type-l {
                margin: 0 5px 0 12px;
              }
              .c-type-r {
                margin: 0;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

  .order-summary {
    width: 1200px;
    overflow: hidden;
    padding-right: 20px;
    margin: 20px auto 0;
    .static {
      float: right;
      .list {
        line-height: 26px;
        span {
          float: left;
          width: 160px;
          .number {
            color: red;
          }
        }
        em {
          font-family: '微软雅黑';
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px '微软雅黑';
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>
