
var file1 = document.getElementById('picture'),
    targetArea = document.getElementsByClassName('upload')[0],
    uploadInfo = document.getElementById('upload-info'),
    fileData = document.getElementById('file-data'),
    resultInfo = document.getElementsByClassName('info')[0];

function selectText(ele) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(ele);
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(ele);
        window.getSelection().addRange(range);
    }
}
//base64转换函数
function base64(file){
    if(fileData.innerHTML){
        fileData.innerHTML = '转换中';
    }
    if(file){
        uploadInfo.innerHTML = file.name;
        if(/image/.test(file.type)){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
                fileData.innerHTML = reader.result;
                selectText(fileData);
                resultInfo.style.display = 'block';
            }
        }else{
            alert("You must select a valid image file!");
        }
    }
}
file1.onchange = function(){
    console.log('onchange');
    var file = file1.files[0];
    base64(file);
}
//兼容事件处理程序
function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type, handler, false);
    }else{
        target.attachEvent('on' + type, function (event) {
            return handler.call(target, event);
        });
    }
}

//兼容阻止默认事件
function preventDefault(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}
addEvent(document,'dragover',preventDefault);
addEvent(document,'drop',preventDefault);
addEvent(targetArea,'dragenter',preventDefault);
addEvent(targetArea,'dragover',preventDefault);
addEvent(targetArea,'dragleave',preventDefault);
addEvent(targetArea,'drop',preventDefault);
targetArea.ondragenter = function(e){
    this.style.border = "2px solid #000"; 
}
targetArea.ondragleave = function(e){
    this.style.border = "2px dashed #ccc"; 
}

//拖拽选中
targetArea.ondrop = function(e){
    console.log('ondrop');
    e = e || event;
    var file = e.dataTransfer.files[0];
    base64(file);
}
