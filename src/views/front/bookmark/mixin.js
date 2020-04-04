import LinkRow from '@/components/linkRow/LinkRow'
export default {
    components:{LinkRow},
    data(){
        return{
            list_data:[],
            type:'Daily'
        }
    },
    mounted(){
        this._getBookmarkList();
    },
    methods:{
        _getBookmarkList(){
            let THAT = this;
            this.$api.bookmark.list({type:this.type}).then(res=>{
                let {success,result,msg} = res.data;
                if(success){
                    THAT.list_data = THAT.$util._groupByKey(result,'cats');
                }else {
                    THAT.list_data = [];
                    console.log(msg||"系统异常");
                }
            }).catch(err=>{
                THAT.list_data = [];
                console.log(err||"系统异常");
            })
        }
    }
}