var gamePause
var btnStyle = { font: "30px serif", fill: "#ffffff", align: "center", fontWeight: '900' }
var TextStyle = { font: "30px serif", fill: "#db6600", align: "center", fontWeight: '900', wordWrap: true, wordWrapWidth: 300 }
class gamePlay {
    constructor() {}

    preload() {
        this.shoot = game.add.audio('shoot');
        this.levelUpSound = game.add.audio('levelUp');
        this.loseSound = game.add.audio('lose');
        this.startSound = game.add.audio('gameStart');
        // this.collectSound = game.add.audio('collect');
        // this.gameOverSound = game.add.audio("gameFail");
        // this.buttonClickSound = game.add.audio("buttonClick");
    }

    create() {
        playCofig.fail = 3
        game.physics.startSystem(Phaser.Physics.ARCADE);
        gamePause = true;
        this.level = 1; //当前关卡
        this.score = 0; //总分
        let levellist = dataJson;
        this.levelObj = levellist.levelList[this.level - 1];
        this.needScore = this.levelObj.needScore;
        // 球场
        this.bottomBg = game.add.sprite(0, 780 * unit, 'bottomBg');
        this.bottomBg.width = gameConfig.width;
        this.bottomBg.height = 1780 * unit;
        this.bottomBg.inputEnabled = true;

        //所有掉落的球容器
        this.ballGroup = game.add.group();

        //上方npc背景
        this.topBg = game.add.sprite(0, 0, 'topBg');
        this.topBg.width = gameConfig.width;
        this.topBg.height = 823 * unit;

        //上方npc
        this.topNpc = game.add.sprite(game.world.centerX + 20, 0, 'npcs');
        this.topNpc.width = 286;
        this.topNpc.height = 391;
        this.topNpc.anchor.set(0.5, 0);
        this.topNpc.frame = 5

        //当前分数
        this.scoreText = game.add.retroFont('score', 32, 62, "0123456789", 10, 0, 0);
        this.scoreText.setFixedWidth(320, Phaser.RetroFont.ALIGN_RIGHT);
        this.scoreText.text = "" + this.score;
        this.num = game.add.image(1180 * unit, 80 * unit, this.scoreText);
        this.num.scale.set(1 * unit);
        this.num.anchor.set(1, 0);

        this.needscoreText = game.add.retroFont('score', 32, 62, "0123456789", 10, 0, 0);
        // this.needscoreText.setFixedWidth(320, Phaser.RetroFont.ALIGN_RIGHT);
        this.needscoreText.text = "" + this.needScore;
        this.needscorenum = game.add.image(1380 * unit, 80 * unit, this.needscoreText);
        this.needscorenum.scale.set(1 * unit);
        this.needscorenum.anchor.set(1, 0);
        this.xiegangTxt = game.add.text(this.num.x + 10, 70 * unit, "/", btnStyle)

        //左边容错数量
        this.failBallGroup = game.add.group();
        this.failBallArr = []
        for (let i = 1; i <= playCofig.fail; i++) {
            let ball = game.add.sprite((108 * i) * unit, 48 * unit, 'failBall');
            ball.width = 103 * unit;
            ball.height = 103 * unit;
            ball.anchor.set(0.5, 0);
            this.failBallArr.push({
                tileSprite: ball,
                show: true
            })
            this.failBallGroup.add(ball)
        }

        //暂停
        this.pauseBtn = game.add.button(1290 * unit, 645 * unit, "pause", this.pauseClick, this);
        this.pauseBtn.width = 114 * unit;
        this.pauseBtn.height = 114 * unit;

        //球框
        this.basket = game.add.sprite(game.world.centerX, gameConfig.height - 192, 'basket');
        this.basket.width = 394 * unit;
        this.basket.height = 384 * unit;
        this.basket.anchor.set(0.5, 0);

        //创建一个隐形的碰撞物体优化视觉效果
        this.fakeBasket = game.add.sprite(game.world.centerX, gameConfig.height - 122, 'basket');
        this.fakeBasket.width = 100 * unit;
        this.fakeBasket.height = 100 * unit;
        this.fakeBasket.anchor.set(0.5, 0);
        this.fakeBasket.alpha = 0;
        game.physics.arcade.enable(this.fakeBasket);

        //创建暂停界面
        this.pauseGroup = game.add.group();
        this.pauseBg = game.add.sprite(game.world.centerX, 810 * unit, "modalBg");
        this.pauseBg.width = 1090 * unit;
        this.pauseBg.height = 1200 * unit;
        this.pauseBg.anchor.set(0.5, 0);
        //重新开始按钮
        this.restartBtn = game.add.button(game.world.centerX, 1776 * unit, "button", function() {
            clickbgm.play();
            bgm.stop()
            game.state.start('menu');
        }, this)
        this.restartBtn.anchor.set(0.5, 0);
        this.restartBtn.width = 646 * unit;
        this.restartBtn.height = 172 * unit;
        this.restartBtnTxt = game.add.text(this.restartBtn.x, this.restartBtn.y + 43, 'RESTART', btnStyle);
        this.restartBtnTxt.anchor.set(0.5);
        //声音控制
        this.soundBtn = game.add.sprite(game.world.centerX, 980 * unit, "sound");
        this.soundBtn.frame = soundVolume
        this.soundBtn.width = 150;
        this.soundBtn.height = 150;
        this.soundBtn.anchor.set(0.5, 0);
        this.soundBtn.inputEnabled = true
        this.soundBtn.events.onInputDown.add(this.bgmControl, this);
        //继续
        this.goonBtn = game.add.button(game.world.centerX, 700, "goon", this.goonclick, this)
        this.goonBtn.width = 150;
        this.goonBtn.height = 150;
        this.goonBtn.anchor.set(0.5, 0);

        this.closeBtn = game.add.button(1158 * unit, 830 * unit, "close", this.goonclick, this);
        this.closeBtn.width = 82 * unit;
        this.closeBtn.height = 86 * unit;

        this.pauseGroup.add(this.pauseBg);
        this.pauseGroup.add(this.restartBtn);
        this.pauseGroup.add(this.restartBtnTxt);
        this.pauseGroup.add(this.soundBtn);
        this.pauseGroup.add(this.goonBtn);
        this.pauseGroup.add(this.closeBtn);
        this.pauseGroup.visible = false;

        //通关画面
        this.levelUpGroup = game.add.group()
        this.levelUpBg = game.add.sprite(game.world.centerX, 810 * unit, "modalBg");
        this.levelUpBg.width = 1090 * unit;
        this.levelUpBg.height = 1200 * unit;
        this.levelUpBg.anchor.set(0.5, 0);

        this.levelcloseBtn = game.add.button(1158 * unit, 830 * unit, "close", this.continue, this);
        this.levelcloseBtn.width = 82 * unit;
        this.levelcloseBtn.height = 86 * unit;

        this.stars = game.add.sprite(game.world.centerX, 970 * unit, "stars");
        this.stars.width = 800 * unit;
        this.stars.height = 240 * unit;
        this.stars.anchor.set(0.5, 0);
        this.scoreBar = game.add.sprite(game.world.centerX, 1370 * unit, "scoreBar");
        this.scoreBar.width = 646 * unit;
        this.scoreBar.height = 172 * unit;
        this.scoreBar.anchor.set(0.5, 0);

        this.levelscoreText = game.add.retroFont('score', 32, 62, "0123456789", 10, 0, 0);
        this.levelscoreText.text = "" + this.score;
        this.Levelnum = game.add.image(game.world.centerX, 1400 * unit, this.levelscoreText);
        this.Levelnum.scale.set(1.5 * unit);
        this.Levelnum.anchor.set(0.5, 0);

        // this.levelContinueBtn = game
        this.continueBtn = game.add.button(game.world.centerX, 1640 * unit, "button", this.continue, this)
        this.continueBtn.anchor.set(0.5, 0);
        this.continueBtn.width = 646 * unit;
        this.continueBtn.height = 172 * unit;
        this.continueBtnTxt = game.add.text(this.continueBtn.x, this.continueBtn.y + 43, 'CONTINUE', btnStyle);
        this.continueBtnTxt.anchor.set(0.5);

        this.levelUpGroup.add(this.levelUpBg)
        this.levelUpGroup.add(this.levelcloseBtn)
        this.levelUpGroup.add(this.stars)
        this.levelUpGroup.add(this.scoreBar)
        this.levelUpGroup.add(this.Levelnum)
        this.levelUpGroup.add(this.continueBtn)
        this.levelUpGroup.add(this.continueBtnTxt)
        this.levelUpGroup.visible = false

        //游戏结束画面
        this.gameOverGroup = game.add.group()
        this.gameoverBg = game.add.sprite(game.world.centerX, 810 * unit, "modalBg");
        this.gameoverBg.width = 1090 * unit;
        this.gameoverBg.height = 1200 * unit;
        this.gameoverBg.anchor.set(0.5, 0);

        this.gameovercloseBtn = game.add.button(1158 * unit, 830 * unit, "close", function() {
            clickbgm.play();
            bgm.stop()
            game.state.start('menu');
        }, this);
        this.gameovercloseBtn.width = 82 * unit;
        this.gameovercloseBtn.height = 86 * unit;

        this.overTitie = game.add.sprite(game.world.centerX, 970 * unit, "overTitle");
        this.overTitie.width = 1036 * unit;
        this.overTitie.height = 198 * unit;
        this.overTitie.anchor.set(0.5, 0);
        this.overscoreBar = game.add.sprite(game.world.centerX, 1370 * unit, "scoreBar");
        this.overscoreBar.width = 646 * unit;
        this.overscoreBar.height = 172 * unit;
        this.overscoreBar.anchor.set(0.5, 0);

        this.overscoreText = game.add.retroFont('score', 32, 62, "0123456789", 10, 0, 0);
        this.overscoreText.text = "" + this.score;
        this.overnum = game.add.image(game.world.centerX, 1400 * unit, this.overscoreText);
        this.overnum.scale.set(1.5 * unit);
        this.overnum.anchor.set(0.5, 0);

        this.backBtn = game.add.button(game.world.centerX, 1640 * unit, "button", function() {
            clickbgm.play();
            bgm.stop()
            game.state.start('menu');
        }, this)
        this.backBtn.anchor.set(0.5, 0);
        this.backBtn.width = 646 * unit;
        this.backBtn.height = 172 * unit;
        this.backBtnTxt = game.add.text(this.backBtn.x, this.backBtn.y + 43, 'MENU', btnStyle);
        this.backBtnTxt.anchor.set(0.5);

        this.submitBtn = game.add.button(game.world.centerX, 1800 * unit, "button", function() {
            clickbgm.play();
            bgm.stop()
                // game.state.start('menu');
            myarcade_submit_score(this.score)
        }, this)
        this.submitBtn.anchor.set(0.5, 0);
        this.submitBtn.width = 646 * unit;
        this.submitBtn.height = 172 * unit;
        this.submitBtnTxt = game.add.text(this.submitBtn.x, this.submitBtn.y + 43, 'SUBMIT SCORE', btnStyle);
        this.submitBtnTxt.anchor.set(0.5);

        this.npcSaysBar = game.add.sprite(60 * unit, 222 * unit, "sayBar");
        this.npcSaysBar.width = 602 * unit;
        this.npcSaysBar.height = 436 * unit;
        this.npcSaysBar.anchor.set(0);

        this.npcSaysTxt = game.add.text(340 * unit, 400 * unit, this.levelObj.failTips, TextStyle)
        this.npcSaysTxt.anchor.set(0.5)

        this.gameOverGroup.add(this.gameoverBg)
        this.gameOverGroup.add(this.gameovercloseBtn)
        this.gameOverGroup.add(this.overTitie)
        this.gameOverGroup.add(this.overscoreBar)
        this.gameOverGroup.add(this.overnum)
        this.gameOverGroup.add(this.backBtn)
        this.gameOverGroup.add(this.backBtnTxt)
        this.gameOverGroup.add(this.npcSaysBar)
        this.gameOverGroup.add(this.npcSaysTxt)
        this.gameOverGroup.add(this.submitBtn)
        this.gameOverGroup.add(this.submitBtnTxt)
        this.gameOverGroup.visible = false
        if (gameState.debug) {
            this.debugBtn = game.add.button(60, 645 * unit, "debugBtn", this.debugBtnClick, this)
            this.debugBtn.anchor.set(0.5, 0);
            this.debugBtn.width = 60;
            this.debugBtn.height = 60;
        }

        //元素全部创建完毕 可以开始游戏
        game.input.addMoveCallback(this.move, this);
        this.soundPlay("startSound")
        let that = this
        setTimeout(function() {
            that.startGame();
        }, 2000)
        gamePause = false
    }

