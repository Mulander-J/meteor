//  加密解密模块
var crypto = require('crypto');  //加载crypto库

module.exports={
    /**
     * @description 加密
     * @param str
     * @param secret
     * @returns {string}
     */
    codeEnc:(str,secret)=>{
        let cipher = crypto.createCipher('aes192', secret);
        let enc = cipher.update(str, 'utf8', 'hex');//编码方式从utf-8转为hex;
        enc += cipher.final('hex');//编码方式从转为hex;
        return enc
    },
    /**
     * @description 解密
     * @param enc_str
     * @param secret
     * @returns {string}
     */
    codeDec:(enc_str,secret)=>{
        var decipher = crypto.createDecipher('aes192', secret);
        var dec = decipher.update(enc_str, 'hex', 'utf8');//编码方式从hex转为utf-8;
        dec += decipher.final('utf8');//编码方式从utf-8;
        return dec
    }
};