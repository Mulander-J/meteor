let mongoose = require('mongoose');
/*  书签实体对象  */
module.exports = mongoose.model("confBlog",new mongoose.Schema({
    name:{type:String,required:true},    //  名称
    fileName:String,    //  文件名
    tags:[String],  //  标签名集合
    cats: { type: mongoose.Schema.Types.ObjectId, ref: 'confCats' },  //  类目Id
    content:String, //  文章内容
    writer:String,  //  撰写者
    author:String,  //  作者
    reLink:String,  //  转载地址
    isShow:Number,  //  是否显示
    isOriginal:Number,  //  是否原创
    visitNo:Number,  //  浏览数
    thumb:[{ type: mongoose.Schema.Types.ObjectId, ref: 'confUser' }],  //  点赞集合
    remark:String,  //  备注
},{
    timestamps: {
        createdAt: '_created',
        updatedAt: '_updated'
    }
}),"conf_blog");