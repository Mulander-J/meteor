var express = require('express');
var router = express.Router();
var validator = require('express-validator');

var encoder = require('../lib/encoder') ;
const secret='meteor_20200312';  //密钥


//  引入状态码/错误码
var codeDic = require('./../config/req_code');
//引入实体类
var confUser = require('./../models/confUser');

const defaultPattern = {
    name:"",
    mail:"",
    password:"",
    head:"",
    birth:"",   
    access:0,
    remark:""  
};

/**
 * @swagger
 * definitions:
 *   confUser:
 *     properties:
 *       name:
 *         type: string
 *       mail:
 *         type: string
 *       password:
 *         type: string
 *       head:
 *         type: string
 *       remark:
 *         type: string
 *       birth:
 *         type: String
 *       access:
 *         type: integer
 *       pageNo:
 *         type: integer
 *       pageSize:
 *         type: integer
 */

/**
 * @swagger
 * /api/confUser/list:
 *   post:
 *     tags:
 *       - confUser
 *     summary: 全量列表
 *     description: 用于获取全量列表-用户
 *     parameters:
 *       - name: confUser
 *         description: confUser object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confUser'
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.post('/list', async (req, res) => {
    try {
        let doc = await  confUser.find({}).sort({'access':-1,'_updated':-1,'name':-1});
        console.log(`# 请求|用户-列表|成功`);
        res.json({
            ...codeDic.SUCCESS_GLOBAL,
            total: doc.length,
            result: doc
        });
    }catch (err) {
        console.log(`# 请求|用户-列表|失败`);
        res.json({
            ...codeDic.ERROR_GLOBAL,
            msg:err.message,
            total:0,
            result:[]
        });
    }
});

/**
 * @swagger
 * /api/confUser/page:
 *   post:
 *     tags:
 *       - confUser
 *     summary: 分页列表
 *     description: 用于获取分页列表-用户
 *     parameters:
 *       - name: confUser
 *         description: confUser object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confUser'
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.post('/page', (req, res) => {
    const {pageNo = 1, pageSize = 10, confModel } = req.body;
    let _condition = {};
    //  多字段查询（^$精确查，''模糊查,i大小写）
    [
        {key:'name',regex:(v)=>eval(`/${v}/i`)},
        {key:'access',regex:(v)=>eval(`/^${v}$/i`)}
    ].forEach(filterItem=>{
        if(confModel[filterItem.key]){
            _condition[filterItem.key]=({'$regex':filterItem.regex(confModel[filterItem.key])})
        }
    });
    // 获取数据条数
    confUser.countDocuments(_condition, (err, count) => {
        //查询出结果返回
        confUser.find(_condition)
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .sort({'access':-1,'_updated':-1,'name':-1})
            .exec((err, doc) => {
                if (!err && doc) {
                    console.log(`# 请求|用户-分页列表|成功`);
                    res.json({
                        ...codeDic.SUCCESS_GLOBAL,
                        total:count,
                        result:doc
                    })
                }else {
                    console.log(`# 请求|用户-分页列表|失败`);
                    res.json({
                        ...codeDic.ERROR_GLOBAL,
                        msg:err.message,
                        total:0,
                        result:[]
                    })
                }
            })
    })
});

/**
 * @swagger
 * /api/confUser/save:
 *   post:
 *     tags:
 *       - confUser
 *     summary: 保存
 *     description: 保存（新建/修改）用户
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: confUser
 *         description: confUser object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confUser'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/save',
    [
        validator.check('name').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
        validator.check('password').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
        validator.check('mail').isEmail().withMessage('必须为邮箱格式'),
    ],
    async (req, res) => {
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|用户-保存|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let pattern = {};
                Object.keys(defaultPattern).forEach(key=>{
                    pattern[key] = req.body[key]||defaultPattern[key]
                });
                pattern.password = encoder.codeEnc(pattern.password,secret);
                let doc = null;
                //  重名校验
                let mark =  await confUser.findOne({name:{'$regex':eval(`/^${pattern.name}$/i`)}});
                if(req.body._id){    //  修改
                    if(mark&&req.body._id!==mark._id.toString()){
                        console.log(`# 请求|用户-修改|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await confUser.updateOne({_id:req.body._id},pattern);
                        console.log(`# 请求|用户-修改|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }else { //  新建
                    if(mark){
                        console.log(`# 请求|用户-新建|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await new confUser(pattern).save();
                        console.log(`# 请求|用户-新建|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }
            }
        }catch (err) {
            console.log(`# 请求|用户-保存|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            })
        }
    }
);

/**
 * @swagger
 * /api/confUser/delete:
 *   get:
 *     tags:
 *       - confUser
 *     summary: 删除
 *     description:  根据ids删除
 *     parameters:
 *       - name: ids
 *         in: query
 *         required: false
 *         description: 用户ids，复数逗号分隔
 *         type: string
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.get('/delete',
    [validator.check('ids').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空')],
    async (req, res) => {
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|用户-删除|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let ids = req.query.ids.split(",").filter(Boolean);
                let doc =  await confUser.deleteMany({ _id: { $in:ids } });
                console.log(`# 请求|用户-删除|成功`);
                res.json({
                    ...codeDic.SUCCESS_DELETE,
                    result:doc
                });
            }
        }catch (err) {
            console.log(`# 请求|用户-删除|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            })
        }
    }
);

/**
 * @swagger
 * /api/confUser/login:
 *   get:
 *     tags:
 *       - confUser
 *     summary: 删除
 *     description:  根据ids删除
 *     parameters:
 *       - name: name
 *         in: query
 *         required: true
 *         description: 用户名
 *         type: string
 *       - name: password
 *         in: query
 *         required: true
 *         description: 用户密码
 *         type: string
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.get('/login',
    [
        validator.check('name').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
        validator.check('password').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空')
    ],
    async (req, res) => {
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|用户-登录|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let {name='',password=''} = req.query;
                password = encoder.codeEnc(password,secret);
                let doc =  await confUser.find({ name: name,password:password });
                console.log(`# 请求|用户-登录|成功`);
                res.json({
                    ...codeDic.SUCCESS_DELETE,
                    result:doc
                });
            }
        }catch (err) {
            console.log(`# 请求|用户-登录|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            })
        }
    }
);

module.exports = router;