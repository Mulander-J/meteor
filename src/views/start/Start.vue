<template>
    <!--    开始页 -->
    <section class="meteor-start-wrapper">
        <!--    云层  -->
        <div class="layer layer-cloud" v-if="day_night">
            <div class="dynamic-cloud the-cloud1"></div>
            <div class="dynamic-cloud the-cloud2"></div>
        </div>
        <!--    星层  -->
        <div class="layer layer-star meteor-flex-center" v-else>
            <canvas id="starSky"></canvas>
        </div>
        <!--    艾恩格朗特主城 -->
        <div class="layer layer-main meteor-flex-center">
            <div class="tower" :class="{'tower-eve':!day_night}"></div>
        </div>
        <!--    文字链接    -->
        <div class="layer layer-txt meteor-flex-center">
            <div class="txt-box">
                <span class="link-start" @click="handleLink">start</span>
            </div>
        </div>
        <!--    初始化对话框  -->
        <el-dialog  title="Start" :visible.sync="isShow">
            <div>
                开始配置
                <el-button @click="handleStart">开始</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {skyCircle} from '@/plugin/canvas'
    export default {
        name: "Start",
        data(){
            return{
                isShow:false
            }
        },
        computed:{
            ...mapGetters({
                day_night:'global/day_night',
                userInfo:'user/userInfo'
            })
        },
        watch:{
          day_night(){
              this.initDayNight()
          }
        },
        mounted () {
            this.initDayNight()
        },
        methods:{
            /**
             * @description 根据昼夜初始化背景
             */
            initDayNight(){
                if(!this.day_night){    //  黑夜
                    this.$nextTick(()=>{
                        skyCircle('#starSky',true)
                    })
                }
            },
            /**
             * @description 点击start链接
             */
            handleLink(){
                if(this.userInfo){
                    this._goToHome();
                }else {
                    this.isShow = true;
                }
            },
            /**
             * @description  开始对话框点击确认
             */
            handleStart(){
                this.isShow = false;
                localStorage.setItem('meteor_user',JSON.stringify({userId:1}));
                this._goToHome();
            },
            /**
             * @description 执行路由跳转|start-home
             * @private
             */
            _goToHome(){
                this.$router.push({name:'Home'})
            }
        }
    }
</script>

<style scoped lang="less">
@import "./start";
</style>