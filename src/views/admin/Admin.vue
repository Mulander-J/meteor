<template>
    <div class="meteor-flex-center">
        <h1>Admin</h1>
        <router-link :to="{name:'Home'}">home</router-link>
        <div>
            <button @click="addBookmark">addBookmark</button>
            <button @click="addBookmark2">addBookmark2</button>
            <button @click="deleteBook">deleteBook</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        methods:{
            addBookmark(){
                this.$api.bookmark.save({
                    name:"markA010",
                    desc:"不可描述",
                    link:"https://das.dsa.com",
                    icon:"default.jpg",
                    cats:"api",
                    type:"daily",
                    digested:0
                }).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            },
            addBookmark2(){
                this.$api.bookmark.save({
                    _id:'5e874d64e8b1f91e60f45c45',
                    _v:0,
                    name:"markA6",
                    desc:"7498379427847",
                    link:"https://das.ds3434a.com",
                    icon:"default.jpg",
                    cats:"api",
                    type:"daily",
                    digested:0
                }).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })
            },
            deleteBook(){
                // this.$api.bookmark.delete('5e873e794c605029c414c608,5e87409e20e4c417488c2e76')
                this.$api.bookmark.delete('5e874d7ce8b1f91e60f45c46')
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