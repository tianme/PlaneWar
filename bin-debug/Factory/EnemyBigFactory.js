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
var EnemyBigFactory = (function (_super) {
    __extends(EnemyBigFactory, _super);
    function EnemyBigFactory() {
        return _super.call(this) || this;
    }
    EnemyBigFactory.prototype.createPlane = function () {
        var enemyBig = Pool.enemyBigPool.shift();
        if (!enemyBig) {
            // console.log('大飞机');
            return new EnemyBig();
        }
        return enemyBig;
    };
    EnemyBigFactory.prototype.createBullet = function () {
        return null;
    };
    return EnemyBigFactory;
}(AbstractFactory));
__reflect(EnemyBigFactory.prototype, "EnemyBigFactory");
