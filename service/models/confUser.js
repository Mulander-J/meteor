let mongoose = require('mongoose');
/*  书签实体对象  */
module.exports = mongoose.model("confUser",new mongoose.Schema({
    name:{type:String,required:true},    //  名称
    mail:String,  //  邮箱
    password:{type:String,required:true},    //  密码
    access:Number,    //  权限
    remark:String,  //  备注
    head:String,    //  头像
    birth:String,    //  生辰
},{
    timestamps: {
        createdAt: '_created',
        updatedAt: '_updated'
    }
}),"conf_user");