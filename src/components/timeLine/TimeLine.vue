<template>
    <ul class="meteor-timeLine-wrapper">
        <li v-for="(item,no) in data" :key="'dot_'+no"
            class="timeLine-item-row" :data-date="item.createDate">
            <div class="timeLine-itemBox">
                <h2 class="blog-title" @click="$emit('on-blog',item)">#{{item.title}}</h2>
                <h3 class="blog-subTitle">Author:{{item.author}} , LastUpdate:{{item.last_update}}</h3>
                <div class="blog-menu meteor-flex-between">
                    <div class="blog-menu-tags">
                        <div v-for="(tag,tagNo) in item.tag" :key="`line_${no}_tag_${tagNo}`" class="meteor-tag meteor-tag-magenta">
                            <span class="meteor-tag-text">{{tag}}</span>
                        </div>
                    </div>
                    <div class="blog-menu-actions">
                        <button class="meteor-button" @click="$emit('on-favor',item)">favor</button>
                        <button class="meteor-button" @click="$emit('on-photo',item)">photo</button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "TimeLine",
        props:['data']
    }
</script>

<style scoped lang="less">
@import "./line.less";
</style>