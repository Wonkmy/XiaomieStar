var MyArcadeConfig;

//获取父级页面的MyArcade设置 如果没有登录是获取不到的
function myarcade_get_config() {

    if (typeof parent.MyArcadeScoreBridgeConfig === "function") {
        MyArcadeConfig = parent.MyArcadeScoreBridgeConfig();

        return true;
    }

    return false;
}

//上传分数
function myarcade_submit_score(score) {

    if (myarcade_get_config()) {

        var params = 'game_id=' + MyArcadeConfig.game_id +
            '&user_id=' + MyArcadeConfig.user_id +
            '&event=score' +
            '&score=' + score +
            '&session=' + MyArcadeConfig.session;

        myarcade_ajax_call(params);
    }
}


//上传分数http请求
function myarcade_ajax_call(post) {

    var xhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    var url = MyArcadeConfig.site_url + "?action=MyArcade&do=ScoreBridge"

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(post);
}