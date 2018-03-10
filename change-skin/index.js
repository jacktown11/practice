;(function(){
bindHandlers();

function bindHandlers(){
    var btnDiv = document.getElementById('skin-btn');
    btnDiv.addEventListener('click', changeSkin);
}

function changeSkin(event){
    if(event.target.nodeName.toLowerCase() === 'button'){
        var cssLink = document.getElementById('skin');
        cssLink.href = event.target.getAttribute('data-skin');
    }
}   

})();