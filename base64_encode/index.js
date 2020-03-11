
var file1 = document.getElementById('picture'),
    targetArea = document.getElementsByClassName('upload')[0],
    uploadInfo = document.getElementById('upload-info'),
    fileData = document.getElementById('file-data'),
    copyBtn = document.getElementsByClassName('copy-to-clipboard')[0];

//兼容事件处理程序
function addEvent(target, type, handler) {
    if (target.addEventListener) {
        target.addEventListener(type, handler, false);
    } else {
        target.attachEvent('on' + type, function (event) {
            return handler.call(target, event);
        });
    }
}

//兼容阻止默认事件
function preventDefault(e) {
    e = e || event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

//base64转换函数
function base64(file){
    fileData.innerHTML = '转换中...';
    if(file){
        uploadInfo.innerHTML = file.name;
        if(/image/.test(file.type)){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
                fileData.value = reader.result;
            };
        }else{
            alert("You must select a valid image file!");
        }
    }
}

addEvent(document,'dragover',preventDefault);
addEvent(document,'drop',preventDefault);
addEvent(targetArea,'dragenter',preventDefault);
addEvent(targetArea,'dragover',preventDefault);
addEvent(targetArea,'dragleave',preventDefault);
addEvent(targetArea,'drop',preventDefault);
addEvent(targetArea, 'dragenter', (e) => {
    targetArea.style.border = "2px solid #000"; 
});
addEvent(targetArea, 'dragleave', (e) => {
    targetArea.style.border = "2px dashed #ccc"; 
});

addEvent(targetArea, 'drop', e => {
    var file = e.dataTransfer.files[0];
    base64(file);
});
addEvent(file1, 'change', function(e){
    let file = this.files[0];
    base64(file);
});

addEvent(copyBtn, 'click', e => {
    fileData.select();
    document.execCommand('Copy');
});

