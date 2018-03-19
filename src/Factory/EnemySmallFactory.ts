class EnemySmallFactory extends AbstractFactory{
  constructor() {
    super();
  }
  createPlane():PlaneBase {
    // 通过enemySmallPool中拿enemySmall
    const enemySmall = Pool.enemySmallPool.shift();

    if(!enemySmall){
      // console.log('小飞机');
      return new EnemySmall();
    }
    return enemySmall;
  }
  createBullet():BulletBase {
    return null;
  }
}