
function formatterDateTime() {
    var date = new Date()
    var month = date.getMonth() + 1
    var datetime = date.getFullYear()
        + ""// "年"
        + (month >= 10 ? month : "0" + month)
        + ""// "月"
        + (date.getDate() < 10 ? "0" + date.getDate() : date
            .getDate())
        + ""
        + (date.getHours() < 10 ? "0" + date.getHours() : date
            .getHours())
        + ""
        + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
            .getMinutes())
        + ""
        + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
            .getSeconds());
    return datetime;
}

$.ajax({
    type: 'post',
    url: 'http://route.showapi.com/119-42',
    dataType: 'json',
    data: {
        "showapi_timestamp": formatterDateTime(),
        "showapi_appid": '70920', //这里需要改成自己的appid
        "showapi_sign": 'eb5808a6a2dc4184a73c19ab5dbc9aa4',  //这里需要改成自己的应用的密钥secret
        "date": "0705"
    },

    error: function (XmlHttpRequest, textStatus, errorThrown) {
        alert("操作失败!");
    },
    success: function (result) {
        console.log(result);
        alert(result.showapi_res_code);
    }
});