    //游戏开始
    startGame() {
        // this.needscoreText.text = "" + this.levelObj.needScore;
        this.addBallTime = game.time.create(false);
        this.addBallTime.loop(this.levelObj.creatTime, this.addBall, this);
        gamePause = false
        this.addBallTime.start()
    }

    addBall() {
        let ballflower = playCofig.chance / this.level //花球出现的概率
        let gl = new GL({
            min: 0,
            max: 2,
            fenpei: new Map([
                [0, ballflower], //花球出现的概率
            ])
        });
        // game.world.width - 66 右边边界  
        let num = gl.random(); //球的出现是随机的 0为花球 其余为正常球
        let pic = num == 0 ? "flowerball" : "ball";
        this.ball = new Ball(game, game.rnd.between(66, game.world.width - 66), 280, pic, this.levelObj.fallSpeed);
        game.add.existing(this.ball);
        this.ballGroup.add(this.ball);
    }

    //暂停
    pauseClick() {
        if (gamePause) return
        clickbgm.play();
        this.addBallTime.pause()
        this.pauseGroup.visible = true
        gamePause = true
        game.physics.arcade.isPaused = true
    }

    //下一关
    continue () {
        this.levelUpSound.stop()
        clickbgm.play();
        this.level++;
        let levellist = JSON.parse(JSON.stringify(dataJson.levelList));
        if (this.level > levellist.length) {
            this.gameOver(true)
            return
        }
        this.levelObj = levellist[this.level - 1];
        this.needscoreText.text = "" + this.levelObj.needScore;
        this.levelUpGroup.visible = false
        game.physics.arcade.isPaused = false
        this.basket.x = game.world.centerX;
        this.fakeBasket.x = game.world.centerX;
        this.startGame()
    }
    //检测是否通关
    checkLevelup() {
        if (this.score >= this.levelObj.needScore) {
            this.soundPlay('levelUpSound')
            this.levelscoreText.text = "" + this.score;
            this.levelUpGroup.visible = true;
            this.topNpc.frame = this.levelObj.npcFrame;
            this.stopGame();
        }
    }

