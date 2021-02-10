<template>
  <div class="spec-preview">
    <img :src="smallIma" />
    <div class="event" ref="event" @mousemove="handlerMove"></div>
    <div class="big">
      <img :src="biglIma" ref="bigImg" />
    </div>
    <div class="mask" ref="mack"></div>
  </div>
</template>

<script>
export default {
  name: 'Zoom',
  props: {
    smallIma: String,
    biglIma: String,
  },
  mounted() {
    this.maskWith = this.$refs.event.clientWidth / 2
  },
  methods: {
    handlerMove(event) {
      // 获取鼠标移动的坐标
      let { offsetX, offsetY } = event
      // 获取蒙版对象
      const mack = this.$refs.mack
      // 获取大图
      const bigImg = this.$refs.bigImg
      // 获取遮挡层宽度
      const maskWith = this.maskWith
      // 设置鼠标在遮挡层的正中间位置
      let left = offsetX - maskWith / 2
      let top = offsetY - maskWith / 2
      left = left < 0 ? 0 : left > maskWith ? maskWith : left
      top = top < 0 ? 0 : top > maskWith ? maskWith : top
      mack.style.left = left + 'px'
      mack.style.top = top + 'px'
      // 移动大图
      bigImg.style.left = -left * 2 + 'px'
      bigImg.style.top = -top * 2 + 'px'
    },
  },
}
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
