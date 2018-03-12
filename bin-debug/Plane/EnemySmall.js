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
var EnemySmall = (function (_super) {
    __extends(EnemySmall, _super);
    function EnemySmall() {
        var _this = _super.call(this) || this;
        _this.init();
        _this.textureList = new Array();
        for (var i = 0; i < 4; i++) {
            var texture = Utils.createBitmapByName("enemy1_down" + (i + 1));
            _this.textureList.push(texture);
        }
        _this.small = new egret.Bitmap();
        // this.small.texture = Utils.createBitmapByName('enemy1');
        _this.addEventListener(egret.Event.ADDED, _this.addToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    EnemySmall.prototype.addToStage = function (event) {
        this.timer = new egret.Timer(200, 4);
        this.small.texture = Utils.createBitmapByName('enemy1');
        this.x = this.stage.width / 2 + this.width / 2;
        this.y = -this.height;
        this.addChild(this.small);
        // console.log('addEd');
        this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    };
    EnemySmall.prototype.emitBullet = function () { };
    EnemySmall.prototype.move = function () {
        this.y += this.speed;
    };
    EnemySmall.prototype.setDistance = function () { };
    EnemySmall.prototype.frameHandle = function () {
        this.move();
    };
    EnemySmall.prototype.explode = function () {
        // this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle, this);
        this.timer.start();
    };
    EnemySmall.prototype.timerHandle = function (event) {
        var current = event.target.currentCount;
        var index = current % 4;
        this.small.texture = this.textureList[index];
    };
    EnemySmall.prototype.timerCompleteHandle = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        // this.visible = false;
        // Pool.enemySmallPool.push(this);
        // console.log(Pool.enemySmallPool);
        this.state = PlaneState.nonexistent;
        this.dispose();
    };
    EnemySmall.prototype.dispose = function () {
        // console.log('enemySmall.ts dispose');
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        // this.removeEventListener(egret.Event.ADDED, this.addToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
        this.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        this.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle, this);
    };
    EnemySmall.prototype.init = function () {
        this.life = 1;
        this.speed = 6;
        this.state = PlaneState.existing;
        // this.visible = true;
    };
    EnemySmall.prototype.reset = function () {
        this.init();
    };
    return EnemySmall;
}(PlaneBase));
__reflect(EnemySmall.prototype, "EnemySmall", ["IDispose"]);
