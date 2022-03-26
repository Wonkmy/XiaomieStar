class menu {
    constructor() {}

    preload() {

    }

    create() {
        // 背景
        this.bg = game.add.sprite(0, 0, 'loadbg');
        this.bg.width = gameConfig.width;
        this.bg.height = gameConfig.height;
        // 标题
        var title = game.add.image(game.world.centerX, 70, 'title');
        title.width = 1440 * unit;
        title.height = 700 * unit;
        title.anchor.set(0.5, 0);
        // 开始游戏
        var startGame = game.add.button(game.world.centerX, 780 * unit, 'startBtn', this.startGameClick, this);
        startGame.width = 376 * unit;
        startGame.height = 376 * unit;
        startGame.anchor.set(0.5, 0);
        //主页少女
        // var girl = game.add.image(544 * unit, 1142 * unit, 'girl');
        // girl.width = 550 * unit;
        // girl.height = 1280 * unit;
        // girl.anchor.set(0);
        bgm.play()
    };

    startGameClick() {
        clickbgm = game.add.audio('click', soundVolume);
        clickbgm.play();
        let that = this
        setTimeout(function() {
            if (!gameState.debug) {
                if (gameState.ads) {
                    game.state.start('mainScene');
                } else {
                    that.createAdsModal()
                }
            } else {
                game.state.start('mainScene');
            }
        }, 1000);
    };

    createAdsModal() {
        this.AdsGroup = game.add.group()
        this.AdsBg = game.add.sprite(game.world.centerX, 810 * unit, "modalBg");
        this.AdsBg.width = 1090 * unit;
        this.AdsBg.height = 1200 * unit;
        this.AdsBg.anchor.set(0.5, 0);
        let style = { font: "30px serif", fill: "#db6600", align: "center", fontWeight: "bold", wordWrap: true, wordWrapWidth: 400 }

        this.adsText = game.add.text(game.world.centerX, 970 * unit, "Please include" + gameState.adsString + " in your ads.txt file to remove this reminder.", style)
        this.adsText.anchor.set(0.5, 0)

        this.continueBtn = game.add.button(game.world.centerX, 1640 * unit, "button", function() {
            window.location.href = gameState.url
        }, this)
        this.continueBtn.anchor.set(0.5, 0);
        this.continueBtn.width = 646 * unit;
        this.continueBtn.height = 172 * unit;
        this.continueBtnTxt = game.add.text(this.continueBtn.x, this.continueBtn.y + 43, 'CONTINUE', btnStyle);
        this.continueBtnTxt.anchor.set(0.5);

        this.AdsGroup.add(this.AdsBg)
        this.AdsGroup.add(this.continueBtn)
        this.AdsGroup.add(this.continueBtnTxt)
    }
};