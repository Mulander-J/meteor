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

export default {
    _sortByKey,
    _groupByKey
}