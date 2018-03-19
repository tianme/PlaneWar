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
var GameReset = (function (_super) {
    __extends(GameReset, _super);
    function GameReset() {
        var _this = _super.call(this) || this;
        _this.shape = new egret.Shape();
        _this.resetBtn = new egret.TextField();
        _this.gameStartEvent = new GameStartEvent(GameStartEvent.gameStartEvent);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    GameReset.prototype.onAddToStage = function () {
        this.shape.graphics.beginFill(0xcccccc, 1);
        this.shape.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        this.shape.graphics.endFill();
        this.addChild(this.shape);
        this.resetBtn.touchEnabled = true;
        this.resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle, this);
        var countScoreTextField = new egret.TextField();
        countScoreTextField.text = GameConfig.countScore.toString();
        countScoreTextField.textColor = 0x000000;
        countScoreTextField.x = this.stage.stageWidth / 2 - countScoreTextField.width / 2;
        countScoreTextField.y = this.stage.stageHeight * 0.4 + countScoreTextField.height / 2;
        this.addChild(countScoreTextField);
        this.resetBtn.text = '重新开始';
        this.resetBtn.textColor = 0x000000;
        // this.resetBtn.borderColor = 0x000000;
        // this.resetBtn.border = true;
        this.resetBtn.x = this.stage.stageWidth / 2 - this.resetBtn.width / 2;
        this.resetBtn.y = this.stage.stageHeight * 0.7 + this.resetBtn.height / 2;
        this.addChild(this.resetBtn);
    };
    GameReset.prototype.touchTapHandle = function () {
        console.log('reset');
        this.dispatchEvent(this.gameStartEvent);
    };
    GameReset.prototype.dispose = function () {
        this.resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle, this);
    };
    return GameReset;
}(egret.DisplayObjectContainer));
__reflect(GameReset.prototype, "GameReset");
