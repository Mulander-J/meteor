var express = require('express');
var router = express.Router();
var validator = require('express-validator');

//  引入状态码/错误码
var codeDic = require('./../config/req_code');
//引入实体类
var confBlog = require('./../models/confBlog');
//  默认参数
const defaultPattern = {
    name:"",
    fileName:"",
    tags:[],
    cats:"",
    content:"",
    writer:"Mulander",
    author:"Mr.UnKnown",
    reLink:"",
    isOriginal:0,
    isShow:0,
    visitNo:0,
    thumb:[],
    remark:""
};
//  文件读写
var fs = require('fs');
var path = require('path');
const backUpPath = path.join(__dirname,'./../../doc');

/**
 * @swagger
 * definitions:
 *   confBlog:
 *     properties:
 *       name:
 *         type: string
 *       tags:
 *         type: Array
 *       cats:
 *         type: string
 *       content:
 *         type: string
 *       writer:
 *         type: string
 *       author:
 *         type: string
 *       reLink:
 *         type: string
 *       isShow:
 *         type: integer
 *       isOriginal:
 *         type: integer
 *       visitNo:
 *         type: integer
 *       thumb:
 *         type: Array
 *       remark:
 *         type: String
 *       pageSize:
 *         type: integer
 *       pageNo:
 *         type: integer
 */

/**
 * @swagger
 * /api/confBlog/read:
 *   post:
 *     tags:
 *       - confBlog
 *     summary: 细读
 *     description: 指定id读博客内容
 *     parameters:
 *       - name: _id
 *         description: _id
 *         in: query
 *         required: true
 *       - name: counter
 *         description: 是否阅读计数
 *         in: query
 *         required: true
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.get('/read', [validator.check('_id').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空')],
    async (req, res) => {
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|博客-读取|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let doc = await  confBlog.find({_id:req.query._id})
                    .populate('cats thumb','name _id');
                console.log(`# 请求|博客-读取|成功`);
                if(!!req.query.counter){
                    let doc_sub = await confBlog.updateOne({_id:req.query._id},{visitNo:++doc[0].visitNo});
                    console.log(doc_sub);
                    console.log(`# 请求|博客-阅读|成功`);
                }
                res.json({
                    ...codeDic.SUCCESS_GLOBAL,
                    result: doc
                });
            }
        }catch (err) {
            console.log(`# 请求|博客-读取|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:[]
            });
        }
    }
);

/**
 * @swagger
 * /api/confBlog/write:
 *   post:
 *     tags:
 *       - confBlog
 *     summary: 全量列表
 *     description: 用于获取全量列表-博客
 *     parameters:
 *       - name: confBlog
 *         description: confBlog object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confBlog'
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.post('/write',  (req, res) => {
    confBlog.findOneAndUpdate(
        {_id:req.body._id},
        {content:req.body.content},
        {new:true,useFindAndModify:false}
    ).then((doc,err)=>{
        if(err||!doc){
            console.log(`# 请求|博客-写入|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            });
        }else {
            let fileName = doc.fileName||(new Date().toJSON().split('T')[0].replace(/-/g,'')+'_'+doc._id);
            let headJson = `;;;\n${JSON.stringify(doc,[
                'name','fileName','tags','cats',
                'writer','author','reLink',
                'remark'
            ],'\t')}\n;;;\n\n\n`;
            fs.writeFile(`${backUpPath}\/${fileName}.md`, headJson+req.body.content, (err2)=>{
                if(err2){
                    res.json({
                        ...codeDic.SAVE_EXCEPT_BACKUP,
                        result: doc
                    });
                }else {
                    res.json({
                        ...codeDic.SUCCESS_SAVE,
                        result: doc
                    });
                }
            })
        }
    });
});

/**
 * @swagger
 * /api/confBlog/page:
 *   post:
 *     tags:
 *       - confBlog
 *     summary: 分页列表
 *     description: 用于获取分页列表-博客
 *     parameters:
 *       - name: confBlog
 *         description: confBlog object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confBlog'
 *     responses:
 *       200:
 *         description: 【成功】
 */
