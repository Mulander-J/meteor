//  数字

/**
 * @description 获取指定范围内随机整数
 * @param min
 * @param max
 * @returns {*}
 */
export const   getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//  字符串

export const  StrIsUseFull = (str) => {
  if(str==""||str==undefined||str==null){
    return '无'
  }
  return str
}

export const strSplitMan = (str,splitKey=',') =>{
  if(typeof str==='string'){
    return str.split(splitKey)
  }
  return []
}

//  对象

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}
/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

//  数组

/**
 * @description 迭代器
 * @param arr
 * @param fn
 */
export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}
/**
 * @param a
 * @param b
 * @returns {T[]}
 * @description 得到两个数组的差集, 两个数组的元素为数值或字符串
 */
export const getDiffrene =  (a,b) => {
  let difference = a.concat(b).filter(v => a.includes(v) && !b.includes(v))
  return difference;
};
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  let intersection = arr1.filter(v => arr2.includes(v));
  return intersection;
}
/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  let union = arr1.concat(arr2.filter(v => !arr1.includes(v)));
  return union;
}
/**
 * @param {Array} targetarr 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}
/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
/**
 * @param obj
 * @returns {*}
 * @description 判断一个对象是否是数组
 */
export const isArrayFn = (obj) => {
  if (typeof Array.isArray === "function") {
    return Array.isArray(obj);
  }else{
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}
/**
 * @param obj
 * @returns {boolean}
 * @description 判断一个数组是否为空
 */
export const arrHasData = (obj) => {
  let flag = false;
  if (isArrayFn(obj)) {
    if(obj.length>0){
      flag = true;
    }
  }
  return flag;
}
/**
 * 数组中判断是否存在重复
 * */
export const uniqueArr = function(arr){
  let nary=arr.sort();
  let flag = false;
  let key = '';
  for(let i=0;i<arr.length;i++){
    if (nary[i]==nary[i+1]){
      key = nary[i];
      flag=true;
      break;
    }
  }

  return {
    key:key,
    flag:flag
  };
}
/**
 * @description 对象数组去重
 * @param target
 * @param key
 * @returns {Array}
 * @constructor
 */
export const ObjArrUniq = (target,key) => {
  let hash = {};
  let res = [];
  res = target.reduce((preVal, curVal) => {
    hash[curVal[key]] ? '' : hash[curVal[key]] = true && preVal.push(curVal);
    return preVal
  },[]);
  return res;
}
/**
 * @description 对象数组排序
 * @param protoTypeName
 * @returns {Function}
 */
export const arrObjSort= (protoTypeName)=>{
  return function(object1,object2){
    var val1 = object1[protoTypeName];
    var val2 = object2[protoTypeName];
    if(val1<val2){
      return -1;
    }else if(val1>val2){
      return 1;
    }else{
      return 0;
    }
  }
}

//  树形

/**
 *
 * @param tree
 * @param config
 * @returns {Array}
 * @constructor
 *  @description 树形结构 结构转换
 */
export const TreeObjTransfer = (tree,config) =>{
  // 树形数据配置项
  let treeConfig = {
    attr:[], // 自定义添加属性
    change:[] // 需求替换属性  [['title','name']]
  };
  if(!!config){
    treeConfig = config;
  }
  let arr = [];
  if (!!tree && tree.length !== 0) {
    tree.forEach(item => {
      let obj = {};
      // 树形插件 必需属性
      // obj.loading=false;
      obj.expand = false;
      obj.selected = false;
      // 自定义属性
      for(let key of treeConfig.attr){
        obj[key] = item[key]||'';
      }
      // 转换属性
      for(let keys of treeConfig.change){
        obj[keys[0]] = item[keys[1]];
      }
      if(item.children&&item.children!==0){
        obj.children = TreeObjTransfer (item.children,config);
      }
      arr.push(obj);
    });
  }
  return arr;
};
/**
 * @description 递归更新
 * @param tree
 * @param option
 * @returns {Array}
 */
export const updateTree =  (tree,option) =>{
  let arr = [];
  let op = {
    type:'default',
    map:['title',''],
    attr:[]
  };
  if(!!option){
    op = option;
  }
  if (!!tree && tree.length !== 0) {
    tree.forEach(item => {
      let obj = item;
      switch (op.type) {
        case 'updateNode':
          // 自定义属性
          for(let key of op.attr){
            obj[key] = item[key]||obj[key]||'';
          }
          obj.children = updateTree (item.children,op);
          arr.push(obj);
          break;
        case 'delNode':
          if(item[op.map[0]] != op.map[1]){
            obj.children = updateTree (item.children,op);
            arr.push(obj);
          }
          break;
        default:
          obj.children = updateTree (item.children,op);
          arr.push(obj);
          break;
      }
    });
  }
  return arr;
};
/**
 *
 * @param array
 * @param childs
 * @param reg
 * @returns {*}
 * @constructor
 * @description 树形结构 根据某个条件返回该节点的全路径
 */
export const TreeParent = (array, childs, reg) => {
  Array.prototype.remove = function (val) {
    let index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if (reg(item)) {
      childs.push(item);
      return childs;
    }
    if (item.children && item.children.length > 0) {
      childs.push(item);
      let rs = TreeParent(item.children, childs, reg);
      if (rs) {
        return rs;
      }
      else {
        childs.remove(item);
      }
    }
  }
  return false;
};
/**
 *
 * @param tree
 * @param option
 * @returns {Array}
 * @constructor
 * @description 树形结构 根据某个键匹配某个值并返回一个数组
 */
export const TreeFindKey =  (tree,option) =>{
  let arr = [];
  let op = {
    reg:(value)=>{return false},
    res:(value)=>{return value}
  };
  if(!!option){
    op = option;
  }
  if (!!tree && tree.length !== 0) {
    tree.forEach(item => {
      if(op.reg(item)){
        arr.push(op.res(item));
      }
      if(item.children&&item.children.length!==0){
        arr = arr.concat(TreeFindKey (item.children,op));
      }
    });
  }
  return arr;
};
/**
 *
 * @param tree
 * @param option
 * @returns {Array}
 * @constructor
 */
export const  TreeExpand = (tree,excuete) => {
  let exc = (value)=>{return value};
  if(!!excuete){
    exc = excuete;
  }
  let arr = [];
  if (!!tree && tree.length !== 0) {
    tree.forEach(item => {
      item = exc(item);
      if(item.children&&item.children!==0){
        item.children=TreeExpand (item.children,excuete);
      }
      arr.push(item);
    });
  }
  return arr;

};

//  日期

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
    const timeStr = String(timeStamp)
    return timeStr.length > 10
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
    return timeStamp < currentTime
}
/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
export const getHandledValue = num => {
    return num < 10 ? '0' + num : num
}
/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType) => {
    const d = new Date(timeStamp * 1000)
    const year = d.getFullYear()
    const month = getHandledValue(d.getMonth() + 1)
    const date = getHandledValue(d.getDate())
    const hours = getHandledValue(d.getHours())
    const minutes = getHandledValue(d.getMinutes())
    const second = getHandledValue(d.getSeconds())
    let resStr = ''
    if (startType === 'year') resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
    else resStr = month + '-' + date + ' ' + hours + ':' + minutes
    return resStr
}
/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
    // 判断当前传入的时间戳是秒格式还是毫秒
    const IS_MILLISECOND = isMillisecond(timeStamp)
    // 如果是毫秒格式则转为秒格式
    if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
    // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
    timeStamp = Number(timeStamp)
    // 获取当前时间时间戳
    const currentTime = Math.floor(Date.parse(new Date()) / 1000)
    // 判断传入时间戳是否早于当前时间戳
    const IS_EARLY = isEarly(timeStamp, currentTime)
    // 获取两个时间戳差值
    let diff = currentTime - timeStamp
    // 如果IS_EARLY为false则差值取反
    if (!IS_EARLY) diff = -diff
    let resStr = ''
    const dirStr = IS_EARLY ? '前' : '后'
    // 少于等于59秒
    if (diff <= 59) resStr = diff + '秒' + dirStr
    // 多于59秒，少于等于59分钟59秒
    else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
    // 多于59分钟59秒，少于等于23小时59分钟59秒
    else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
    // 多于23小时59分钟59秒，少于等于29天59分钟59秒
    else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
    // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
    else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
    else resStr = getDate(timeStamp, 'year')
    return resStr
}
/**
 * 日期开阈值
 * @param param
 * @returns {Date}
 */
