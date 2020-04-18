const _sortByKey=(protoTypeName)=>{
        return function(object1,object2){
        let val1 = object1[protoTypeName];
        let val2 = object2[protoTypeName];
        if(val1<val2){
            return -1;
        }else if(val1>val2){
            return 1;
        }else{
            return 0;
        }
    }
};
const _groupByKey = (groupData,key)=>{
    let res = [];
    res = groupData.reduce((prevValue, currentValue) => {
        let index = -1;
        prevValue.some((item, i) => {
            if (item[key] === currentValue[key]) {
                index = i;
                return true;
            }
        });
        if (index > -1) {
            prevValue[index].group.push({
                ...currentValue
            })
        } else {
            let _item = {
                group: [{
                    ...currentValue
                }]
            };
            _item[key] = currentValue[key];
            prevValue.push(_item);
        }
        return prevValue;
    }, []);
    res.sort(_sortByKey(key));
    return res;
};
const _toTreeData = (source,pattern) =>{
    let {
        id='id', parentId='parent',
        children='children',firstParent='#',
        isSort=false,sortKey='sort',
    } = pattern;
    let cloneData = JSON.parse(JSON.stringify(source));
    let tree = cloneData.filter(father=>{
        let branchArr = cloneData.filter(child => father[id] == child[parentId]);
        if(isSort)branchArr.sort(_sortByKey(sortKey));
        branchArr.length>0 ? father[children] = branchArr : '';
        return father[parentId] == firstParent
    });
    if(isSort)tree.sort(_sortByKey(sortKey));
    return tree
};
/**
 * @description 递归深拷贝
 * @param obj
 * @returns {{}|Array}
 */
const _getDeepCopy = (obj) => {
    let arrobj;
    //  若为时间类型
    if(obj instanceof Date){
        return new Date(obj)
    }
    //  判断数组或对象
    Array.isArray(obj)?arrobj =[] :arrobj = {};
    for(let  i in obj){
        // if(obj.hasOwnProperty(i)){
        if(Object.prototype.hasOwnProperty.call(obj, i)){
            arrobj[i] = (typeof obj[i] === "object")&&(obj[i]!==null)? _getDeepCopy(obj[i]) : obj[i];
        }
    }
    return arrobj;
};
/**
 * @description 生成UUID
 * @returns {string}
 */
const _generateUUID = () => {
    const UUIDCODE = 'WEB';
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    // var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid+UUIDCODE;
};

export default {
    _sortByKey,
    _groupByKey,
    _toTreeData,
    _getDeepCopy,
    _generateUUID,
    _checkSession:(key,inKeys)=>{
        let _session = sessionStorage.getItem(key);
        try {
            let Obj = JSON.parse(_session);
            let count = 0;
            inKeys.forEach(ele=>{
                if(Obj[ele])count++
            });
            return count===inKeys.length
        }catch (err) {
            return err?false:null
        }
    }
}