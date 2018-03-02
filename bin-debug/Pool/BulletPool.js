var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BulletPool = (function () {
    function BulletPool() {
    }
    BulletPool.heroBulletPool = new Array();
    BulletPool.enemyBulletPool = new Array();
    return BulletPool;
}());
__reflect(BulletPool.prototype, "BulletPool");
