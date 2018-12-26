window.onload = function(){
    let backLink = document.createElement('a');
    backLink.setAttribute('href', './index.html');
    backLink.setAttribute('style', 'position: fixed; right: 0; top: 50%; width: 60px;height: 60px; margin-top: -30px; line-height: 60px; border-radius: 50%; border: 2px solid #088;');
    backLink.innerHTML = '返回';
    document.body.appendChild(backLink);
};