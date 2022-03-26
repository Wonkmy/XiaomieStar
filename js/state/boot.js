// 游戏初始化场景

class boot {
    constructor() {}
    init() {
        game.scale.pagesAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.scale.scaleMode = isPhone ? Phaser.ScaleManager.EXACT_FIT : Phaser.ScaleManager.SHOW_ALL
    }
    preload() {
        game.load.image('loadbg', './assets/images/logo_bg.jpg');
        game.load.image('loadword', './assets/images/loadword.png');
        game.load.image('progress', './assets/images/progress.png');
        game.load.image('progressBar', './assets/images/progressBar.png');
    }
    create() {
        game.state.start('preload');
    }
};