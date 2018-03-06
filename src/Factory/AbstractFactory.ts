/**
 * 用于生产
 *
 * @class Factory
 */
abstract class AbstractFactory extends egret.DisplayObjectContainer {
  abstract createBullet(): BulletBase;
  abstract createPlane(): PlaneBase;
}

