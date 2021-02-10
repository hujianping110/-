<template>
  <div>
    <div class="refundList">
      <div class="body">
        <div class="table-title">
          <table class="sui-table order-table">
            <tr>
              <th width="30%">退款/退货宝贝</th>
              <th width="8%">类型</th>
              <th width="5%">金额</th>
              <th width="5%">数量</th>
              <th width="8%">原因</th>
              <th width="10%">交易状态</th>
              <th width="8%">退货单号</th>
              <th width="5%">操作</th>
            </tr>
          </table>
        </div>
        <div class="order-detail">
          <div class="orders">
            <!--遍历数据-->
            <div v-for="item in records" :key="item.id">
              <div class="choose-title hm-display-statistics">
                <label class="checkbox-pretty ">
                  <span>订单编号: {{item.outTradeNo}} 申请时间: {{item.createTime}}</span>
                </label>
              </div>
              <table class="sui-table table-bordered order-datatable">
                <tbody>
                  <tr>
                    <td width="30%">
                      <div class="typographic">
                        <img
                          :src="item.imgUrl"
                          width="45"
                          height="65"
                        />
                        <a href="javascript:;">{{item.skuName}}</a>
                        <span class="guige">规格：你懂得</span>
                      </div>
                    </td>
                    <td width="5%" class="center">退款</td>
                    <td width="5%" class="center">
                      <ul class="unstyled">
                        <li class="o-price">{{item.orderPrice}}元</li>
                        <li>¥{{item.refundAmount}}元</li>
                      </ul>
                    </td>
                    <td width="5%" class="center">{{item.refundAmount/item.orderPrice}}</td>
                    <td width="8%" class="center">
                      <ul class="unstyled">
                        <li><a>{{item.refundReasonTypeString}}</a></li>
                      </ul>
                    </td>
                    <td width="10%" class="center">
                      <ul class="unstyled">
                        <li>坏了</li>
                        <li>原因：退款完成</li>
                      </ul>
                    </td>
                    <td width="8%" class="center">{{item.orderId}}</td>
                    <td width="5%" class="center">
                      <ul class="unstyled">
                        <li>
                          <a href="javascript:">发货</a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!--分页-->
      <Pagination
        :pageConfig="{
          total: total,
          showPageNo: 5,
          pageNo: page,
          pageSize: limit,
        }"
      ></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RefundList',
  data() {
    return {
      page:1, // 显示第几页数据
      limit: 5 , // 一页多少条数据
      records:[],
      showPageNo: 5,
      total: 0
    }
  },
  mounted() {
    this.getRefundInfoList()
    this.$bus.$on('switchPage',data=>{
       this.getRefundInfoList(data)
    })
  },
  methods: {
    async getRefundInfoList(page = 1) {
      this.page = page
      const promice = await this.$API.reqRefundInfoList(this.page, this.limit)
      if(promice.code === 200) {
        this.records = promice.data.records
        this.total = promice.data.total
      } else {
        this.$message.error(promice.message || '请求失败')
      }
    },
  },
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.refundList {
  padding: 0 25px;
  .table-title {
    width: 100%;
    .sui-table {
      width: 100%;
      border: 1px solid #e6e6e6;
      border-collapse: separate;
      border-left: 0;
      border-radius: 2px;
      tr {
        width: 100%;
        th {
          background-color: #f4f4f4;
          border-left: 1px solid #e6e6e6;
          height: 30px;
          line-height: 30px;
        }
        td {
          border-left: 1px solid #e6e6e6;
        }
      }
    }
  }
  .order-detail {
    margin-bottom: 10px;
    .orders {
      padding: 10px 0;
      .choose-title {
        padding: 2px 0;
        margin-top: 10px;
        line-height: 28px;
        border: 1px solid #ddd;
        border-bottom: 0;
        overflow: hidden;
        background: #f1f1f1;
        .checkbox-pretty {
          float: left;
          padding-left: 10px;
          .radio-pretty {
            display: block;
            position: relative;
          }
          span {
            font-size: 12px;
            font-family: icon-pc;
          }
          span:before {
            content: '\e605';
            margin-right: 2px;
            vertical-align: -4px;
            font-size: 150%;
            color: #666;
            margin-left: -2px;
          }
        }
      }
      .sui-table.table-bordered {
        width: 100%;
        border: 1px solid #e6e6e6;
        border-collapse: separate;
        border-left: 0;
        border-radius: 2px;
        margin-bottom: 18px;
        max-width: 100%;
        background-color: transparent;
        border-spacing: 0;
        th {
          background-color: #f4f4f4;
          border-left: 1px solid #e6e6e6;
        }
        tbody {
          td {
            border-left: 1px solid #e6e6e6;
            padding: 10px 0;
            text-align: center;

            .typographic {
              img {
                display: block;
                float: left;
                max-width: 100%;
                border: 0;
                margin: 0 10px;
              }
              a {
                display: block;
                float: left;
                min-width: 80px;
                max-width: 250px;
                color: #e1251b;
                text-align: left;
              }
              .guige {
                display: block;
                float: left;
                min-width: 80px;
                max-width: 250px;
                text-align: center;
                line-height: 36px;
                color: #a8a6a6;
              }
            }
            .unstyled {
              li {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
