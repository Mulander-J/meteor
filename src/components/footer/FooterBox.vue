<template>
   <div class="meteor-footer">
       <!--  页脚触发器 -->
       <div class="meteor-footer-trigger" @click="trigger=!trigger">
            <span class="trigger-icon" :class="{'meteor-footer-triggerOff':trigger}"></span>
       </div>
       <!--    页脚内容  -->
       <footer class="meteor-footer-wrapper" :class="{'meteor-footer-out':!trigger}">
           <div></div>
           <div class="meteor-footer-content">
               <!--    项目信息    -->
               <div class="meteor-footer-item meteor-footer-project">
                   <!--    标颜&版本    -->
                   <h2 class="project-title">
                       <a :href="$conf.repository" :data-title="`${$conf.name}_v${$conf.version}`" target="_blank">{{$conf.name}}_v{{$conf.version}}</a>
                   </h2>
                   <!--    项目描述    -->
                   <h3 class="project-desc" v-for="(desc,descNo) in $conf.description" :key="'desc_'+descNo">{{desc}}</h3>
               </div>
               <!--    作者&捐献   -->
               <div class="meteor-footer-item meteor-author meteor-flex-center">
                   <div class="author-item author-self">
                       <p class="self-linkRow meteor-flex-center">
                           <a v-for="(val,key,no) in $conf.contact" :key="'link_'+no" :href="val.link" target="_blank" class="self-link">
                               <img :src="val.img" :title="key" :alt="key">
                           </a>
                       </p>
                   </div>
                   <div class="author-item author-donate" title="Donate if love"></div>
               </div>
           </div>
           <!--    版权协议    -->
           <p class="meteor-footer-copyRight">{{$conf.license}} Licensed | Copyright © {{$conf.createDate}}-present {{$conf.secName}}</p>
       </footer>
       <!-- 页脚蒙版  -->
       <div class="meteor-footer-mask" v-show="trigger" @click="trigger=!trigger"></div>
   </div>
</template>

<script>
    export default {
        name: "FooterBox",
        data(){
            return {
                trigger:false
            }
        }
    }
</script>

<style scoped lang="less">
    @import "./footerBox";
</style>