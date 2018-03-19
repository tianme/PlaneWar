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
var EnemyCenterFactory = (function (_super) {
    __extends(EnemyCenterFactory, _super);
    function EnemyCenterFactory() {
        return _super.call(this) || this;
    }
    EnemyCenterFactory.prototype.createPlane = function () {
        var enemyCenter = Pool.enemyCenterPool.shift();
        if (!enemyCenter) {
            // console.log('中飞机');
            return new EnemyCenter();
        }
        return enemyCenter;
    };
    EnemyCenterFactory.prototype.createBullet = function () {
        return null;
    };
    return EnemyCenterFactory;
}(AbstractFactory));
__reflect(EnemyCenterFactory.prototype, "EnemyCenterFactory");
