<template>
    <!--    开始页 -->
    <div class="meteor-start-wrapper">
        <!--    云层  -->
        <div class="layer layer-cloud">
            <div>cloud</div>
        </div>
        <!--    艾恩格朗特主城 -->
        <div class="layer layer-main meteor-flex-center">
            <div class="tower"></div>
        </div>
        <!--    文字链接    -->
        <div class="layer layer-txt meteor-flex-center">
            <div class="txt-box" :class="{'txt-mask':link_hover}">
                <span class="link-start"
                      @click="handleLink"
                      @mouseleave="link_hover=false"
                      @mouseenter="link_hover=true">{{link_label}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    export default {
        name: "Start",
        computed:{
            ...mapGetters({
                cur:'time/currentTime'
            })
        },
        data () {
            return {
                link_label:'link start',
                link_hover:false
            }
        },
        mounted () {
            // setInterval(this.getCurrentTime,500)
        },
        methods:{
            ...mapMutations({
                'getCurrentTime':'time/_getCurrentTime'
            }),
            handleLink(){
                console.log("handleLink");
                alert('handleLink')
            }
        }
    }
</script>

<style scoped lang="less">
@import "./start";
</style>