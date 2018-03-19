var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 配置信息
 * @class GameConfig
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    GameConfig.hero = {
        life: 1,
        planeToggleTimeSpan: 300,
        planeToggleCount: 0,
        inStageAnimationTime: 1000,
        inStageAnimationTimeEnd: 3000,
    };
    GameConfig.bg = {
        speed: 2,
    };
    GameConfig.countScore = 0;
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
