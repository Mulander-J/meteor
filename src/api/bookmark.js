import axiosMan from './axiosMan'

const parseUrl = '/api/confBookmark';

export default {
    list:()=>{
        return axiosMan.get(`${parseUrl}/list`)
    },
    save:(parameters)=>{
        return axiosMan.post(`${parseUrl}/save`,parameters)
    },
    delete:(ids)=>{
        return axiosMan.get(`${parseUrl}/delete?ids=${ids||''}`)
    }
};