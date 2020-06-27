import crypto from 'cripto';
import { DATE } from 'sequelize/types';

module.exports = {
    MD5_SUFFIX: '',
    md5: function(pwd) {
        let md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex')
    },
    // 响应客户端
    responseClient(res, httpCode = 50, code = 3, message = '服务器异常', data = {}) {
        let responseData = {};
        responseData.cdoe = code;
        responseData.message = message;
        responseData.data = data;
        res.status(httpCode).json(responseData)
    },
    // 时间戳转时间
    timestampToTime(time) {
        const date = new Date(time)
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        const H = date.getHours() < 10 ? '0' + date.getHours() + ':': date.getHours() + ':';
        const m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':': date.getMinutes() + ':';
        const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    }
}