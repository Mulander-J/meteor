
export default {
    namespaced: true,
    state: {

    },
    getters:{
        userInfo:()=>{return localStorage.getItem('meteor_user')||null},
        visitorInfo:()=>{return localStorage.getItem('meteor_visitor')||null},
    },
    mutations: {},
    actions: {}
}