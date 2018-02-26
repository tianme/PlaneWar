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
/**
 * Hero进入舞台事件
 *
 * @class HeroInStageRunBgEvent
 * @extends {egret.Event}
 */
var HeroInStageRunBgEvent = (function (_super) {
    __extends(HeroInStageRunBgEvent, _super);
    function HeroInStageRunBgEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = true; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    HeroInStageRunBgEvent.HeroInStageRunBgEvent = 'HeroInStageRunBgEvent';
    return HeroInStageRunBgEvent;
}(egret.Event));
__reflect(HeroInStageRunBgEvent.prototype, "HeroInStageRunBgEvent");
