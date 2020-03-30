<template>
  <!--  Home页 -->
  <section class="meteor-home-wrapper">
    <div class="home-img left-img"></div>
    <div class="home-img right-img"></div>
    <!--  横批  -->
    <div class="meteor-home-header">
      <FlipBox direction="x" wrapClass="flip-border">
        <div slot="front" class="home-front">
          <p>{{$conf.homeLabel.header.front}}</p>
        </div>
        <div slot="back" class="home-back">
          <p class="txt-more">{{$conf.homeLabel.header.back}}</p>
        </div>
      </FlipBox>
    </div>
    <!--  中心  -->
    <div class="meteor-home-content">
      <!--  上联  -->
      <div class="home-content-left">
        <FlipBox direction="y" wrapClass="flip-border">
          <div slot="front" class="home-front">
            <p>{{$conf.homeLabel.left.front}}</p>
          </div>
          <div slot="back" class="home-back">
            <p class="txt-more">{{$conf.homeLabel.left.back}}</p>
          </div>
        </FlipBox>
      </div>
      <!--  下联  -->
      <div class="home-content-right">
        <FlipBox direction="y" wrapClass="flip-border">
          <div slot="front" class="home-front">
            <p>{{$conf.homeLabel.right.front}}</p>
          </div>
          <div slot="back" class="home-back">
            <p class="txt-more">{{$conf.homeLabel.right.back}}</p>
          </div>
        </FlipBox>
      </div>
      <!--  大堂  -->
      <div class="home-content-main">main</div>
    </div>
  </section>
</template>

<script>
  import FlipBox from '@/components/flipBox/FlipBox'
  export default {
    name: 'Home',
    components:{FlipBox},
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
  @import "home";
</style>
<style>
  .flip-border{
    border: 2px solid #daa4a0;
    box-sizing: border-box;
    padding: 4px;
  }
</style>