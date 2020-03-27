<template>
    <!--    开始页 -->
    <div class="meteor-start-wrapper">
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
        <Modal v-model="isShow" title="准备开始" @on-ok="handleStart">
            <div slot="content">
                开始配置
            </div>
        </Modal>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {skyCircle} from '@/lib/plugin/canvas'
    import Modal from '@/components/dialog/m-dialog'
    export default {
        name: "Start",
        components:{Modal},
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
                    this._goToHome({userId:1});
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
                this._goToHome({userId:1});
            },
            /**
             * @description 执行路由跳转|start-home
             * @param query
             * @private
             */
            _goToHome(query){
                this.$router.push({name:'Home',query:query})
            }
        }
    }
</script>

<style scoped lang="less">
@import "./start";
</style>