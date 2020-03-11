
document.getElementById('input1').addEventListener('input', optimize(handler, 'debounce', 300))
document.getElementById('input2').addEventListener('input', optimize(handler, 'throttle', 300))

function handler(e){
    printMessage(e.target.id + ': ' + e.target.value)
}

function printMessage(msg){
    if(!printMessage.ul) {
        printMessage.ul = document.getElementById('message')
    }
    let ul = printMessage.ul;

    let li = document.createElement('li')
    li.textContent = msg
    ul.prepend(li)
}

/**
 * 节流/防抖包装函数
 * @param {Function} handler event handler
 * @param {String} type debouce or throttle
 * @param {Number} delay time to delaly
 */
function optimize(handler, type='debounce', delay=300){
    let _this = this;
    let timer = null;
    if(type === 'debounce'){
        return function(){
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(()=> {
                handler.apply(_this, arguments)
                timer = null
            }, delay)
        }
    }else if(type === 'throttle'){
        return function(){
            if(timer) return 
            timer = setTimeout(()=>{
                handler.apply(_this, arguments)
                timer = null
            }, delay)
        }
    }
}
