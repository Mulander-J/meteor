<template>
  <!--  Home页 -->
  <section class="meteor-home-wrapper">
    <!--  横批  -->
    <div class="meteor-home-header">
      <p>上善若水</p>
      <p>鱼和熊掌我全都要...</p>
    </div>
    <div class="meteor-home-content">
      <!--  上联  -->
      <div class="home-content-left">
        <div class="flip">
          <div class="front">
            <p>呜呜呜上下求索</p>
          </div>
          <div class="back">
            <p>基于书签对知识点进行 整理，吸收，吐纳，归档。吾将上下而求索...</p>
          </div>
        </div>
      </div>
      <!--  下联  -->
      <div class="home-content-right">
        <p>吨吨吨左右横跳</p>
        <p>活着，是一件最能带来满足感的事。细细琢磨吧，人生啊，有意思的很...</p>
      </div>
      <!--  大堂  -->
      <div class="home-content-main">
        <p>奇怪的知识增加了</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return {
        isShow:false
      }
    },
    methods:{
      // ...mapMutations({
      //     'initGlobal':'global/_initGlobal'
      // }),
  }
}
</script>
<style scoped lang="less">
  @import "./home";
</style>