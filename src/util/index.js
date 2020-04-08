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

export default {
    _sortByKey,
    _groupByKey,
    _toTreeData,
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
            console.log(err);
            return false
        }
    }
}