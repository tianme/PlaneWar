class GameScene extends egret.DisplayObjectContainer implements IDispose {
  private hero: PlaneBase;
  private autoOpenFireTimer: egret.Timer;
  private heroFactory: AbstractFactory;
  private enemySmallFactory: AbstractFactory;
  private addEnemyTimer: egret.Timer;
  constructor() {
    super();
    this.heroFactory = HeroFactory.getInstance();
    this.enemySmallFactory = new EnemySmallFactory();
    this.autoOpenFireTimer = new egret.Timer(200, 0);
    this.addEnemyTimer = new egret.Timer(1000, 0);
    this.hero = this.heroFactory.createPlane();
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
  private addToStage() {
    this.addChild(this.hero);
    this.addEventListener(
      HeroInStageAnimationEndEvent.heroInStageAnimationEnd,
      this.heroInStageAnimationEndHandle,
      this,
    );
    this.addEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      this.touchBeginHandle,
      this,
    );
    this.addEventListener(
      egret.TouchEvent.TOUCH_END,
      this.touchEndHandle,
      this,
    );
  }
  private touchMove(event: egret.TouchEvent) {
    const stageInfo: IStageInfo = {
      stageW: this.stage.stageWidth,
      stageH: this.stage.stageHeight,
      stageX: event.stageX,
      stageY: event.stageY,
    };

    Utils.move(this.hero, stageInfo);
  }
  /**
   * hero自动开火
   *
   * @private
   * @memberof GameScene
   */
  private autoOpenFire() {
    this.autoOpenFireTimer.addEventListener(
      egret.TimerEvent.TIMER,
      this.autoAddBullet,
      this,
    );
    this.autoOpenFireTimer.start();
  }
  /**
   * hero自动添加子弹
   *
   * @private
   * @memberof GameScene
   */
  private autoAddBullet() {
    const bullet = this.heroFactory.createBullet();
    this.hero.emitBullet(bullet);
  }
  /**
   * 碰撞检测、子弹越界检测、敌机越界检测
   *
   * @private
   * @memberof GameScene
   */
  private detect() {
    this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
  }

  private heroInStageAnimationEndHandle(event: egret.Event) {
    event.stopImmediatePropagation();
    this.touchEnabled = true;
    this.autoOpenFire();
    // 开始检测
    this.detect();
    this.addEnemyPlane();

    // 删除监听事件
    this.removeEventListener(
      HeroInStageAnimationEndEvent.heroInStageAnimationEnd,
      this.heroInStageAnimationEndHandle,
      this,
    );
  }
  /**
   *
   *
   * @private
   * @memberof GameScene
   */
  private touchEndHandle() {
    this.stage.removeEventListener(
      egret.TouchEvent.TOUCH_MOVE,
      this.touchMove,
      this,
    );
  }
  /**
   * hero子弹碰撞检测事件的处理方法
   *
   * @private
   * @memberof GameScene
   */
  private frameHandle() {
    // 判断玩家子弹是否与敌人飞机碰撞
    StageObjectCache.heroBulletCache.forEach((item, index) => {
      // 判断当前子弹是否有父元素，如果没有，当前元素还没有被添加到舞台上，先不做处理。
      if (!item.parent) {
        return;
      }
      if (item.y <= 50) {
        Pool.heroBulletPool.push(item);
        StageObjectCache.heroBulletCache.splice(index, 1);
        this.removeChild(item);
        // 把item回收到heroBulletPool中
      }
      StageObjectCache.enemyCache.forEach((enemy, i) => {
        if (
          Utils.hitDetect(item, enemy) &&
          enemy.state === PlaneState.existing
        ) {
          enemy.state = PlaneState.dispose;
          if (item.parent) {
            item.parent.removeChild(item);
            Pool.heroBulletPool.push(item);
            StageObjectCache.heroBulletCache.splice(index, 1);
          }
          enemy.life -= item.power;
          if (enemy.life <= 0) {
            enemy.explode();
          }
        }
        // 判断玩家飞机是否与敌人飞机碰撞
        if (
          Utils.hitDetect(this.hero, enemy) &&
          enemy.state === PlaneState.existing &&
          this.hero.state === PlaneState.existing
        ) {
          enemy.state = this.hero.state = PlaneState.dispose;
          console.log('game over');
          this.dispose();

          enemy.explode();
          this.hero.explode();
        }
      });
    });
    let count: number = StageObjectCache.enemyCache.length;

    for (let i = 0; i < count; i++) {
      const enemy = StageObjectCache.enemyCache[i];
      if (
        enemy.y > this.stage.stageHeight + enemy.height
        || enemy.state === PlaneState.nonexistent
      ) {
        StageObjectCache.enemyCache.splice(i, 1);
        Pool.enemySmallPool.push(enemy);
        i--;
        enemy.reset();
        count--;

      }
    }
  }
  private randomRange(xMin: number, xMax: number) {
    return Math.floor(Math.random() * (xMax - xMin + 1) + xMin);
  }
  /**
   * 添加敌机
   *
   * @private
   * @memberof GameScene
   */
  private addEnemyPlane() {
    this.addEnemyTimer.addEventListener(
      egret.TimerEvent.TIMER,
      this.addEnemyTimerHandle,
      this,
    );
    this.addEnemyTimer.start();
  }
  private addEnemyTimerHandle() {
    const enemySmall = this.enemySmallFactory.createPlane();
    this.addChild(enemySmall);
    const xMin = 0 - enemySmall.width / 2;
    const xMax = this.stage.stageWidth - enemySmall.width / 2;
    enemySmall.x = this.randomRange(xMin, xMax);
    enemySmall.y = -enemySmall.height;
    StageObjectCache.enemyCache.push(enemySmall);
  }

  private touchBeginHandle(event: egret.TouchEvent) {
    const stageInfo: IStageInfo = {
      stageW: this.stage.stageWidth,
      stageH: this.stage.stageHeight,
      stageX: event.stageX,
      stageY: event.stageY,
    };
    this.hero.setDistance(stageInfo);
    this.stage.addEventListener(
      egret.TouchEvent.TOUCH_MOVE,
      this.touchMove,
      this,
    );
  }
  /**
   * 释放资源
   *
   * @memberof GameScene
   */
  public dispose() {
    this.removeEventListener(
      HeroInStageAnimationEndEvent.heroInStageAnimationEnd,
      this.heroInStageAnimationEndHandle,
      this,
    );
    this.removeEventListener(
      egret.TouchEvent.TOUCH_BEGIN,
      this.touchBeginHandle,
      this,
    );
    this.removeEventListener(
      egret.TouchEvent.TOUCH_END,
      this.touchEndHandle,
      this,
    );
    this.stage.removeEventListener(
      egret.TouchEvent.TOUCH_MOVE,
      this.touchMove,
      this,
    );
    this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.addEnemyTimer.removeEventListener(
      egret.TimerEvent.TIMER,
      this.addEnemyTimerHandle,
      this,
    );
    this.autoOpenFireTimer.removeEventListener(
      egret.TimerEvent.TIMER,
      this.autoAddBullet,
      this,
    );
    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
}
