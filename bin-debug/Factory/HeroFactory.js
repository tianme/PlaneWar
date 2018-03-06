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
 * hero工厂类
 * hero工厂类是一个单例类
 * @class HeroFactory
 * @extends {AbstractFactory}
 */
var HeroFactory = (function (_super) {
    __extends(HeroFactory, _super);
    function HeroFactory() {
        return _super.call(this) || this;
    }
    HeroFactory.getInstance = function () {
        if (this.singletonClass == null) {
            return new HeroFactory();
        }
        return this.singletonClass;
    };
    /**
     * 创建子弹
     *
     * @returns {BulletBase}
     * @memberof HeroFactory
     */
    HeroFactory.prototype.createBullet = function () {
        // 通过子弹pool中拿子弹
        var bullInstance = Pool.heroBulletPool.shift();
        // 如果没有子弹则创建子弹
        if (!bullInstance) {
            return new HeroBullet();
        }
        return bullInstance;
    };
    /**
     * 创建飞机
     *
     * @returns {PlaneBase}
     * @memberof HeroFactory
     */
    HeroFactory.prototype.createPlane = function () {
        return new Hero(1);
    };
    HeroFactory.singletonClass = null;
    return HeroFactory;
}(AbstractFactory));
__reflect(HeroFactory.prototype, "HeroFactory");
