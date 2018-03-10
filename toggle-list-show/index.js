;(function(){
init();

function init(){
    var toggleIcon = document.getElementById('toggle-show');
    toggleIcon.addEventListener('click', (function(){
        var status = 'open',
            ul = document.getElementsByTagName('ul')[0];
        return function(event){
            if(status === 'open'){
                this.className = 'down';
                ul.style.display = 'none'; 
                status = 'closed';
            }else{
                this.className = 'up';
                ul.style.display = 'block';
                status = 'open';
            }
        }
    }()));
}

})();