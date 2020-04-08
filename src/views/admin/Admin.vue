<template>
    <el-container class="meteor-admin-wrapper">
        <el-header class="admin-header meteor-flex-between">
            <span class="admin-header-link meteor-nyanCat"
               title="前往meteor博客前台"
               @click="$router.push({name:'Home'})">{{$conf.name}}</span>
            <span class="meteor-txtGradient admin-header-poet">{{poet}}</span>
            <el-dropdown  class="meteor-flex-center" @command="_handleCommand">
                <el-avatar :src="$conf.headImg"></el-avatar>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="SETTING">设置</el-dropdown-item>
                    <el-dropdown-item command="LOGOUT">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :router="true" style="border-right:none"
                         background-color="transparent"
                         text-color="#fff"
                         active-text-color="#333">
                    <el-menu-item v-for="(men,menNo) in $conf.nav.adminRou" :key="menNo" :index="men.name">
                        <i :class="men.meta.icon" style="color: inherit;"></i>
                        <span slot="title">{{men.meta.title}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container class="meteor-scroll-admin">
                <el-main style="height: calc(100vh - 120px)">
                    <el-scrollbar>
                        <router-view/>
                        <!--  回到顶部  -->
                        <el-backtop target=".meteor-scroll-admin .el-scrollbar__wrap" style="z-index: 100"/>
                    </el-scrollbar>
                </el-main>
                <el-footer>This is a footer , dont del me</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    const jinrishici =require('jinrishici');

    export default {
        name: "Admin",
        data(){
            return {
                poet:''
            }
        },
        mounted(){
          this._getJinRiShiCi()
        },
        methods:{
            _getJinRiShiCi(){
                let THAT = this;
                jinrishici.load(result => {
                    THAT.poet = result.data.content+'-'+result.data.origin.author;
                }, err => {
                    console.log(err);
                    THAT.poet ='' ;
                })
            },
            _handleCommand(command){
                switch (command) {
                    case 'LOGOUT':
                        this.$store.commit('user/user_logout');
                        this.$router.push({name:'Start'});
                        break;
                    default:
                        console.log(command);
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./admin.less";
</style>