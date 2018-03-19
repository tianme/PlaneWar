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
var BgContent = (function (_super) {
    __extends(BgContent, _super);
    function BgContent() {
        var _this = _super.call(this) || this;
        _this.config = GameConfig.bg;
        _this.bgUp = new egret.Bitmap();
        _this.bgDown = new egret.Bitmap();
        _this.channelPosition = 0;
        var texture = Utils.createBitmapByName('background');
        _this.bgSound = Utils.createSoundByName('bgsound');
        _this.bgUp.texture = texture;
        _this.bgDown.texture = texture;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    BgContent.prototype.onAddToStage = function () {
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        this.bgUp.width = stageW;
        this.bgUp.height = stageH;
        this.bgUp.x = 0;
        this.bgUp.y = -stageH;
        this.bgDown.width = stageW;
        this.bgDown.height = stageH;
        this.bgDown.x = 0;
        this.bgDown.y = 0;
        this.addChild(this.bgUp);
        this.addChild(this.bgDown);
        this.play();
        this.touchEnabled = true;
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchPlay,this);
    };
    BgContent.prototype.runBg = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.moveBg, this);
    };
    BgContent.prototype.moveBg = function () {
        this.y += this.config.speed;
        if (this.stage && this.y >= this.stage.stageHeight) {
            this.y = 0;
        }
    };
    BgContent.prototype.dispose = function () {
        this.stop();
        this.removeEventListener(egret.Event.ENTER_FRAME, this.moveBg, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
    };
    BgContent.prototype.play = function () {
        this.soundChannel = this.bgSound.play(this.channelPosition, -1);
        this.soundChannel.volume = .3;
    };
    BgContent.prototype.stop = function () {
        if (!this.soundChannel) {
            return;
        }
        // 记录背景音乐播放的位置
        this.channelPosition = this.soundChannel.position;
        // 停止播放背景音乐
        console.log('stop');
        this.soundChannel.stop();
    };
    return BgContent;
}(egret.DisplayObjectContainer));
__reflect(BgContent.prototype, "BgContent", ["IDispose", "ISound"]);
