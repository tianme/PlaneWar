var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Pool = (function () {
    function Pool() {
    }
    Pool.heroBulletPool = new Array();
    Pool.enemyBulletPool = new Array();
    Pool.enemySmallPool = new Array();
    Pool.enemyCenterPool = new Array();
    return Pool;
}());
__reflect(Pool.prototype, "Pool");
