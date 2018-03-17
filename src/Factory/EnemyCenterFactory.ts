class EnemyCenterFactory extends AbstractFactory{
  constructor() {
    super();
  }
  public createPlane():PlaneBase {
    const enemyCenter = Pool.enemyCenterPool.shift();
    if(!enemyCenter){
      return new EnemyCenter();
    }
    return enemyCenter;
  }
  public createBullet():BulletBase {
    return null;
  }
}