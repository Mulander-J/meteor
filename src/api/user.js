import axiosMan from './axiosMan'

const parseUrl = '/api/confUser';

export default {
    login:(parameters)=>{
        return axiosMan.get(`${parseUrl}/login?name=${parameters.name||''}&password=${parameters.password||''}`)
    },
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
    }
};