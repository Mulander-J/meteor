import * as type from './../type'
export default {
    namespaced: true,
    state: {

    },
    getters:{
        userInfo:()=>{return sessionStorage.getItem('meteor_user')||null},
    },
    mutations: {
        [type.USER_LOGOUT](){
            sessionStorage.removeItem('meteor_user');
        }
    },
    actions: {}
}