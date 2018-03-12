class EnemySmallFactory extends AbstractFactory{
  constructor() {
    super();
  }
  createPlane():PlaneBase {

    // 通过enemySmallPool中拿enemySmall
    const enemySmall = Pool.enemySmallPool.shift();
    // console.log(enemySmall)
    // const enemySmall = null;

    // 如果enemySmall则创建enemySmall

    if(!enemySmall){
      egret.log('test');
      return new EnemySmall();
    }
    return enemySmall;
  }
  createBullet():BulletBase {
    return null;
  }
}