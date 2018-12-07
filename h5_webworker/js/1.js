/**
 * 判断一个整数是否是质数
 * @param {int} num 整数 
 */
function isPrime(num){
    if(typeof num != 'number') return false; 
    if(Math.floor(num) != num) return false;
    if(num<0) num = -num;

    let max = Math.sqrt(num);
    for(let factor = 2; factor<=max; factor++){
        if(num%factor === 0) return false;
    }
    return true;
}

for(let i= 0; i < 10000; i++){
    console.log(i + ': ' + isPrime(i));
}
