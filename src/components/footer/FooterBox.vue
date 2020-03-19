<template>
    <!--    页脚  -->
    <footer class="meteor-footer-wrapper">
        <!--    项目信息    -->
        <div>
            <!--    标颜&版本    -->
            <h2>
                <span>Meteor</span>
                <span>v0.0.1</span>
            </h2>
            <!--    项目描述    -->
            <h3>Free Blog</h3>
            <h3>Focus on Doc</h3>
            <h3>Foolish Design</h3>
        </div>
        <!--    时间/位置/天气    -->
        <div>
            <p>Universe/Earth</p>
            <p>2020/03/19</p>
            <p>Sunny</p>
        </div>
        <!--    作者&捐献   -->
        <div>
           <p>mulander_j@outlook.com</p>
            <div>Donate</div>
        </div>
        <!--    版权协议    -->
        <p>copyRight</p>
    </footer>
</template>

<script>
    import nb from '@/lib/plugin/nb'
    export default {
        name: "FooterBox",
        created(){
            console.log(`#meteor_welcome|${nb('welcome to meteor')}`)
        },
    }
</script>

<style scoped lang="less">
    @import "./footerBox";
</style>