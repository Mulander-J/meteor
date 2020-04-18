<template>
    <div class="meteor-loginForm-wrapper" :class="'SIGN_UP'===state?'sign-wrapper':''">
        <div class="container-info">
            <div class="info-item">
                <div>
                    <h1>已有账号</h1>
                    <span class="meteor-btn-hover btn-hover-victor-1" @click="_switchForm('LOG_IN')">登录</span>
                </div>
            </div>
            <div class="info-item">
                <div>
                    <h1>尚未加入</h1>
                    <span class="meteor-btn-hover btn-hover-victor-2" @click="_switchForm('SIGN_UP')">注册</span>
                </div>
            </div>
        </div>
        <div class="container-form">
            <div class="form-item log-in meteor-flex-center" @keydown.enter="_handleLogin">
                <!-- login form-->
                <el-form :model="logParam" size="small">
                    <el-form-item>
                        <el-input v-model="logParam.name" clearable placeholder="用户名(区分大小写)"/>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" show-password v-model="logParam.password" placeholder="密码"/>
                    </el-form-item>
                    <span class="meteor-btn-hover btn-hover-victor-3" @click="_handleLogin">Log In</span>
                </el-form>
            </div>
            <div class="form-item sign-up meteor-flex-center" @keydown.enter="_handleSignUp">
                <!-- sign-up form-->
                <el-form :model="logParam" size="small">
                    <el-form-item>
                        <el-input v-model="logParam.name" clearable placeholder="用户名"/>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="logParam.mail" clearable placeholder="邮箱"/>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password" show-password v-model="logParam.password" placeholder="密码"/>
                    </el-form-item>
                    <span  class="meteor-btn-hover btn-hover-victor-4" @click="_handleSignUp">Sign Up</span>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoginForm",
        data(){
            return{
                state:'LOG_IN',
                logParam:{
                    name:'',
                    password:'',
                    mail:''
                }
            }
        },
        methods:{
            _switchForm(key){
                this.state = key;
                this.logParam = {
                    name:'',
                    password:'',
                    mail:''
                }
            },
            _handleSignUp(){
                this.$emit("on-signUp",this.logParam)
            },
            _handleLogin(){
                this.$emit("on-login",this.logParam)
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-loginForm-wrapper{
        width: max-content;
        margin: 2rem auto;
        color: #ffffff;
        background-color: #fa8072;
        transition: all 0.5s;
        font-size: 15px;
        position: relative;
        .container-info{
            .info-item{
                text-align: center;
                width: 20em;
                height: 20em;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                opacity: 1;
                transition: all 0.3s;
            }
        }
        .container-form{
            overflow: hidden;
            position: absolute;
            left:  2em;
            top: -2em;
            width: 18em;
            height: 24em;
            background-color: #fff;
            box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
            transition: all 0.5s;
            .form-item{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 1;
                transition: all 0.5s;
                .meteor-btn-hover{
                    color: #D24D57;
                    --hoverColor:#fa8072;
                }
            }
            .log-in{
                left: 0;
                opacity: 1;
            }
            .sign-up{
                position: absolute;
                left: -100%;
                opacity: 0;
            }
        }
    }
    .sign-wrapper {
        .container-form {
            left: 50%;
            .sign-up{
                left: 0;
                opacity: 1;
            }
            .log-in{
                left: -100%;
                opacity: 0;
            }
        }
    }
</style>