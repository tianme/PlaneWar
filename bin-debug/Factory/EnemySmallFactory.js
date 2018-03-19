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
var EnemySmallFactory = (function (_super) {
    __extends(EnemySmallFactory, _super);
    function EnemySmallFactory() {
        return _super.call(this) || this;
    }
    EnemySmallFactory.prototype.createPlane = function () {
        // 通过enemySmallPool中拿enemySmall
        var enemySmall = Pool.enemySmallPool.shift();
        if (!enemySmall) {
            // console.log('小飞机');
            return new EnemySmall();
        }
        return enemySmall;
    };
    EnemySmallFactory.prototype.createBullet = function () {
        return null;
    };
    return EnemySmallFactory;
}(AbstractFactory));
__reflect(EnemySmallFactory.prototype, "EnemySmallFactory");
