var express = require('express');
var router = express.Router();
/**
 * @swagger
 * /api/confUser/list:
 *   get:
 *     tags:
 *       - confUser
 *     summary: 全量列表
 *     description: 用于获取全量列表-标签
 *     responses:
 *       200:
 *         description: 【成功】 返回 [confUser]
 */
router.get('/list', (req, res) => {
    res.send('world')
})
/**
 * @swagger
 * /api/confUser/page:
 *   post:
 *     tags:
 *       - confUser
 *     summary: 分页列表
 *     description: 用于获取分页列表-标签
 *     parameters:
 *       - name: pageSize
 *         in: query
 *         required: true
 *         description: 页数
 *         type: string
 *       - name: pageNo
 *         in: query
 *         required: true
 *         description: 页码
 *         type: string
 *     responses:
 *       200:
 *         description: 【成功】 返回 [confTag]
 */
router.post('/page', (req, res) => {
    res.send('Hello World!/page')
})
module.exports = router;