class EnemyBigFactory extends AbstractFactory{
  constructor() {
    super();
  }
  public createPlane():PlaneBase {
    const enemyBig = Pool.enemyBigPool.shift();
    if(!enemyBig){
      // console.log('大飞机');
      return new EnemyBig();
    }
    return enemyBig;
  }
  public createBullet():BulletBase {
    return null;
  }
}