    //停止游戏
    stopGame() {
        this.addBallTime.stop()
        gamePause = true
        game.physics.arcade.isPaused = true
    }

    //游戏结束后的操作
    gameOver(last) {
        bgm.stop()
        if (last) {
            this.soundPlay('levelUpSound')
        } else {
            this.soundPlay('loseSound')
        }
        this.overscoreText.text = "" + this.score;
        this.npcSaysTxt.text = this.levelObj.failTips
        this.gameOverGroup.visible = true
        this.failBallArr = []
        this.failBallGroup.destroy()
        game.physics.arcade.isPaused = true
        this.ballGroup.destroy()
        gamePause = true
    }

    //暂停以后的继续游戏
    goonclick() {
        clickbgm.play();
        this.pauseGroup.visible = false;
        this.basket.x = game.world.centerX;
        this.fakeBasket.x = game.world.centerX;
        gamePause = false
        game.physics.arcade.isPaused = false
        this.addBallTime.resume()
    }

    //调试模式 调试按钮 强制通关
    debugBtnClick() {
        this.score = this.levelObj.needScore
        playCofig.fail = 3
        this.checkLevelup()
    }

    //篮筐跟随鼠标左右移动
    move(pointer, x, y) {
        if (y > this.bottomBg.y && !gamePause) {
            this.basket.x = x;
            this.fakeBasket.x = x;
        }
    }

