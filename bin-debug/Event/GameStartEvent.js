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
 *
 * @class GameOverEvent
 * @extends {egret.Event}
 */
var GameStartEvent = (function (_super) {
    __extends(GameStartEvent, _super);
    function GameStartEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = true; }
        if (cancelable === void 0) { cancelable = false; }
        return _super.call(this, type, bubbles, cancelable) || this;
    }
    GameStartEvent.gameStartEvent = 'GameStartEvent';
    return GameStartEvent;
}(egret.Event));
__reflect(GameStartEvent.prototype, "GameStartEvent");
