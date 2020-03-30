<template>
  <div id="meteor">
    <!--  页首  -->
    <HeaderBox v-show="isStart"/>
    <!--  占位块 -->
    <div v-if="isStart" class="meteor-fake-header"></div>
    <div class="meteor-scroll" :class="{'meteor-scroll-unStart':isStart}">
      <el-scrollbar>
        <!--  路由页  -->
        <router-view/>
        <!--  回到顶部  -->
        <el-backtop target=".meteor-scroll .el-scrollbar__wrap"/>
      </el-scrollbar>
    </div>
    <!--  页脚  -->
    <FooterBox/>
  </div>
</template>

<script>
  import HeaderBox from '@/components/header/HeaderBox'
  import FooterBox from '@/components/footer/FooterBox'
  export default {
    name: "App",
    components:{HeaderBox,FooterBox},
    computed:{
      isStart(){
        return this.$route.name&&('Start'!==this.$route.name)
      }
    },
    created(){
      //  初始化时间|位置|天气
      this.$store.dispatch('global/action_initGlobal',{vm:this})
    }
  }
</script>

<style scoped>
  .meteor-scroll {
    position: relative;
    height: 100vh;
    width: 100vw;
  }
  .meteor-scroll-unStart {
    height: calc(100vh - 6rem)
  }
  .meteor-fake-header{
    height: 6rem;
    width: 100%;
  }
</style>
