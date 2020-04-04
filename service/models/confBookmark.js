let mongoose = require('mongoose');
/*  书签实体对象  */
module.exports = mongoose.model("confBookmark",new mongoose.Schema({
    name:{type:String,required:true},    //  名称
    link:{type:String,required:true},    //  链接
    desc:String,    //  简述
    icon:String,    //  图标
    cats:String,    //  类目
    type:String,    //  类型
    remark:String,  //  备注
    digested:{type:Number,default:0},    //  是否消化0-否/1-是
    outWall:{type:Number,default:0},    //  是否翻墙0-否/1-是
},{
    timestamps: {
        createdAt: '_created',
        updatedAt: '_updated'
    }
}),"conf_bookmark");