;(function(){
init();

function init(){
    var ctrlTabs = document.getElementsByTagName('li'),
        contentDivs = document.getElementsByClassName('content')[0]
            .getElementsByTagName('div');
    ctrlTabs = [].slice.call(ctrlTabs);
    contentDivs = [].slice.call(contentDivs);
    ctrlTabs.forEach(function(tab, index, arr){
        tab.addEventListener('click', function(){
            arr.forEach(function(tabIn, indexIn, arrIn){
                tabIn.className = '';
            });
            this.className = 'active';

            contentDivs.forEach(function(div, index, arr){
                div.className = '';
            });
            contentDivs[index].className = 'show';
        });
    });
}

})();