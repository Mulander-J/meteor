import axiosMan from './axiosMan'

const parseUrl = '/api/confRecord';

export default {
    log:()=>{
        return axiosMan.get(`${parseUrl}/log`)
    }
};