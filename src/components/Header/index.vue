<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="userInfo.name">
            <span>{{ userInfo.name }}</span>
            <a href="javascript:;" @click="Logout" style="margin-left: 15px">
              退出</a
            >
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="javascript:;">我的尚品汇</a>
          <a href="javascript:;">尚品汇会员</a>
          <a href="javascript:;">企业采购</a>
          <a href="javascript:;">关注尚品汇</a>
          <a href="javascript:;">合作招商</a>
          <a href="javascript:;">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="" />
        </a> -->
        <router-link to="/" class="logo" title="尚品汇"
          ><img src="./images/logo.png" alt=""
        /></router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="search"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>
<script>
// 引入vuex的辅助函数
import { mapState } from 'vuex'
export default {
  name: 'Heater',
  data() {
    return {
      keyword: '', // 用户要搜索的商品
    }
  },
  mounted() {
    this.$bus.$on('removekeyword', () => {
      this.keyword = ''
    })
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    search() {
      // 点击搜索按钮跳转到search组件
      //this.$router.push(`/search`)
      // params的传参方式
      // this.$router.push(`/search/${this.keyword}`)
      // query的传参方式
      // this.$router.push(`/search?keyword=${this.keyword}`)
      // 无论是params的传参方式还是query的传参方式都可以以对象的传参方式
      // params的传参以对象的方式
      // this.$router.push({ name: 'search', params: { keyword: this.keyword } })
      // query的传参以对象的方式
      // this.$router.push({ path: '/search', query: { keyword: this.keyword } })
      // query的传参以对象的方式可以用name
      // this.$router.push({ name: 'search', query: { keyword: this.keyword } })
      //  params的传参以对象的方式不不不可以用path
      // this.$router.push({ name: 'search', params: { keyword: this.keyword } })
      const keyword = this.keyword.trim()
      const { path, query } = this.$route
      const obj = {
        query,
        name: 'search',
      }
      if (keyword) {
        obj.params = { keyword: this.keyword }
      }
      if (path.indexOf('/search') === 0) {
        this.$router.replace(obj)
      } else {
        this.$router.push(obj)
      }
      // 如果输入了内容就传参
      /* if (keyword) {
        // 如果在search页面就加上query参数
        if (path.indexOf('/search') === 0) {
          this.$router.push({
            name: 'search',
            params: { keyword: this.keyword },
            query,
          })
          // 如果不在search页面就只穿params参数
        } else {
          this.$router.push({
            name: 'search',
            params: { keyword: this.keyword },
          })
        }
      } else {
        // 如果没有输入内容,并且在search页面就不传params参数只加上query参数
        if (path.indexOf('/search') === 0) {
          this.$router.push({ name: 'search', query })
          // 如果不在search页面也没有输入内容就不传任何参数
        } else {
          this.$router.push({ name: 'search' })
        }
      } */
    },
    // 点击退出
    Logout() {
      this.$confirm('您确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          this.$message.success('退出成功')
          await this.$store.dispatch('Logout')
          this.$router.replace('/login')
        })
        .catch(() => {
        })
    },
  },
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
