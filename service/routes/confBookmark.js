var mongoose = require("mongoose");
var express = require('express');
var router = express.Router();
var validator = require('express-validator');
var checkData = require('./../middlewares/checkData');
//  引入状态码/错误码
var codeDic = require('./../config/req_code');
//引入实体类
var confBookmark = require('./../models/confBookmark');

const defaultPattern = {
    name:"",
    desc:"不可描述",
    link:"",
    icon:"default",
    cats:"unclassified",
    type:"Digest",
    remark:"",
    digested:0,
    outWall:0
};

/**
 * @swagger
 * definitions:
 *   ConfBookmark:
 *     properties:
 *       name:
 *         type: string
 *       desc:
 *         type: string
 *       link:
 *         type: string
 *       icon:
 *         type: string
 *       cats:
 *         type: string
 *       type:
 *         type: string
 *       remark:
 *         type: string
 *       digested:
 *         type: integer
 *       outWall:
 *         type: integer
 */

/**
 * @swagger
 * /api/confBookMark/list:
 *   post:
 *     tags:
 *       - confBookMark
 *     summary: 全量列表
 *     description: 用于获取全量列表-书签
 *     parameters:
 *       - name: Bookmark
 *         description: ConfBookmark object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ConfBookmark'
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.post('/list', async (req, res) => {
    try {
        let parameters = req.body;
        let doc = await  confBookmark.find(parameters).sort('cats');
        console.log(`# 请求|书签-列表|成功`);
        res.json({
            ...codeDic.SUCCESS_GLOBAL,
            total: doc.length,
            result: doc
        });
    }catch (err) {
        console.log(`# 请求|书签-列表|失败`);
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
 * /api/confBookMark/save:
 *   post:
 *     tags:
 *       - confBookMark
 *     description: 保存（新建/修改）-书签
 *     summary: 保存
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Bookmark
 *         description: ConfBookmark object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ConfBookmark'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/save',
    [
        validator.check('name').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
        validator.check('link').isURL().withMessage('link必须是地址格式'),
        validator.check('cats').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
        validator.check('type').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
        validator.check('digested').isInt({min:0,max:1}).withMessage('必须为0/1'),
        validator.check('outWall').isInt({min:0,max:1}).withMessage('必须为0/1'),
    ],
    async (req, res) => {
        try {
            let  preVal =  checkData.valCheck(req,codeDic,validator);
            if(preVal){
                console.log(`# 请求|书签-保存|异常参数`);
                res.json(preVal);
            }else {
                let pattern = {
                    ...defaultPattern,
                    ...req.body
                };
                let doc = null;
                let mark =  await confBookmark.findOne({name:pattern.name});
                if(pattern._id){    //  修改
                    if(mark&&pattern._id!==mongoose.Types.ObjectId(mark._id).toString()){
                        console.log(`# 请求|书签-修改|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await confBookmark.updateOne(pattern);
                        console.log(`# 请求|书签-修改|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }else { //  新建
                    if(mark){
                        console.log(`# 请求|书签-新建|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await new confBookmark(pattern).save();
                        console.log(`# 请求|书签-新建|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }
            }
        }catch (err) {
            console.log(`# 请求|书签-保存|失败`);
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
 * /api/confBookMark/delete:
 *   get:
 *     tags:
 *       - confBookMark
 *     summary: 删除
 *     description:  根据ids删除
 *     parameters:
 *       - name: ids
 *         in: query
 *         required: false
 *         description: 书签ids，复数逗号分隔
 *         type: string
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.get('/delete',
    [validator.check('ids').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空')],
    async (req, res) => {
        try {
            let  preVal =  checkData.valCheck(req,codeDic,validator);
            if(preVal) {
                console.log(`# 请求|书签-删除|异常参数`);
                res.json(preVal);
            }else {
                let ids = req.query.ids.split(",").filter(Boolean);
                let doc =  await confBookmark.deleteMany({ _id: { $in:ids } });
                console.log(`# 请求|书签-删除|成功`);
                res.json({
                    ...codeDic.SUCCESS_DELETE,
                    result:doc
                });
            }
        }catch (err) {
            console.log(`# 请求|书签-删除|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            })
        }
    }
);


module.exports = router;