export const date_formatDateStart = function(param){
  let date= new Date(param);
  let m = (date.getMonth()+1)>=10?(date.getMonth()+1):'0'+(date.getMonth()+1);
  let d = date.getDate()>=10?date.getDate():'0'+date.getDate();
  let dateStr = date.getFullYear()+'/'+m+'/'+d;
  return new Date(dateStr);
};
/**
 * 日期闭阈值
 * @param param
 * @returns {Date}
 */
export const date_formatDateEnd = function(param){
  let date= new Date(param);
  let m = (date.getMonth()+1)>=10?(date.getMonth()+1):'0'+(date.getMonth()+1);
  let d = date.getDate()>=10?date.getDate():'0'+date.getDate();
  let dateStr = date.getFullYear()+'/'+m+'/'+d;
  return new Date(new Date(new Date(dateStr).toLocaleDateString()).getTime()+24*60*60*1000-1)
};
/**
 * @description 日期 YYYY/MM/DD
 * @param param
 * @returns {string}
 */
export const date_formatDateOnly = function(param){
  let date= new Date(param);
  let m = (date.getMonth()+1)>=10?(date.getMonth()+1):'0'+(date.getMonth()+1);
  let d = date.getDate()>=10?date.getDate():'0'+date.getDate();
  let dateStr = date.getFullYear()+'/'+m+'/'+d;
  return dateStr;
}
/**
 * @description 日期格式化 YYYY-MM-DD_hh:mm:ss
 * @param param
 * @returns {string}
 */
