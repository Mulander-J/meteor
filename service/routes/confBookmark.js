var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /api/confBookMark/list:
 *   get:
 *     tags:
 *       - confBookMark
 *     summary: 全量列表
 *     description: 用于获取全量列表-书签
 *     responses:
 *       200:
 *         description: 【成功】 返回 [confBookMark]
 */
router.get('/list', (req, res) => {
    res.send('world')
})
/**
 * @swagger
 * /api/confBookMark/page:
 *   post:
 *     tags:
 *       - confBookMark
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