    //声音控制
    bgmControl() {
        clickbgm.play();
        if (soundVolume == 1) {
            soundVolume = 0
            this.soundBtn.frame = 0
        } else if (soundVolume == 0) {
            soundVolume = 1
            this.soundBtn.frame = 1
        }
        bgm.volume = soundVolume
        clickbgm.volume = soundVolume
    }

    //声音播放
    soundPlay(e) {
        this[e].volume = soundVolume
        this[e].play()
    }

    crashBall(basket, ball) {
        this.soundPlay('shoot')
        if (ball.name == "flowerball") {
            this.score += 500
        } else if (ball.name == "ball") {
            this.score += 100
        }
        this.scoreText.text = "" + this.score;
        ball.destroy();
        this.checkLevelup()
    }

    update() {
        game.physics.arcade.overlap(this.ballGroup, this.fakeBasket, this.crashBall, null, this);
        if (!gamePause) {
            if (playCofig.fail <= 0) {
                this.gameOver(false)
            } else if (playCofig.fail == 1) {
                this.stars.frame = 2
                this.failBallArr[0].tileSprite.alpha = 1
                this.failBallArr[1].tileSprite.alpha = 0
                this.failBallArr[2].tileSprite.alpha = 0
            } else if (playCofig.fail == 2) {
                this.stars.frame = 1
                this.failBallArr[0].tileSprite.alpha = 1
                this.failBallArr[1].tileSprite.alpha = 1
                this.failBallArr[2].tileSprite.alpha = 0
            } else if (playCofig.fail == 3) {
                this.stars.frame = 0
                this.failBallArr[0].tileSprite.alpha = 1
                this.failBallArr[1].tileSprite.alpha = 1
                this.failBallArr[2].tileSprite.alpha = 1
            }

        }
    }
}