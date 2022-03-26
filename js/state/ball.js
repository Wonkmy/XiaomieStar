//下落球的构造
Ball = function(game, x, y, pic, level) {
    Phaser.Sprite.call(this, game, x, y, pic);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.width = 264 * unit;
    this.height = 280 * unit;
    this.body.velocity.y = game.rnd.between(level.min, level.max); //下落的速度
    this.body.acceleration.y = 0; //下落加速度
    this.anchor.set(0.5);
    this.name = pic;
};
Ball.prototype = Object.create(Phaser.Sprite.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.update = function() {
    if (this.y >= game.world.height) {
        if (playCofig.fail > 0) {
            playCofig.fail--;
        }
        this.destroy();
    }
}