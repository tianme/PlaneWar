class EnemySmallFactory extends AbstractFactory{
  constructor() {
    super();
  }
  createPlane():PlaneBase {
    // 通过enemySmallPool中拿enemySmall
    const enemySmall = Pool.enemySmallPool.shift();

    if(!enemySmall){
      return new EnemySmall();
    }
    return enemySmall;
  }
  createBullet():BulletBase {
    return null;
  }
}