import * as type from './../type'
export default {
    namespaced: true,
    state: {
        currentTime:''
    },
    getters:{
        currentTime : (state) => state.currentTime
    },
    mutations: {
        [type.TIME_GET_CURRENT](state){
            state.currentTime = new Date().toString()
        }
    },
    actions: {
    },
}