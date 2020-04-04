<template>
    <div>
        <h1>Admin</h1>
        <div style="padding: 2rem">
            <router-link :to="{name:'Home'}">home</router-link>
        </div>
        <div>
            <button @click="addBookmark2">addBookmark2</button>
            <button @click="deleteBook">deleteBook</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        methods:{
            addBookmark2(){
                this.$api.bookmark.save({
                    name:"node内存溢出解决方案",
                    desc:"不可描述",
                    link:"https://segmentfault.com/a/1190000018557398",
                    icon:"default.jpg",
                    cats:"unclassified",
                    type:"Digest",
                    outWall:0,
                    digested:0
                }).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            },
            deleteBook(){
                this.$api.bookmark.delete('1')
                    .then(res=>{
                    console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    })
            }
        }
    }
</script>

<style scoped>

</style>