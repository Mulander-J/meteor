<template>
    <div class="meteor-header-wrapper meteor-flex-between">
        <!--    左侧logo  -->
        <a class="meteor-header-startLink meteor-nyanCat"
           title="前往meteor管理后台" @click="_goRouter({name:'Admin'})">{{$conf.name}}</a>
        <div class="meteor-header-right">
            <!--    整站搜索    -->
            <el-input class="search-box"  size="small" prefix-icon="el-icon-search" placeholder=""></el-input>
            <!--    导航链接    -->
            <nav class="nav-links">
                <div class="nav-item" v-for="(item,index) in $conf.nav.data" :key="index">
                    <template>
                        <el-dropdown v-if="item.children" @command="_goRouter">
                            <span class="nav-drop-link">{{item.name}}</span>
                            <span class="nav-drop-ico"></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item v-for="(child,chiNo) in item.children" :key="'drop'+chiNo" :command="child">
                                    <span>{{child.name}}</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <router-link class="nav-drop-link" v-else :to="item">{{item.name}}</router-link>
                    </template>
                </div>
                <div v-if="$conf.nav.showHelp" class="nav-item">
                    <a :href="$conf.homepage" class="nav-drop-link meteor-outBound" target="_blank">Help</a>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderBox",
        methods:{
            _goRouter(item){
                this.$router.push(item)
            }
        }
    }
</script>

<style scoped lang="less">
@import "header.less";
</style>