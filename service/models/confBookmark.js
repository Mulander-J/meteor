let mongoose = require('mongoose');
let Schema = mongoose.Schema;
/*  书签实体对象  */
module.exports = mongoose.model("confBookmark",new Schema({
    name:String,    //  名称
    desc:String,    //  简述
    link:String,    //  链接
    icon:String,    //  图标
    cats:String,    //  类目
    type:String,    //  类型
    remark:String,  //  备注
    digested:Number,    //  是否消化0-否/1-是
    timeStamp:{type:Date,default:Date.now()}   //  创建日期
}),"conf_bookmark");