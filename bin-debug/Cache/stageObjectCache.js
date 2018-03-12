var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var StageObjectCache = (function () {
    function StageObjectCache() {
    }
    StageObjectCache.heroBulletCache = new Array();
    StageObjectCache.enemyCache = new Array();
    return StageObjectCache;
}());
__reflect(StageObjectCache.prototype, "StageObjectCache");
