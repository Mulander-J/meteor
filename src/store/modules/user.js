
export default {
    namespaced: true,
    state: {

    },
    getters:{
        userInfo:()=>{return localStorage.getItem('meteor_user')||null},
    },
    mutations: {},
    actions: {}
}