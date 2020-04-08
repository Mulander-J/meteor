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
            <LoginForm @on-login="handleLogin" @on-signUp="handleSignUp"/>
        </el-dialog>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {skyCircle} from '@/plugin/canvas'
    import LoginForm from './LoginForm'

    export default {
        name: "Start",
        components:{LoginForm},
        data(){
            return{
                isShow:false
            }
        },
        computed:{
            ...mapGetters({
                day_night:'global/day_night'
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
            /*  根据昼夜初始化背景 */
            initDayNight(){
                if(!this.day_night){    //  黑夜
                    this.$nextTick(()=>{
                        skyCircle('#starSky',true)
                    })
                }
            },
            /*  点击start链接 */
            handleLink(){
                if(this.$util._checkSession('meteor_user',['_id','name'])){
                    this._goToAdmin();
                }else {
                    this.isShow = true;
                }
            },
            /*  登录  */
            handleLogin(param){
                delete param.mail;
                let THAT = this;
                this.$api.user.login(param).then(res=>{
                    if(res.data.success){
                        sessionStorage.setItem('meteor_user',JSON.stringify({
                            _id:res.data.result[0]._id,
                            name:res.data.result[0].name
                        }));
                        THAT.isShow = false;
                        THAT._goToAdmin()
                    }else {
                        THAT.$message.error(res.data.msg)
                    }
                }).catch(err=>{
                    THAT.$message.error(err.message)
                })
            },
            /*  注册  */
            handleSignUp(param){
                let THAT = this;
                this.$api.user.save(param).then(res=>{
                    if(res.data.success){
                        sessionStorage.setItem('meteor_user',JSON.stringify({
                            _id:res.data.result[0]._id,
                            name:res.data.result[0].name
                        }));
                        THAT.isShow = false;
                        THAT._goToAdmin()
                    }else {
                        THAT.$message.error(res.data.msg)
                    }
                }).catch(err=>{
                    THAT.$message.error(err.message)
                })
            },
            /*  执行路由跳转   */
            _goToAdmin(){
                this.$router.push({name:'Admin'})
            }
        }
    }
</script>

<style scoped lang="less">
@import "./start";
</style>