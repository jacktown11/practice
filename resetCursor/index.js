var strs = [
    "auto",
    "col-resize",
    "row-resize",
    "all-scroll",
    "crosshair" ,
    "move" ,
    "help" ,
    "no-drop",
    "not-allowed",
    "pointer" ,
    "progress" ,
    "text" ,
    "vertical-text",
    "wait" ,
    "w-resize"
];
document.documentElement.addEventListener("click", function(){
    console.log("1");
    document.documentElement.style.cursor = strs[randInt(strs.length)];
});

function randInt(max){
    // 生成[0,max)的随机数
    return Math.floor(max*Math.random());
}