var playCofig = {
    fail: 3, //接不到球的次数
    chance: 0.1, //花球出现的基础概率 这是初始概率 会随着关卡的提升近一步降低  概率公式：0.1/当前关卡
}

var gameState = {
    debug: true,
    ads: false,
    adsString: 'google.com, pub-7659809714958788, DIRECT, f08c47fec0942fa0', //广告代码
    url: 'http://myarcadeonlinegames.com/', //没有广告代码跳转的网页
    moreUrl: 'http://myarcadeonlinegames.com/', //首页更多游戏按钮
    txtUrl: './ads.txt', //网站文本地址
}