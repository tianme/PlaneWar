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
var EnemyCenter = (function (_super) {
    __extends(EnemyCenter, _super);
    function EnemyCenter() {
        var _this = _super.call(this) || this;
        _this.planeType = PlaneType.centerType;
        _this.textureList = new Array();
        _this.init();
        _this.centerEnemy = new egret.Bitmap();
        _this.boom = Utils.createSoundByName('enemy2_down');
        _this.channelPosition = 0;
        [
            'enemy2_down1',
            'enemy2_down2',
            'enemy2_down3',
            'enemy2_down4',
        ].forEach(function (item) {
            var texture = Utils.createBitmapByName(item);
            _this.textureList.push(texture);
        });
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.AddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    EnemyCenter.prototype.init = function () {
        this.life = 3;
        this.speed = 4;
        this.state = PlaneState.existing;
    };
    EnemyCenter.prototype.AddToStage = function () {
        this.timer = new egret.Timer(200, 4);
        this.centerEnemy.texture = Utils.createBitmapByName('enemy2');
        this.x = this.stage.width / 2 - this.width / 2;
        this.y = -this.height;
        this.addChild(this.centerEnemy);
        this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
    };
    EnemyCenter.prototype.emitBullet = function () { };
    EnemyCenter.prototype.explode = function () {
        this.play();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle, this);
        this.timer.start();
    };
    EnemyCenter.prototype.move = function () {
        this.y += this.speed;
    };
    EnemyCenter.prototype.reset = function () {
        this.init();
    };
    EnemyCenter.prototype.setDistance = function () { };
    EnemyCenter.prototype.dispose = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
        this.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        this.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle, this);
    };
    EnemyCenter.prototype.play = function () {
        this.soundChannel = this.boom.play(this.channelPosition, 1);
        this.soundChannel.volume = 1;
    };
    EnemyCenter.prototype.stop = function () {
        if (!this.soundChannel) {
            return;
        }
        // 记录背景音乐播放的位置
        this.channelPosition = this.soundChannel.position;
        // 停止播放背景音乐
        this.soundChannel.stop();
    };
    EnemyCenter.prototype.frameHandle = function () {
        this.move();
    };
    EnemyCenter.prototype.timerHandle = function (event) {
        var current = event.target.currentCount;
        var index = current % 4;
        this.centerEnemy.texture = this.textureList[index];
    };
    EnemyCenter.prototype.timerCompleteHandle = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.state = PlaneState.nonexistent;
        this.dispose();
    };
    return EnemyCenter;
}(PlaneBase));
__reflect(EnemyCenter.prototype, "EnemyCenter", ["IDispose", "ISound"]);
