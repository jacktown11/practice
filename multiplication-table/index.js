;(function(){
    window.onload = function(){
        createTable();
    };

    function createTable(){
        var frag = document.createDocumentFragment();
        for(var i = 1; i <= 9; i++){
            for(var j = 1; j <= i; j++){
                frag.appendChild(createCell(j, i));
            }
            frag.appendChild(document.createElement('br'));
        }

        var table = document.getElementsByClassName('multi')[0];
        table.appendChild(frag);
    }

    function createCell(num1, num2){
        var div = document.createElement('div');
        div.innerHTML = num2 + ' &times; ' + num1+ ' = ' + num1*num2;
        if(num1 === 1){
            div.className += ' left-border-cell';
        }
        if(num2 === 9){
            div.className += ' bottom-border-cell';
        }
        return div;
    }

})();