/**
 * hero工厂类
 * hero工厂类是一个单例类
 * @class HeroFactory
 * @extends {AbstractFactory}
 */
class HeroFactory extends AbstractFactory {
  private static singletonClass: HeroFactory = null;
  private constructor() {
    super();
  }
  public static getInstance(): HeroFactory {
    if (this.singletonClass == null) {
      return new HeroFactory();
    }
    return this.singletonClass;
  }
  /**
   * 创建子弹
   *
   * @returns {BulletBase}
   * @memberof HeroFactory
   */
  public createBullet(): BulletBase {
    // 通过子弹pool中拿子弹
    const bullInstance = Pool.heroBulletPool.shift();
    // 如果没有子弹则创建子弹
    if(!bullInstance){
      return new HeroBullet();
    }
    return bullInstance;
  }
  /**
   * 创建飞机
   *
   * @returns {PlaneBase}
   * @memberof HeroFactory
   */
  public createPlane(): PlaneBase {
    return new Hero(1);
  }
}
