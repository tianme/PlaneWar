var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var HeroBullet = (function (_super) {
    __extends(HeroBullet, _super);
    function HeroBullet() {
        var _this = _super.call(this) || this;
        _this.speed = 12;
        _this.power = 1;
        _this.channelPosition = 0;
        _this.bullet = new egret.Bitmap();
        _this.bullet.texture = Utils.createBitmapByName('bullet2');
        _this.bulletSound = Utils.createSoundByName('bullet');
        _this.width = _this.bullet.width;
        _this.height = _this.bullet.height;
        _this.addChild(_this.bullet);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    HeroBullet.prototype.play = function () {
<<<<<<< HEAD
        this.bulletSound.play(this.channelPosition, 1);
=======
        this.soundChannel = this.bulletSound.play(this.channelPosition, 1);
        this.soundChannel.volume = 0.1;
>>>>>>> master
    };
    HeroBullet.prototype.stop = function () {
        if (!this.soundChannel) {
            return;
        }
        // 记录背景音乐播放的位置
        this.channelPosition = this.soundChannel.position;
        // 停止播放背景音乐
        this.soundChannel.stop();
    };
    HeroBullet.prototype.move = function (direction) {
        this.direction = direction;
        this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    };
    HeroBullet.prototype.frameHandle = function () {
        switch (this.direction) {
            case Direction.Up:
                this.y -= this.speed;
                break;
            case Direction.Down:
                this.y += this.speed;
                break;
            default:
                break;
        }
    };
    HeroBullet.prototype.dispose = function () {
        // console.log('bullet.ts dispose');
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
    };
    return HeroBullet;
}(BulletBase));
__reflect(HeroBullet.prototype, "HeroBullet", ["ISound", "IDispose"]);
