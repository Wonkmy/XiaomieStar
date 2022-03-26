var game
var unit; //ui素材和设计稿尺寸换算单位
var bgm, clickbgm;
var soundVolume = 1

var isPhone = (/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i).test(navigator.userAgent)

var npcNum = 4; //顶部Npc数量

//游戏尺寸
var gameConfig = {
    width: 720,
    height: 1280,
}

//设计稿尺寸
var UIsize = {
    width: 1440,
    height: 2560
}
window.onload = function() {
    getAds()
    unit = gameConfig.width / UIsize.width

    game = new Phaser.Game(gameConfig.width, gameConfig.height, Phaser.AUTO);

    game.state.add('boot', boot);
    game.state.add('preload', preload);
    game.state.add('menu', menu);
    //game.state.add('game', gamePlay);
    game.state.add('mainScene',mainScene)

    game.state.start('boot');

}

function ReadFile(data) {
    console.log(data)
    if (data == gameState.adsString) {
        gameState.ads = true
    }
}

function getAds() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
        ReadFile(xhr.responseText);
    };
    try {
        xhr.open("get", gameState.txtUrl, true);
        xhr.send();
    } catch (ex) {
        console.log("catch")
        ReadFile(ex.message);
    }
}