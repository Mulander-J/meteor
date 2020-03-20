<template>
    <!--    开始页 -->
    <div class="meteor-start-wrapper">
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
                <span class="link-start"
                      @click="handleLink">start</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {skyCircle} from '@/lib/plugin/canvas'
    export default {
        name: "Start",
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
            initDayNight(){
                if(!this.day_night){    //  黑夜
                    this.$nextTick(()=>{
                        skyCircle('#starSky',true)
                    })
                }
            },
            handleLink(){
                this.$router.push({name:'Home',query: {id:'1'}})
            }
        }
    }
</script>

<style scoped lang="less">
@import "./start";
</style>