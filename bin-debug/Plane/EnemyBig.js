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
var EnemyBig = (function (_super) {
    __extends(EnemyBig, _super);
    function EnemyBig() {
        var _this = _super.call(this) || this;
        _this.lifeCount = 12;
        _this.score = 6000;
        _this.init();
        _this.planeType = PlaneType.bigType;
        _this.textureList = new Array();
        _this.bigTextureList = new Array();
        for (var i = 0; i < 6; i++) {
            var texture = Utils.createBitmapByName("enemy3_down" + (i + 1));
            _this.textureList.push(texture);
        }
        ['enemy3_n1', 'enemy3_n2'].forEach(function (item) {
            var texture = Utils.createBitmapByName(item);
            _this.bigTextureList.push(texture);
        });
        _this.channelPosition = 0;
        _this.boom = Utils.createSoundByName('enemy3_down');
        _this.big = new egret.Bitmap();
        _this.addEventListener(egret.Event.ADDED, _this.addToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    EnemyBig.prototype.addToStage = function (event) {
        this.timer = new egret.Timer(200, 6);
        this.toggleTimer = new egret.Timer(300, 0);
        this.big.texture = this.bigTextureList[0];
        this.x = this.stage.width / 2 - this.width / 2;
        this.y = -this.height;
        this.addChild(this.big);
        this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.toggleTimer.addEventListener(egret.TimerEvent.TIMER, this.toggleTimerHandle, this);
        this.toggleTimer.start();
    };
    EnemyBig.prototype.toggleTimerHandle = function (event) {
        var current = event.target.currentCount;
        var index = current % 2;
        this.big.texture = this.bigTextureList[index];
    };
    EnemyBig.prototype.emitBullet = function () { };
    EnemyBig.prototype.move = function () {
        this.y += this.speed;
        if (this.life < this.lifeCount / 2) {
            this.toggleTimer.stop();
            this.big.texture = Utils.createBitmapByName('enemy3_hit');
        }
    };
    EnemyBig.prototype.setDistance = function () { };
    EnemyBig.prototype.frameHandle = function () {
        this.move();
    };
    EnemyBig.prototype.explode = function () {
        this.play();
        this.toggleTimer.stop();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.toggleTimer.removeEventListener(egret.TimerEvent.TIMER, this.toggleTimerHandle, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle, this);
        this.timer.start();
    };
    EnemyBig.prototype.timerHandle = function (event) {
        var current = event.target.currentCount;
        var index = current % 6;
        this.big.texture = this.textureList[index];
    };
    EnemyBig.prototype.timerCompleteHandle = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.state = PlaneState.nonexistent;
        this.dispose();
    };
    EnemyBig.prototype.dispose = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.toggleTimer.removeEventListener(egret.TimerEvent.TIMER, this.toggleTimerHandle, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
        this.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        this.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle, this);
    };
    EnemyBig.prototype.init = function () {
        this.life = this.lifeCount;
        this.speed = 3;
        this.state = PlaneState.existing;
    };
    EnemyBig.prototype.reset = function () {
        this.init();
    };
    EnemyBig.prototype.play = function () {
        this.soundChannel = this.boom.play(this.channelPosition, 1);
    };
    EnemyBig.prototype.stop = function () {
        if (!this.soundChannel) {
            return;
        }
        // 记录背景音乐播放的位置
        this.channelPosition = this.soundChannel.position;
        // 停止播放背景音乐
        this.soundChannel.stop();
    };
    return EnemyBig;
}(PlaneBase));
__reflect(EnemyBig.prototype, "EnemyBig", ["IDispose", "ISound"]);
