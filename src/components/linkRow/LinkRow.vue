<template>
   <div class="meteor-linkRow">
       <h1 :id="linkData.title" class="meteor-txtGradient">
           <a :href="'#'+linkData.title" aria-hidden="true" class="meteor-header-anchor">#</a>
           <span>{{linkData.title}}</span>
       </h1>
       <blockquote>最后更新:{{linkData.lastUpdate}}</blockquote>
       <blockquote>{{linkData.desc}}</blockquote>
       <div class="page-resource" v-for="(row,key,rowIndex) in linkData.list" :key="'linkRow_'+rowIndex">
           <h2 :id="key">
               <a :href="'#'+key" aria-hidden="true" class="meteor-header-anchor">#</a>
               <span>{{key}}</span>
               <span class="item-list-count">/_{{row.length}}</span>
           </h2>
           <div class="item-list">
               <transition-group name="el-zoom-in-center" class="item-box">
                   <a class="item" :class="{'item-wall':item.outWall}"
                      v-for="(item,inIndex) in row" :key="item.title+'_'+inIndex"
                      :href="item.links" :title="item.desc" target="_blank">
                       <div class="left">
                           <img src="/img/refs/default.png" alt="">
                       </div>
                       <div class="right">
                           <div class="title meteor-text-upper">{{item.title}}</div>
                           <div class="des">{{item.desc}}</div>
                       </div>
                   </a>
               </transition-group>
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        name:"LinkRow",
        props:{
            linkData:{
                type:Object,
                default:()=>{
                    return {
                        title:'',
                        desc:'',
                        lastUpdate:'',
                        list:[]
                    }
                }
            }
        }
    }
</script>

<style lang="less">
    @import "./link";
</style>