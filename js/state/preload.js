//游戏加载场景
class preload {
    constructor() {}
    init() {
        this.bg = game.add.sprite(0, 0, 'loadbg');
        this.bg.width = gameConfig.width;
        this.bg.height = gameConfig.height;
    };
    preload() {
        //进度条
        // this.progress = game.add.sprite(game.world.centerX, 587, 'progress');
        // this.progress.anchor.set(0.5, 0);
        // this.progress.width = 500;
        // this.progress.height = 156;
        // this.progressBar = game.add.sprite(120, 705, 'progressBar');
        // this.progressBar.anchor.set(0, 0);
        // this.progressBar.width = 0;
        // this.progressBar.height = 30;
        // this.loadword = game.add.sprite(game.world.centerX, 804, 'loadword');
        // this.loadword.anchor.set(0.5, 0);
        // this.loadword.width = 193;
        // this.loadword.height = 40;
        //加载资源

        game.load.image('box1', './assets/images/box1.png');
        game.load.image('box2', './assets/images/box2.png');
        game.load.image('box3', './assets/images/box3.png');
        game.load.image('box4', './assets/images/box4.png');
        game.load.image('box5', './assets/images/box5.png');
        game.load.image('box6', './assets/images/box6.png');
        game.load.image('box7', './assets/images/box7.png');
        game.load.image('box8', './assets/images/box8.png');

        game.load.image('cat1','./assets/images/cat1.png');
        game.load.image('cat2','./assets/images/cat2.png');
        game.load.image('cat3','./assets/images/cat3.png');
        game.load.image('cat4','./assets/images/cat4.png');

        game.load.image('popup_2','./assets/images/Popup_2.png')
        game.load.image('y2','./assets/images/y2.png')
        game.load.image('y1','./assets/images/y1.png')

        game.load.image('girl', './assets/images/home_npc.png');
        game.load.image('title', './assets/images/logo.png');
        game.load.image('startBtn', './assets/images/play_button.png');
        game.load.image('score', './assets/images/score.png');
        game.load.audio('bgm', './assets/audio/bgm.mp3');
        game.load.audio('lose', './assets/audio/lose.mp3');
        game.load.audio('shoot', './assets/audio/shoot.mp3');
        game.load.audio('click', './assets/audio/MenuClick.mp3');
        game.load.audio('levelUp', './assets/audio/levelUp.mp3');
        game.load.audio('gameStart', './assets/audio/gameStart.mp3');
        game.load.audio('get','./assets/audio/get.mp3')
        game.load.image('bottomBg', './assets/images/game_bg.jpg');
        game.load.image('cellbg', './assets/images/bg.png');

        game.load.image('topBg', './assets/images/npc_bg.png');
        game.load.spritesheet('npcs', './assets/images/npc.png', 286, 391);
        game.load.image('basket', './assets/images/ball.png');
        game.load.image('ball', './assets/images/ball_1.png');
        game.load.image('flowerball', './assets/images/ball_2.png');
        game.load.image('failBall', './assets/images/Gold.png');
        game.load.image('pause', './assets/images/button_suspend1.png');
        game.load.image('modalBg', './assets/images/back.png');
        game.load.image('button', './assets/images/button1.png');
        game.load.image('goon', './assets/images/button_suspend2.png');
        game.load.image('close', './assets/images/close.png');
        game.load.spritesheet('sound', './assets/images/soundBtn.png', 114, 114);
        game.load.spritesheet('stars', './assets/images/stars.png', 800, 245);
        game.load.image('scoreBar', './assets/images/Popup_4.png');
        game.load.image('overTitle', './assets/images/over.png');
        game.load.image('sayBar', './assets/images/sey.png');
        game.load.image('debugBtn', './assets/images/Button-Last.png');


    }
    loadUpdate() {
        //this.progressBar.width = 480 * (game.load.progress / 100)
    }
    create() {
        // 音乐控制
        bgm = game.add.sound('bgm', soundVolume, true);
        bgm.play();
        game.state.start('menu');
    }
};