<template>
  <div>
    小明的爸爸现在有{{ total }}元

    <h2>不使用sync修改符</h2>
    <!-- <Child :money="total" @update="changeMoney" /> -->
    <Child :money="total" @update:money="changeMoney" />
    <h2>使用sync修改符</h2>
    <Child :money.sync="total" />
    <h2>使用v-model修改符</h2>
    <Child2 v-model="total" />
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'
export default {
  name: 'SyncTest',

  data() {
    return {
      total: 1000,
    }
  },
  components: {
    Child,
    Child2,
  },
  methods: {
    changeMoney(value) {
      this.total = value
    },
  },
}
</script>
