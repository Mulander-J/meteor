<template>
  <!--  Home页 -->
  <section class="meteor-home-wrapper">
    <div class="home-img left-img"></div>
    <div class="home-img right-img"></div>
    <!--  横批  -->
    <div class="meteor-home-header" style="font-size: 1.6em">
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
          <div slot="front" class="home-front" style="font-size: 1.6em">
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
          <div slot="front" class="home-front" style="font-size: 1.6em">
            <p>{{$conf.homeLabel.right.front}}</p>
          </div>
          <div slot="back" class="home-back">
            <p class="txt-more">{{$conf.homeLabel.right.back}}</p>
          </div>
        </FlipBox>
      </div>
      <!--  大堂  -->
      <div class="home-content-main">
        <div class="home-action meteor-flex-center">
          <div class="home-user" @click="_openUserDialog"></div>
          <input v-model.lazy="pixelVal" placeholder=""/>
        </div>
        <div id="homePixel"></div>
      </div>
    </div>
    <!--    用户信息对话框  -->
    <el-dialog  title="UserInfo" :visible.sync="isShow">
      <userInfo/>
    </el-dialog>
  </section>
</template>

<script>
  import FlipBox from '@/components/flipBox/FlipBox'
  import userInfo from '@/components/userInfo/userInfo'
  import {_pixel} from '@/plugin/pixel.js'
  export default {
    name: 'Home',
    components:{FlipBox,userInfo},
    data(){
      return {
        isShow:false,
        pixelVal:'',
        pixelObj:null,
        homeTimer:null
      }
    },
    watch:{
      pixelVal(newVal){
        if(this.homeTimer)clearInterval(this.homeTimer);
        if(this.pixelObj){
          if('#meteor'===newVal){
            this._timerStart()
          }else {
            this.pixelObj.cmdHandler(newVal)
          }
        }
      }
    },
    mounted(){
      this._drawCanvas()
    },
    beforeDestroy(){
      if(this.homeTimer)clearInterval(this.homeTimer);
      this.homeTimer = null;
      this.pixelObj.destroy();
      this.pixelObj = null;
    },
    methods: {
      _drawCanvas(){
        let pixShape = _pixel('#homePixel');
        pixShape.init(document.querySelector('#homePixel'));
        this.pixelVal = '#meteor';
        this.pixelObj = pixShape;
        this._timerStart();
      },
      _timerStart(){
        const duration = 2*60*1000;
        const strLine= this.$conf.homeLabel.pixelLoop;
        let _index = 0;
        this.pixelObj.print(this.pixelVal);
        this.homeTimer = setInterval(()=>{
          if(this.pixelObj){
            this.pixelObj.print(strLine[_index++]);
            if(_index===(strLine.length))_index=0
          }
        },duration/(strLine.length))
      },
      _openUserDialog(){
        this.isShow = true
      }
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