export const date_format = function(param) {
  let date= new Date(param);
  let m = (date.getMonth()+1)>=10?(date.getMonth()+1):'0'+(date.getMonth()+1);
  let d = date.getDate()>=10?date.getDate():'0'+date.getDate();
  let h = date.getHours()>=10?date.getHours():'0'+date.getHours();
  let mm = date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes();
  let s = date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds();
  return (date.getFullYear()+'-'+m+'-'+d+' '+h+':'+mm+':'+s)
};
//  系统

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
    const ua = window.navigator.userAgent
    const isExplorer = (exp) => {
        return ua.indexOf(exp) > -1
    }
    if (isExplorer('MSIE')) return 'IE'
    else if (isExplorer('Firefox')) return 'Firefox'
    else if (isExplorer('Chrome')) return 'Chrome'
    else if (isExplorer('Opera')) return 'Opera'
    else if (isExplorer('Safari')) return 'Safari'
}

//  事件

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.attachEvent('on' + event, handler)
            }
        }
    }
})()
/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element, event, handler) {
            if (element && event) {
                element.detachEvent('on' + event, handler)
            }
        }
    }
})()
/**
 * @description 数字输入框-滚轮禁止事件
 * @param e
 */
export const numberScrollControl = (e)=>{
  e=e || window.event;
  if( e.preventDefault){
    // Firefox
    e.preventDefault();
    e.stopPropagation();
  } else {
    // IE
    e.cancelBubble = true;
    e.returnValue = false;
  }
}

//  颜色

/*** random number : 生成指定范围内的随机整数 ****/
export const color_rn =  (min,max)=> {
  return Math.floor(Math.random()*(max-min)+min);
};
/*** random color : 生成指定范围内的随机颜色 ****/
export const color_rc =  (min,max,book=[])=> {

  let r=color_rn(min,max);
  let g=color_rn(min,max);
  let b=color_rn(min,max);

  let _temp_color = [r,g,b].join(',');

  let a = book.some(e=>{return e===_temp_color});
  if(a){
    return rc(min,max,book);
  }
  book.push(_temp_color);
  return _temp_color;
};
/**
 * @description 16进制转rgba
 * @param str
 * @param opacity
 * @returns {string}
 */
export const color_rgba = (str,opacity)=>{
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  var sColor = str.toLowerCase();
  if(sColor && reg.test(sColor)){
    if(sColor.length === 4){
      var sColorNew = "#";
      for(var i=1; i<4; i+=1){
        sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for(var i=1; i<7; i+=2){
      sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
    }
    sColorChange.push(opacity||1);
    return "RGBA(" + sColorChange.join(",") + ")";
  }else{
    return sColor;
  }
};

//  工具

/**
 * @description 递归深拷贝
 * @param obj
 * @returns {{}|Array}
 */
export const getDeepCopy = (obj) => {
  let arrobj;
  //  若为时间类型
  if(obj instanceof Date){
    return new Date(obj)
  }
  //  判断数组或对象
  Array.isArray(obj)?arrobj =[] :arrobj = {};
  for(let  i in obj){
    if(obj.hasOwnProperty(i)){
      arrobj[i] = (typeof obj[i] === "object")&&(obj[i]!==null)? getDeepCopy(obj[i]) : obj[i];
    }
  }
  return arrobj;
};
/**
 * @description 生成UUID
 * @returns {string}
 */
export const generateUUID = () => {
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
/**
 * @description 地址栏参数查询
 * @param variable
 * @returns {*}
 */
export const getQueryVariable = (variable)=> {
    let url = window.location.href;
    let index = url.indexOf(variable);
    if(index>=0){
        return url.slice(index+variable.length,url.length);
    }else {
        return false;
    }
};
/***
 * @description 数组求和
 * @param arr
 * @returns {number}
 */
export const getDataSum = (arr) => {
    var s = 0;
    for (var i=arr.length-1; i>=0; i--) {
        s += arr[i];
    }
    return s;
}



