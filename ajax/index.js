window.onload = function(){
    var ajaxNode = document.getElementById('ajax');
    ajaxNode.addEventListener('click', function(){
        ajax('GET', './data.json', true, handleResponse);
    });
};

/**
 * 用兼容IE6-的方式创建一个XHLHttpRequest对象
 */
function createXHR() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== 'undefined') {
        // IE6-
        if (typeof arguments.callee.ActiveXString !== 'string') {
            var versions = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'],
                len = versions.length,
                i = 0;
            for (; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.ActiveXString = versions[i];
                    break;
                } catch (error) {

                }
            }
            return new ActiveXObject(arguments.callee.ActiveXString);
        }
    } else {
        throw new Error('No XHR object available.');
    }
}

/**
 * GET和POST通用ajax请求函数
 * @param {string} method 请求方法
 * @param {string} url 请求地址
 * @param {boolean} isAsyc 是否异步发送请求
 * @param {function} callback 成功回调函数，传入xhr对象
 * @param {string} queryStr 以=和&连接的键值对参数字符串
 */
function ajax(method, url, isAsyc, callback, queryStr) {
    var xhr = createXHR(),
        isGet = method.toLowerCase() === 'get';
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                var res = xhr.responseText;
                callback && callback(xhr);
            }else{

            }
        }
    };
    xhr.open(method, (isGet && queryStr)? url + '?' + queryStr: url, isAsyc);
    xhr.setRequestHeader('jacktown-x', '1');
    xhr.send((isGet || !para)? null: para);
}

function serialize(obj){
    var arr = [];
    for(var key in obj){
        arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return arr.join('&');
}

function handleResponse(xhr){
    var doc = document,
        frag = doc.createDocumentFragment(),
        res = JSON.parse(xhr.responseText),
        p = doc.createElement('p'),
        innerHTML = '';
    for(var key in res){
        p.innerHTML += key + ' = ' + res[key] + '<br>';
    }
    frag.appendChild(p);

    // show all response headers
    p = doc.createElement('p');
    p.innerHTML = 'response headers<br>';
    var allHeaders = xhr.getAllResponseHeaders().replace(/\n/g, '<br>');
    p.innerHTML += allHeaders;
    frag.appendChild(p);

    doc.body.appendChild(frag);
}

