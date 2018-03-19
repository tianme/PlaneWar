class EnemyCenterFactory extends AbstractFactory{
  constructor() {
    super();
  }
  public createPlane():PlaneBase {
    const enemyCenter = Pool.enemyCenterPool.shift();
    if(!enemyCenter){
      // console.log('中飞机');
      return new EnemyCenter();
    }
    return enemyCenter;
  }
  public createBullet():BulletBase {
    return null;
  }
}