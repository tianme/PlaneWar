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
var GameStart = (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.startBtn = new egret.TextField();
        _this.gameStartEvent = new GameStartEvent(GameStartEvent.gameStartEvent);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    GameStart.prototype.onAddToStage = function () {
        this.shape.graphics.beginFill(0xcccccc, 1);
        this.shape.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.shape.graphics.endFill();
        this.addChild(this.shape);
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle, this);
        this.startBtn.text = '开始';
        this.startBtn.textColor = 0x000000;
        // this.resetBtn.borderColor = 0x000000;
        // this.resetBtn.border = true;
        this.startBtn.x = this.stage.stageWidth / 2 - this.startBtn.width / 2;
        this.startBtn.y = this.stage.stageHeight * 0.7 + this.startBtn.height / 2;
        this.addChild(this.startBtn);
    };
    GameStart.prototype.touchTapHandle = function () {
        console.log('开始');
        this.dispatchEvent(this.gameStartEvent);
    };
    GameStart.prototype.dispose = function () {
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle, this);
    };
    return GameStart;
}(egret.DisplayObjectContainer));
__reflect(GameStart.prototype, "GameStart");
