import axiosMan from './axiosMan'

const parseUrl = '/api/confBlog';

export default {
    delete:(ids)=>{
        return axiosMan.get(`${parseUrl}/delete?ids=${ids||''}`)
    },
    read:(_id,counter='')=>{
        return axiosMan.get(`${parseUrl}/read?_id=${_id}&counter=${counter}`)
    },
    write:(parameters)=>{
        return axiosMan.post(`${parseUrl}/write`,parameters)
    },
    page:(parameters)=>{
        return axiosMan.post(`${parseUrl}/page`,parameters)
    },
    save:(parameters)=>{
        return axiosMan.post(`${parseUrl}/save`,parameters)
    },
};