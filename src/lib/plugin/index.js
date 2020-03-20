import {skyCircle} from './canvas'
import {computeSunRiseSunSet} from './sunCalc'
import nb from './nb'
export default {
    getNbStr:nb,
    getSunCalc:computeSunRiseSunSet,
    getCanvas:{
        skyCircle
    },
}