import * as type from './../type'
import {computeSunRiseSunSet} from "@/lib/plugin/sunCalc";

const def_location = {
    address:'Earth',
    longitude:0,
    latitude:0,
    UTC_explain:'Universe/Earth',
    UTC_num:8
};

export default {
    namespaced: true,
    state: {
        //  当前时间-主动更新
        currentTime:null,
        //  缓存日期-伴随更新（判断是否需要更新日出日落时间）
        localDate:null,
        //  日出日落
        sunRise:'',
        sunSet:'',
        //  位置
        location:{
            address:'Earth',
            longitude:0,
            latitude:0,
            UTC_explain:'Universe/Earth',
            UTC_num:8,
        },
        //  天气-未开发
        weather:null
    },
    getters:{
        localDate : (state) => state.localDate,
        location : (state) => state.location,
        //  是否是白天
        day_night : (state) => {
            let [cur,rise,set] = [
                new Date(state.currentTime).getTime(),
                new Date(state.sunRise).getTime(),
                new Date(state.sunSet).getTime()
            ];
            if(isNaN(rise)||isNaN(set)){
                //  因地理位置接口异常而缺失经纬度时导致日出日落为空时
                let _temp = new Date();
                let _defSun = [6,18].map(h=>{
                    _temp.setHours(h,0,0,0);
                    return _temp.getTime()
                });
                _temp = null;
                return cur<=_defSun[1]&&cur>=_defSun[0]
            }else {
                return cur<set&&cur>rise
            }
        }
    },
    mutations: {
        //  初始化
        [type.GLOBAL_INIT](state,{param:{content,status},callBack}){
            //  初始化当前时间
            state.currentTime = new Date();
            state.localDate = state.currentTime.toLocaleDateString();
            //  初始化天气
            state.weather = null;
            //  初始化当前位置
            try {
                if(0===status){
                    state.location = {
                        address:content.address,
                        longitude:parseFloat(content.point.x),
                        latitude:parseFloat(content.point.y),
                        UTC_explain:Intl.DateTimeFormat().resolvedOptions().timeZone,
                        UTC_num:(0 - new Date().getTimezoneOffset() / 60)
                    };
                }else {
                    throw `#百度地图api调用异常|status:${status}`
                }
            }catch (e) {
                console.log(e);
                state.location = {...def_location};
            }
            //  处理回调
            if(callBack)callBack()
        },
        //  更新当前时间/如果跨天则重新获取日出日落时间
        [type.GLOBAL_GET_CURRENT](state){
            state.currentTime = new Date();
            if(state.localDate!==state.currentTime.toLocaleDateString()){
                //  如果日期更新则更新日出日落时间（包括初始化）
                let dayUpDown = computeSunRiseSunSet(
                    state.location.latitude,
                    state.location.longitude,
                    state.location.UTC_num
                );
                state.sunRise = dayUpDown.SunRise;
                state.sunSet = dayUpDown.SunSet;
            }
            //  伴随更新缓存日期
            state.localDate = state.currentTime.toLocaleDateString()
        }
    },
    actions: {
        //  异步获取地理位置信息
        [type.ACTION_GLOBAL_INIT]({commit},{vm}){
            const env = 'development';
            if(env==='development'){
                commit(type.GLOBAL_INIT,{param:{status:-1}})
            }else {
                vm.$jsonp(vm.$api.extend.getBaiDuLocation).then(res=>{
                    commit(type.GLOBAL_INIT,{
                        param:res,
                        callBack:()=>{
                            setInterval(()=>{
                                commit(type.GLOBAL_GET_CURRENT)
                            },1000)
                        }
                    })
                }).catch(err=>{
                    console.log(err);
                    commit(type.GLOBAL_INIT,{param:{status:-1}})
                })
            }
        },
    },
}