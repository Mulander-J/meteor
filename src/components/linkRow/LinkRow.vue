<template>
   <div class="meteor-linkRow">
       <div class="page-resource" v-for="(row,rowIndex) in linkData" :key="'linkRow_'+rowIndex">
           <h2 :id="row[groupKey]">
               <a :href="'#'+row[groupKey]" aria-hidden="true" class="meteor-header-anchor">#</a>
               <span>{{row[groupKey]}}</span>
               <span class="item-list-count">/_{{row.group.length}}</span>
           </h2>
           <div class="item-list">
               <transition-group name="el-fade-in-linear" class="item-box">
                   <a class="item" target="_blank"
                      v-for="(item,inIndex) in row.group" :key="item.name+'_'+inIndex"
                      :class="{'item-wall':item.outWall}"
                      :href="item.link" :title="item.desc">
                       <div class="left">
                           <img src="/img/refs/default.png" alt="">
                       </div>
                       <div class="right">
                           <div class="title meteor-text-upper">{{item.name}}</div>
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
            groupKey:{
                type:String,
                default:"cats"
            },
            linkData:{
                type:Array,
                default:()=>{
                    return [{cats:'a',group:[]}]
                }
            }
        }
    }
</script>

<style lang="less">
    @import "./link";
</style>