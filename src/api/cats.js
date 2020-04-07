import axiosMan from './axiosMan'

const parseUrl = '/api/confCats';

export default {
    delete:(ids)=>{
        return axiosMan.get(`${parseUrl}/delete?ids=${ids||''}`)
    },
    list:(parameters)=>{
        return axiosMan.post(`${parseUrl}/list`,parameters)
    },
    page:(parameters)=>{
        return axiosMan.post(`${parseUrl}/page`,parameters)
    },
    save:(parameters)=>{
        return axiosMan.post(`${parseUrl}/save`,parameters)
    },
};