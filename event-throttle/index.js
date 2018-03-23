;(function(){

var inputsWrap = document.getElementsByClassName('wrap')[0];

inputsWrap.addEventListener('input', function(event){
    var target = event.target;

    switch(target.id){
        case 'input1':
            H1(event);
            break;
        case 'input2':
            H2(event);
            break;
        case 'input3':
            H3(event);
            break;
        default: 
            break;        
    }
});

function H1(event){
    console.log('input1 triggered');
    if(!H1.timer){
        H1.timer = setTimeout(function(){
            console.log('The string you input is: ' + event.target.value);
            H1.timer = null;
        }, 1000);
    }
}

function H2(event){
    H2.record = true;
    console.log('input2 triggered');
    if(!H2.interval){
        H2.interval = setInterval(function(){
            if(H2.record){
                console.log('The string you input is: ' + event.target.value);
                H2.record = false;
            }
        }, 1000);
    }
}

function H3(event){
    console.log('input3 triggered');
    if(H3.timer){
        clearTimeout(H3.timer);
    }
    H3.timer = setTimeout(function(){
        console.log('The string you input is: ' + event.target.value);
        H3.timer = null;
    }, 1000);
}

})();