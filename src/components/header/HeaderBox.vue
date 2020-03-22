<template>
    <div class="meteor-header-wrapper">
        <a class="meteor-header-startLink meteor-txtGradient" href="/start">{{$conf.name}}</a>
        <div class="meteor-header-right">
            <div class="search-box">
                <input placeholder="" spellcheck="false" autocomplete="off">
            </div>
            <nav class="nav-links">
                <div class="nav-item" v-for="(item,index) in asyncLinks" :key="index">
                    <template>
                        <DropDown v-if="item.children" :title="item.name" :list="item.children"></DropDown>
                        <a v-else-if="item.href" :href="item.href" class="meteor-outBound" target="_blank">{{item.name}}</a>
                        <router-link v-else :to="item">{{item.name}}</router-link>
                    </template>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import DropDown from './../dropDown/DropDown'
    export default {
        name: "HeaderBox",
        components:{DropDown},
        computed:{
            ...mapGetters(["user/userInfo","user/visitorInfo"]),
            asyncLinks(){
                if(this.userInfo){
                    return this.links
                }else {
                    return this.links.filter(ele=>!ele.needUser)
                }

            }
        },
        data () {
            return {
                links:[
                    {name:'Home',href:null,needUser:true},
                    {name:'Blog',href:null,needUser:true},
                    {name:'BookMark',href:null,children:[{name:'Daily',},{name:'Devil'}]},
                    {name:'Tool',href:null},
                    {name:'Help',href:this.$conf.homepage}
                ]
            }
        }
    }
</script>

<style scoped lang="less">
@import "./header.less";
</style>