router.post('/page', (req, res) => {
    const {pageNo = 1, pageSize = 10, confModel={} } = req.body;
    let _condition = {};
    //  多字段查询（^$精确查，''模糊查,i大小写）
    [
        {key:'name', query:(v)=>{return {'$regex':eval(`/${v}/i`)}}},
        {key:'cats', query:(v)=>{return {'_id':v}}},
        {key:'tags', query:(v)=>{return {'$in':v}}},
    ].forEach(filterItem=>{
        if(confModel[filterItem.key]){
            if(filterItem.key!=='tags'||confModel['tags'].length>0){
                _condition[filterItem.key]=filterItem.query(confModel[filterItem.key])
            }
        }
    });
    if(Object.keys(confModel).indexOf('isShow')>-1)_condition.isShow = confModel.isShow;
    let _selector = confModel['showContent']?{}:{"content": 0 };
        // 获取数据条数
    confBlog.countDocuments(_condition, (err, count) => {
        //查询出结果返回
        confBlog.find(_condition,_selector)
            .populate('cats thumb','name _id')
            .sort({'_created':-1,'_updated':-1,'name':-1})
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .exec((err, doc) => {
                if (!err && doc) {
                    console.log(`# 请求|博客-分页列表|成功`);
                    res.json({
                        ...codeDic.SUCCESS_GLOBAL,
                        total:count,
                        result:doc
                    })
                }else {
                    console.log(`# 请求|博客-分页列表|失败`);
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
 * /api/confBlog/save:
 *   post:
 *     tags:
 *       - confBlog
 *     summary: 保存
 *     description: 保存（新建/修改）博客
 *     consumes:
 *      - application/json
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: confBlog
 *         description: confBlog object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/confBlog'
 *     responses:
 *       200:
 *         description: 成功
 */
router.post('/save',
    [
        validator.check('name').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
        validator.check('cats._id').exists({checkFalsy:true,checkNull:true}).withMessage('不能为空'),
    ],
    async (req, res) => {
        try {
            let errors = validator.validationResult(req);
            if(!errors.isEmpty()) {
                console.log(`# 请求|博客-保存|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let pattern = {};
                Object.keys(defaultPattern).forEach(key=>{
                    pattern[key] = req.body[key]||defaultPattern[key]
                });
                if(pattern.isOriginal){
                   pattern.author = pattern.writer;
                   pattern.reLink = "";
                }
                let doc = null;
                delete pattern.content;
                //  重名校验
                let mark =  await confBlog.findOne({name:{'$regex':eval(`/^${pattern.name}$/i`)}});
                if(req.body._id){    //  修改
                    if(mark&&req.body._id!==mark._id.toString()){
                        console.log(`# 请求|博客-修改|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        doc = await confBlog.updateOne({_id:req.body._id},pattern);
                        console.log(`# 请求|博客-修改|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }else { //  新建
                    if(mark){
                        console.log(`# 请求|博客-新建|重名-${pattern.name}`);
                        res.json({
                            ...codeDic.ERROR_UNIQUE,
                            msg:'名称已存在，请修改',
                            result:mark
                        });
                    }else {
                        let dateStamp = new Date().toJSON().split('T')[0].replace(/-/g,'')+'_';
                        pattern.fileName = dateStamp+pattern._id;
                        doc = await new confBlog(pattern).save();
                        console.log(`# 请求|博客-新建|成功-${pattern.name}`);
                        res.json({
                            ...codeDic.SUCCESS_SAVE,
                            result:doc
                        });
                    }
                }
            }
        }catch (err) {
            console.log(`# 请求|博客-保存|失败`);
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
 * /api/confBlog/delete:
 *   get:
 *     tags:
 *       - confBlog
 *     summary: 删除
 *     description:  根据ids删除
 *     parameters:
 *       - name: ids
 *         in: query
 *         required: false
 *         description: 博客ids，复数逗号分隔
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
                console.log(`# 请求|博客-删除|异常参数`);
                res.json({
                    ...codeDic.ERROR_MISS,
                    errors: errors.mapped()
                }) ;
            }else {
                let ids = req.query.ids.split(",").filter(Boolean);
                let doc =  await confBlog.deleteMany({ _id: { $in:ids } });
                console.log(`# 请求|博客-删除|成功`);
                res.json({
                    ...codeDic.SUCCESS_DELETE,
                    result:doc
                });
            }
        }catch (err) {
            console.log(`# 请求|博客-删除|失败`);
            res.json({
                ...codeDic.ERROR_GLOBAL,
                msg:err.message,
                result:null
            })
        }
    }
);

module.exports = router;