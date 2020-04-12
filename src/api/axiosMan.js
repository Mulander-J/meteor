import axios from 'axios'
// api的base_url
const baseUrl='//127.0.0.1:9587';
// 请求超时时间
const MaxTimeOut=5*60*1000;
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = MaxTimeOut;
// 创建axios实例
const axiosMan = axios.create({
    baseURL: baseUrl,
    timeout: MaxTimeOut
});
export default axiosMan