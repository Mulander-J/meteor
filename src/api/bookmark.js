import axiosMan from './axiosMan'

const parseUrl = '/api/confBookmark';

export default {
    list:(parameters)=>{
        return axiosMan.post(`${parseUrl}/list`,parameters)
    },
    page:(parameters)=>{
        return axiosMan.get(`${parseUrl}/page`,parameters)
    },
    save:(parameters)=>{
        return axiosMan.post(`${parseUrl}/save`,parameters)
    },
    delete:(ids)=>{
        return axiosMan.get(`${parseUrl}/delete?ids=${ids||''}`)
    }
};