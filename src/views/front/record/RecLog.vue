<template>
    <section class="meteor-recLog-wrapper">
        <div class="recLog-body">
            <h1>Log</h1>
            <blockquote>开发日志</blockquote>
            <div class="recLog-verBlock" v-for="(ver,verNo) in log" :key="'ver_'+verNo">
                <el-divider content-position="left">{{ver.version}}</el-divider>
                <p>{{ver.duration}}</p><br/>
                <el-timeline class="recLog-timeLine">
                    <el-timeline-item v-for="(item,no) in ver.logs" :key="'log_'+no"
                                      placement="top" :timestamp="item.day" type="success">
                        <p v-for="(day_do,dayNo) in item.daily" :key="dayNo">{{(dayNo+1)+'.'+day_do}}</p>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "RecLog",
        mounted(){
            let THAT = this;
            this.$api.record.log().then(res=>{
                let {success,result} = res.data;
                if(success){
                    let _data = result.data;
                    _data.sort(THAT.$util._sortByKey('sort'));
                    _data.reverse();
                    THAT.log = _data;
                }else {
                    THAT.log = []
                }
            }).catch(err=>{
                console.log(err);
                THAT.log = []
            })
        },
        data(){
            return {
                log:[]
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-recLog-wrapper{
        position: relative;
        z-index: 20;
        .recLog-body{
            width: 60%;
            margin: 0 auto;
            padding-bottom: 2rem;
            .recLog-verBlock{
                .recLog-timeLine{
                    padding: 1rem;
                    border-radius: 8px;
                    background: linear-gradient(to right, #fff ,transparent, #73c5a2);
                }
            }
        }
    }
</style>