import link_daily from './link_daily'
import link_devil from './link_devil'
export default {
    'Daily':{
        'title':'Wiki_1001',
        'desc':'奇怪的知识增加了',
        'list':link_daily.data,
        'lastUpdate':link_daily.lastUpdate
    },
    'Devil':{
        'title':'Devil_lived',
        'desc':'HP-1&MP+1',
        'list':link_devil.data,
        'lastUpdate':link_devil.lastUpdate
    }
}