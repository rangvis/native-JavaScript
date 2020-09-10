function max() {
    var max = arguments[0];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i]
        }
    }
    // console.log(max);
    // 函数的外部需要 用到这个最大值来不断递增
    return max
}

// 求任意多数的最小值，把最小值返回给函数


// 求任意多数之和，并且把和 返回给函数


// 求任意两个数之间的随机数
function getRandom(n, m) {
    if (n > m) {
        return parseInt(Math.random() * (n - m + 1)) + m;
    } else {
        return parseInt(Math.random() * (m - n + 1)) + n;
    }
}

function maxNumber(arr) {
    var max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    // console.log(max);
    // 函数的外部需要 用到这个最大值来不断递增
    return max
}

function minNumber(arr) {
    var min = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
        }
    }
    // console.log(max);
    // 函数的外部需要 用到这个最大值来不断递增
    return min
}

// 获取一个随机颜色
function getRandomColor() {
    // var str = '0123456789abcdef';
    // var res = '#'
    // for (var i = 0; i < 6; i++) {
    //     // str[索引] 这个索引是随机，在0-15范围之间随机
    //     res += str[parseInt(Math.random() * 16)]
    // }
    var r1 = parseInt(Math.random() * 256);
    var r2 = parseInt(Math.random() * 256);
    var r3 = parseInt(Math.random() * 256);
    var res = `rgb(${r1},${r2},${r3})`
    return res;
}

// 时间格式化 函数
/* 
    需要传两个参数
    参数1：时间对象
    参数2：连接时间的符号
*/
function date(date, n) {
    // 先获取时间的 年月日 时分秒
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = month >= 10 ? month : '0' + month;
    var day = date.getDate();
    day = day >= 10 ? day : '0' + day;

    var hours = date.getHours();
    hours = hours >= 10 ? hours : '0' + hours;
    var min = date.getMinutes();
    min = min >= 10 ? min : '0' + min;
    var sec = date.getSeconds();
    sec = sec >= 10 ? sec : '0' + sec;


    // console.log(year, month, day, hours, min, sec);
    // 把这个数字拼接成规定格式字符串
    // 把这个字符串返回
    if (n === '-') {
        return `${year}-${month}-${day} ${hours}:${min}:${sec}`
    } else if (n === '/') {
        return `${year}/${month}/${day} ${hours}:${min}:${sec}`
    } else if (n === '.') {
        return `${year}.${month}.${day} ${hours}:${min}:${sec}`
    }

}


// 获取样式的方法
// 有两个参数
// 参数1：元素
// 参数2：csss属性
function getStyle(ele, attr) {
    return style = window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr]
}


// 封装一个事件监听的函数（兼容）
// 参数：事件源，事件类型，回调函数
function addEvent(ele, type, callback) {
    if (ele.addEventListener) {
        ele.addEventListener(type, callback);
    } else {
        ele.attachEvent('on' + type, callback)
    }
}

// 动画函数
function move(ele, obj, callback) {
    let speed;
    let index = 0; //记录定时器的个数
    // 循环对象创建定时器
    for (let attr in obj) {
        // 透明度的变化的时候 0-1
        // console.log(attr);
        index++;
        // 清除上一次的定时器
        clearInterval(ele[attr])
        // 属性：attr
        // 属性值：obj[key]
        // box['width'] 给box这个dom元素添加一个 width属性(dom属性)
        // dom 对象，以地址形式存储的，当上一次更改dom对象中的值，那么这次获取这个对象的时候是能拿到被更改之后的dom对象
        ele[attr] = setInterval(() => {
            // 把透明度的取值 改边为0-100的取值
            // 0-1=====》0-100
            let style;
            if (attr == 'opacity') {
                style = getStyle(ele, attr) * 100;
            } else {
                style = parseInt(getStyle(ele, attr));
            }

            speed = (obj[attr] - style) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            style += speed;


            if (attr === 'opacity') {
                ele.style[attr] = style / 100;
            } else {
                ele.style[attr] = style + 'px';
            }

            if (style == obj[attr]) {
                clearInterval(ele[attr]);
                // 有多少个属性参数动画就会执行多少次
                // 执行一次怎么？
                // 没清除一次定时器，那么定时器的个数 -1
                index--;
                // 当定时器的个数 为0 的时候，说明所有动画执行完毕
                if (index === 0) {
                    callback && callback();
                }
            }
        }, 50)
    }
}