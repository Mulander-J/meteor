<template>
    <div class="meteor-dropdown-wrapper"
         @mouseleave="isShow=false"
         @mouseenter="isShow=true">
        <a class="dropdown-title">
            <span class="title">{{title}}</span>
            <span class="arrow right"></span>
        </a>
        <ul class="nav-dropdown" v-show="isShow">
            <li v-for="(item,no) in list" :key="no">
                <router-link :to="item">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "DropDown",
        props:["title","list"],
        data(){
            return {
                isShow:false
            }
        }
    }
</script>

<style scoped lang="less">
    .meteor-dropdown-wrapper{
        height: 1.8rem;
        cursor: pointer;
        .dropdown-title{
            display: block;
            span{
                display: inline-block;
            }
            .arrow{
                width: 0;
                height: 0;

                border-left: 4px solid transparent;
                border-right: 4px solid transparent;
                border-top: 6px solid #ccc;
                border-bottom: 0;

                vertical-align: middle;
                margin-top: -1px;
                margin-left: .4rem;
            }
        }
        .nav-dropdown{
            height: auto!important;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            max-height: calc(100vh - 2.7rem);
            overflow-y: auto;
            position: absolute;
            top: 100%;
            right: 0;
            background-color: #fff;
            padding: .6rem 0;
            border: 1px solid #ddd;
            border-bottom-color: #ccc;
            text-align: left;
            border-radius: .25rem;
            white-space: nowrap;
            margin: 0;
            a{
                display: block;
                line-height: 1.7rem;
                position: relative;
                border-bottom: none;
                font-weight: 400;
                margin-bottom: 0;
                padding: 0 1.5rem 0 1.25rem;
                &:hover{
                    text-decoration: underline;
                }
            }
        }
    }
</style>