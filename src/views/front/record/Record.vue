<template>
    <section class="meteor-record-wrapper">
        <!--    菜单  -->
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" style="z-index: 20;background-color: transparent;">
            <template v-for="(menuItem,menuNo) in $conf.recMenu">
                <el-submenu v-if="menuItem.children" :index="menuItem.name" v-bind:key="'rec_menu_'+menuNo">
                    <template slot="title">{{menuItem.meta.title}}</template>
                    <el-menu-item v-for="(chi,chiNo) in menuItem.children" :key="'rec_menu_'+menuNo+'_'+chiNo"
                                  :index="chi.name">{{chi.meta.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="menuItem.name" v-bind:key="'rec_menu_'+menuNo">{{menuItem.meta.title}}</el-menu-item>
            </template>
        </el-menu>
        <router-view></router-view>
    </section>
</template>

<script>
    export default {
        name: "Record",
        data(){
            return {
                activeIndex:'RecLog'
            }
        },
        methods:{
            handleSelect(v){
                this.$router.push({name:v})
            }
        }
    }
</script>

<style scoped>
    .meteor-record-wrapper{
        padding: 2rem;
    }
</style>