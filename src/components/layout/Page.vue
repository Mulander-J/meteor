<template>
    <div class="meteor-page-wrapper">
        <!--  页首  -->
        <HeaderBox/>
        <!--  占位块 -->
        <div class="meteor-fake-header"></div>
        <div class="meteor-scroll-unStart">
            <el-scrollbar>
                <!--  路由页  -->
                <keep-alive :include="aliveList">
                    <router-view/>
                </keep-alive>
                <!--    粒子背景    -->
                <vue-particles class="meteor-particle"
                               color="#3eaf7c"
                               :particleOpacity="0.7"
                               :particlesNumber="80"
                               shapeType="circle"
                               :particleSize="4"
                               linesColor="#3eaf7c"
                               :linesWidth="1"
                               :lineLinked="true"
                               :lineOpacity="0.4"
                               :linesDistance="150"
                               :moveSpeed="3"
                               :hoverEffect="true"
                               hoverMode="grab"
                               :clickEffect="true"
                               clickMode="push"/>
                <!--  回到顶部  -->
                <el-backtop target=".meteor-scroll-unStart .el-scrollbar__wrap" style="z-index: 100"/>
            </el-scrollbar>
        </div>
    </div>
</template>

<script>
    import VueParticles from 'vue-particles/src/vue-particles/vue-particles.vue'
    import HeaderBox from './header/HeaderBox'
    export default {
        name: "Page",
        components:{HeaderBox,VueParticles},
        data(){
            return {
                aliveList:['Home']
            }
        }
    }
</script>

<style scoped>

    .meteor-scroll-unStart {
        position: relative;
        width: 100vw;
        height: calc(100vh - 6rem)
    }
    .meteor-fake-header{
        height: 6rem;
        width: 100%;
    }
    .meteor-particle{
        z-index: 1;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: transparent;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
    }
</style>