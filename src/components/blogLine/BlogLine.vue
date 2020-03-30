<template>
    <el-timeline>
        <el-timeline-item v-for="(item,no) in data" :key="'dot_'+no" :timestamp="item.createDate" type="success">
            <el-card>
                <h2 class="meteor-cursor-point" @click="$emit('on-blog',item)">
                    <a :href="'#'+item.title" aria-hidden="true" class="meteor-blog-anchor">#</a>
                    {{item.title}}
                </h2>
                <h3 class="meteor-margin-top1">Author:{{item.author}} , LastUpdate:{{item.last_update}}</h3>
                <div class="meteor-flex-between meteor-margin-top1">
                    <div>
                        <ElTag class="meteor-margin-hor1" v-for="(tag,tagNo) in item.tag" :key="`line_${no}_tag_${tagNo}`">{{tag}}</ElTag>
                    </div>
                    <div>
                        <el-button  @click="$emit('on-favor',item)"  icon="el-icon-star-on" circle></el-button>
                        <el-button  @click="$emit('on-photo',item)"  icon="el-icon-camera" circle></el-button>
                    </div>
                </div>
            </el-card>
        </el-timeline-item>
    </el-timeline>
</template>

<script>
    export default {
        name: "BlogLine",
        props:['data']
    }
</script>

<style scoped>
</style>