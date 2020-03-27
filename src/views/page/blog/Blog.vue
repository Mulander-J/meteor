<template>
    <div class="meteor-Blog-wrapper">
        <div>

        </div>
        <div>
            <TimeLine :data="list"/>
        </div>
    </div>
</template>

<script>
    import TimeLine from '@/components/timeLine/TimeLine.vue'
    export default {
        name: "Blog",
        components:{TimeLine},
        data(){
            return {
                list:[
                    {
                        "id":"WE8904DD7879DD",
                        "title": "blogA",
                        "url": "./../../blogA",
                        "tag": ["a","b"],
                        "category": ["c","d"],
                        "last_update": "2020-03",
                        "author":"Mulander",
                        "link":"null",
                        "writter":"Mulander",
                        "createDate":"2020/3/22 16:41"
                    },
                    {
                        "id":"WE8904DD7879DD",
                        "title": "blogA",
                        "url": "./../../blogA",
                        "tag": ["a","b"],
                        "category": ["c","d"],
                        "last_update": "2020-03",
                        "author":"Mulander",
                        "link":"null",
                        "writter":"Mulander",
                        "createDate":"2020/3/22 16:41"
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .meteor-Blog-wrapper{
        padding: 2rem;
    }
</style>