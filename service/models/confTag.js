let mongoose = require('mongoose');
/*  书签实体对象  */
module.exports = mongoose.model("confTag",new mongoose.Schema({
    name:{type:String,required:true},    //  名称
    color:String,  //  颜色
    isTop:String,    //  是否置顶0-否/1-是
    remark:String  //  备注
},{
    timestamps: {
        createdAt: '_created',
        updatedAt: '_updated'
    }
}),"conf_tag");