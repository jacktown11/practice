let PalindromeCalculator = {
    result: {
        originLen: 0,
        originStr: '',
        resultLen: 0,
        resultStr: '',
        resultPos: 0
    },
    calculate (inputStr) {
        let originLen = inputStr.length;
        this.result.originStr = inputStr;
        this.result.originLen = originLen;
        this.result.resultLen = 0;
        this.result.resultStr = '';

        let resultLen = 0;
        let startPos = 0;
        let mid;    // 回文子字符串的中间位置（偶数长度的子字符串为小数）
        let left, right;
        for(mid=0; mid<originLen; mid++){
            // 以mid为中心的奇数长度的回文子字符串
            left = mid - 1;
            right = mid + 1;
            let currentLen = 1;
            for(; left>=0 && right<originLen && inputStr.charAt(left)===inputStr.charAt(right); left--,right++){
                currentLen += 2;
            }
            if(currentLen > resultLen){
                //  更长的回文子字符串
                resultLen = currentLen;
                startPos = left+1;
            }
        }
        for(mid=0.5; mid<originLen-1; mid++){
            // 以mid为中心的偶数长度的回文子字符串
            left = mid - 0.5;
            right = mid + 0.5;
            let currentLen = 0;
            for(; left>=0 && right<originLen && inputStr.charAt(left)===inputStr.charAt(right); left--,right++){
                currentLen += 2;
            }
            if(currentLen > resultLen){
                //  更长的回文子字符串
                resultLen = currentLen;
                startPos = left+1;
            }
        }
        
        this.result.resultLen = resultLen;
        this.result.resultPos = startPos;
        this.result.resultStr = this.result.originStr.substr(startPos, resultLen);
    }
};

let StrGenerator = {
    genStr(len){
        let str = '';
        for(let i = 0; i<len; i++){
            str += String.fromCharCode(65+Math.floor(Math.random()*26));
        }
        return str;
    }
};

let Render = {
    nodes: {
        resultLen: document.getElementById('result-len'),
        resultStr: document.getElementById('result-str'),
        resultPos: document.getElementById('result-pos'),
        originLen: document.getElementById('origin-len'),
        originStr: document.getElementById('origin-str')
    },
    showResult () {
        let result = PalindromeCalculator.result;
        for(let key in this.nodes){
            if(key !== 'originStr'){
                this.nodes[key].innerHTML = result[key];
            }else if(result[key].length < 10000){
                this.nodes[key].innerHTML = result[key].replace(result.resultStr, '<span style="background: red;">'+result.resultStr+'</span>');
            }else{
                // 字符串太长，渲染性能太差
                this.nodes[key].innerHTML = '原字符串太长，不再显示';
            }
        }
    }
};

let Handler = {
    init () {
        document.getElementById('new-test').addEventListener('click', (event) => {
            let input = document.getElementById('test-len').value;
            let len = parseInt(input);
            let testStr = len ? StrGenerator.genStr(len) : input;
            PalindromeCalculator.calculate(testStr);
            Render.showResult();
        });
    }
};

Handler.init();
