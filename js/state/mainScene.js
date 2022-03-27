class mainScene {
    create() {
        this.bottomBg = game.add.sprite(0, 0, 'bottomBg');
        this.bottomBg.width = gameConfig.width;
        this.bottomBg.height = gameConfig.height;
        this.bottomBg.inputEnabled = true;

        this.cellBg = game.add.sprite(0, 150, 'cellbg');
        this.cellBg.width = 1440 * unit;
        this.cellBg.height =1488 * unit;
        this.cellBg.inputEnabled = true;

        //随机显示一只猫
        let random=this.myrandom(1,5);
        this.cat = game.add.sprite(gameConfig.width/2-100, gameConfig.height/2+210, 'cat'+random);
        this.cat.width = 470* unit;
        this.cat.height = 660* unit;
        this.cat.inputEnabled = true;
        //随机显示一只猫结束

        

        //显示左上角的金币数背景图
        this.popup = game.add.sprite(20, 10, 'popup_2');
        this.popup.width = 372* unit;
        this.popup.height = 120* unit;
        this.popup.inputEnabled = true;
        //显示左上角的鱼数背景图
        this.popup1 = game.add.sprite(452*unit, 10, 'popup_2');
        this.popup1.width = 372* unit;
        this.popup1.height = 120* unit;
        this.popup1.inputEnabled = true;
        //显示金币
        this.coin = game.add.sprite(20, 10, 'y2');
        this.coin.width = 180* unit;
        this.coin.height = 180* unit;
        this.coin.inputEnabled = true;
        //设置金币的父物体为popup(金币数背景图)
        this.coin.parent=this.popup;
        //显示鱼背景图
        this.fish = game.add.sprite(20, 10, 'y1');
        this.fish.width = 180* unit;
        this.fish.height = 180* unit;
        this.fish.inputEnabled = true;
        //设置鱼的父物体为popup1(鱼背景图)
        this.fish.parent=this.popup1;

        //创建分数文本物体
        this.scoreText = this.add.text(135, 25, '0', { fontSize: '55px', fill: '#fff' });
        //设置文本父物体
        this.scoreText.parent=this.popup;

        this.wn = 8;
        this.hn = 8;
        this.allStar = [];  //星星元素数列

        this.star_img_name1 = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8"];
        this.star_img_name2 = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8"];
        this.box_none = -1;
        this.box1 = 0;
        this.box2 = 1;
        this.box3 = 2;
        this.box4 = 3;
        this.box5 = 4;
        this.box6 = 5;
        this.box7 = 6;
        this.box8 = 7;  //星星类型，对应上面的图片名
        //var ST_NONE = -1, ST_RED = 0, ST_PURPLE = 1, ST_GREEN = 2, ST_BLUE = 3, ST_YELLOW = 4;  //星星类型，对应上面的图片名
        this.starType = [];  //每个位置的星星类型，值取上面

        this.wipeX = [];
        this.wipeY = []; //选择一个星星后与之相连的星星位置
        this.dx = [1, 0, -1, 0];
        this.dy = [0, 1, 0, -1];
        this.visited = [];  //位置访问标记

        //this.musicNode, bgMusicNode, musicOn, score;  //音频元素, 音效开关, 分数
        this.canOpera=false;  //可操作标志

        this.connectX = [];
        this.connectY = [];  //记录连在一起数量最多的星星
        this.timer=0;  //提示可消去星星的定时器

        this.level=0;
        this.score=0;
        this.goalScore=0;  //关数, 分数, 目标分数

        //初始化为二维数组
        for (var i = 0; i < this.hn; ++i) {
            this.starType[i] = [];
            this.visited[i]=[];
            this.allStar[i]=[];
        }

        this.gameInit();

    }
    myrandom(lower, upper) {
        return Math.floor(Math.random() * (upper - lower)) + lower;
    }
    gameInit() {
        this.goalScore = 1000;
        for (var x = 0; x < this.hn; ++x) {
             for (var y = 0; y < this.wn; ++y) {
                this.starType[x][y] = parseInt(Math.random() * 999999999) % 7;
                this.initStar(x,y);
            }
        }

        //this.starType=this.revertArray(this.starType);

        console.log(this.starType);
        this.canOpera = true;
        //timer = null;
        //startTimer();
    }
<<<<<<< HEAD

    revertArray(arr1) {
        var newArray = arr1[0].map(function (col, i) {
            return arr1.map(function (row) {
                return row[i];
            })
        });
        return newArray;
=======
    //反转二维数组方法
    revertArray(arr){
        var len=arr.length
        var newArr=[[],[],[],[]]

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                newArr[j][len-1-i]=arr[i][j]
            }
        }
        return newArr
>>>>>>> 772ed951854fb5283b3bc435ac0f67a315356e8e
    }
    
    initStar(x, y) {
        if (this.starType[x][y] !== -1) {
            this.boxCell = game.add.sprite(x * 85 + 20, y * 85 + 165, this.star_img_name2[this.starType[x][y]])
            this.boxCell.width = 80;
            this.boxCell.height = 80;
            this.boxCell.inputEnabled = true;
            let that=this;
            this.boxCell.events.onInputDown.add(function (sprite, pointer) {
                that.selectDown(sprite);
            })
            this.boxCell.data.id_x=x;
            this.boxCell.data.id_y=y;
            this.boxCell.data.type=this.starType[x][y];
            this.allStar[x][y]=this.boxCell;
        }
    }
    //刷新星星矩阵
    refreshStar(x,y){
        this.allStar[x][y].destroy();
        this.initStar(x,y);
    }
    //玩家点击一个星星
    selectDown(star_spr) {
        if (!this.canOpera) {
            return false;
        }

        let new_x = star_spr.data.id_x
        let new_y = star_spr.data.id_y
        // console.log(new_x+" : "+new_y);
        if (this.starType[new_x][new_y] !== this.box_none) {
            this.selectWipe(new_x, new_y);  // 搜索与之相连的星星
            this.destroyStar();
            let that= this;
            setTimeout(function () {
                this.canOpera = false;
                //wipeStar();
                this.canOpera = true;

                if (that.IsConnect()) {
                    //startTimer();
                } else {
                    that.gameOver();
                }
            }, 150);
        }
        return true;
    }

    gameOver() {
        if (this.score < this.goalScore) {
            this.canOpera = false;
            this.overBg = game.add.sprite(20, 10, 'bg2');
            this.overBg.width = 372* unit;
            this.overBg.height = 120* unit;
            this.overBg.inputEnabled = true;
        } else {
            // nextLevel();
        }
    }

    IsConnect() {
        for (var x = 0; x < this.hn; ++x) {
            for (var y = 0; y < this.wn; ++y) {
                if (this.starType[x][y] !== -1) {
                    for (var i = 0; i < 2; ++i) {
                        var nx = x + this.dx[i], ny = y + this.dy[i];
                        if (nx >= 0 && nx < this.hn && ny >= 0 && ny < this.wn
                            && !this.visited[nx][ny] && this.starType[x][y] === this.starType[nx][ny]) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    //删除星星
    destroyStar(){
        var len = this.wipeX.length;
        if (len >= 2) {
            for (var i = 0; i < len; ++i) {
                this.starType[this.wipeX[i]][this.wipeY[i]] = this.box_none;
                this.allStar[this.wipeX[i]][this.wipeY[i]].destroy();
                this.visited[this.wipeX[i]][this.wipeY[i]] = false;  //恢复访问标记
            }

            // if (musicOn) {
            //     musicNode.currentTime = 0;
            //     musicNode.play();
            // }

            this.addScore(len);
            this.moveStar();
            //this.starType=this.revertArray(this.starType);
        }
        else {
            for (var i = 0; i < len; ++i) {
                this.visited[this.wipeX[i]][this.wipeY[i]] = false;  //恢复访问标记
            }
        }
        this.wipeX.length = this.wipeY.length = 0;  //清空数组
    }

    //搜索与点击的星星相连的星星
    selectWipe(x, y) {
        this.wipeX.push(x);
        this.wipeY.push(y);
        this.visited[x][y] = true;

        for (var i = 0; i < 4; ++i) {
            var nx = x + this.dx[i], ny = y + this.dy[i];
            if (nx >= 0 && nx < this.hn && ny >= 0 && ny < this.wn && !this.visited[nx][ny] && this.starType[x][y] === this.starType[nx][ny]) {
                this.selectWipe(nx, ny);
            }
        }
    }

    //向下移动所有星星
    moveDown(y) {
        var x1 = this.hn - 1;//7
        for (var x2 = x1; x2 >= 0; --x2) {
            if (this.starType[x2][y] !== this.box_none) {
                this.starType[x1][y] = this.starType[x2][y];
                --x1;//6
            }
        }
        for (; x1 >= 0; --x1) {
            this.starType[x1][y] = this.box_none;
        }
    }

    //向左移动所有星星
    moveLeft(y) {
        var y1 = y;
        for (var y2 = y1; y2 < this.wn; ++y2) {
            if (this.starType[this.hn - 1][y2] !== this.box_none) {
                if (y1 != y2) {
                    for (var x = 0; x < this.hn; ++x) {
                        this.starType[x][y1] = this.starType[x][y2];
                    }
                }
                ++y1;
            }
        }
        for (; y1 < this.wn; ++y1) {
            for (var x = 0; x < this.wn; ++x) {
                this.starType[x][y1] = this.box_none;
            }
        }
    }

    moveStar() {
        var isY = [], leftY = this.wn;
        for (var i = 0, len = this.wipeY.length; i < len; ++i) {
            isY[this.wipeY[i]] = true;
            if (this.wipeY[i] < leftY) {
                leftY = this.wipeY[i];
            }
        }
        //下移
        for (var y = 0; y < this.wn; ++y) {
            if (isY[y]) {
                this.moveDown(y);
            }
        }
        //左移
        this.moveLeft(leftY);

        
        for (var x = 0; x < this.hn; ++x) {
            for (var y = 0; y < this.wn; ++y) {
                //移动完之后重新刷新矩阵
                this.refreshStar(x,y);
            }
        }
        
    }
    addScore(len) {
        
        var s = 5 * len * len;
        this.scoreText.setText(this.score+=s);
    }

    playAudio(name){
        if(this.audio==null){
            this.audio = game.add.sound(name, soundVolume, true);
            this.audio.play();
        }else{
            this.audio.play();
        }
    }
}