

class Hero extends PlaneBase implements IDispose {
  public life: number;
  private textureList: Array<egret.Texture>;
  private blowUpTextureList: Array<egret.Texture>;
  public hero: egret.Bitmap;
  private timer: egret.Timer;
  public distance: IStageInfo;
  public speed: number;
  public explodeTimer: egret.Timer;
  public planeType: PlaneType;
  constructor(armor: number) {
    super();
    const shp:egret.Shape= new egret.Shape();
    this.life = GameConfig.hero.life;
    this.state = PlaneState.existing;
    this.speed = 0;
    this.blowUpTextureList = new Array<egret.Texture>();
    this.planeType = PlaneType.general;
    this.init();
    this.addChild(this.hero);
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
  private onAddToStage(event: egret.TouchEvent): void {
    // 初始位置
    this.initPosition();
    // 切换
    this.toggleHeroAnimation();
    // 入场动画
    this.admissionAnimation(event);
  }
  /**
   * 初始化
   */
  private init(): void {
    // 初始化distance
    this.distance = {
      stageW: 0,
      stageH: 0,
      stageX: 0,
      stageY: 0,
    };
    // 初始化hero图片
    this.textureList = [];
    ['hero1', 'hero2'].forEach((item, index) => {
      this.textureList.push(Utils.createBitmapByName(item));
    });
    ['hero_blowup_n1','hero_blowup_n2','hero_blowup_n3','hero_blowup_n4'].forEach((item, index) => {
      this.blowUpTextureList.push(Utils.createBitmapByName(item));
    });
    this.explodeTimer = new egret.Timer(200, 4)
    this.hero = new egret.Bitmap();
    this.hero.texture = this.textureList[0];
    this.timer = new egret.Timer(GameConfig.hero.planeToggleTimeSpan, GameConfig.hero.planeToggleCount);
    this.width = this.hero.width;
    this.height = this.hero.height;
  }
  /**
   * 飞机的初始位置
   */
  private initPosition(): void {
    // 初始化飞机的位置
    const stageW = this.stage.stageWidth;
    const stageH = this.stage.stageHeight;
    const x = stageW / 2 - this.width / 2;
    this.x = x;
    this.y = stageH + this.width;
  }
  /**
   * 发送子弹
   *
   * @param {BulletBase} bullet
   * @memberof Hero
   */
  public emitBullet(bullet: BulletBase): void {
    bullet.x = this.x + this.width / 2 - bullet.width / 2;
    bullet.y = this.y + this.height / 2 - bullet.height / 2;
    if(this.parent){
      this.parent.addChild(bullet);
    }
    StageObjectCache.heroBulletCache.push(bullet);
    const heroBullet: ISound = bullet as HeroBullet;
    heroBullet.play();
    bullet.move(Direction.Up);
  }

  /**
   * 记录飞机与当前点击位置的距离
   *
   * @param {IStageInfo} stageInfo
   * @memberof Hero
   */
  public setDistance(stageInfo: IStageInfo): void {
    this.distance.stageX = stageInfo.stageX - this.x;
    this.distance.stageY = stageInfo.stageY - this.y;
  }

  /**
   * 入场动画
   *
   * @private
   * @param {egret.TouchEvent} event
   * @memberof Hero
   */
  private admissionAnimation(event: egret.TouchEvent): void {
    const stageH = this.stage.stageHeight;
    const y = 0.7 * stageH - this.height / 2;
    const heroInStageAnimationEnd = new HeroInStageAnimationEndEvent(
      HeroInStageAnimationEndEvent.heroInStageAnimationEnd,
    );
    const heroInStageRunBgEvent = new HeroInStageRunBgEvent(
      HeroInStageRunBgEvent.HeroInStageRunBgEvent,
    );
    egret.Tween.get(this)
      .to({y}, GameConfig.hero.inStageAnimationTime, egret.Ease.sineInOut)
      .call(() => {
        console.log('hero背景执行');
        // 动画结束发送事件
        this.dispatchEvent(heroInStageRunBgEvent);
      })
      .to({y: stageH - 200}, GameConfig.hero.inStageAnimationTimeEnd, egret.Ease.sineInOut)
      .call(() => {
        console.log('hero动画全部结束');
        this.dispatchEvent(heroInStageAnimationEnd);
      });
  }

  /**
   * 飞机移动
   *
   * @param {IStageInfo} stageInfo
   * @memberof Hero
   */
  public move(stageInfo: IStageInfo): void {
    const hero = this;
    const distance = this.distance;
    let x = stageInfo.stageX - distance.stageX;
    const xMax = stageInfo.stageW - hero.width + hero.width / 2;
    const xMin = 0 - hero.width / 2;
    x = x < xMax ? x : xMax;
    x = x < xMin ? xMin : x;
    let y = stageInfo.stageY - distance.stageY;
    const yMax = stageInfo.stageH - hero.height;
    const yMin = 0;
    y = y > yMax ? yMax : y;
    y = y > yMin ? y : yMin;
    hero.x = x;
    hero.y = y;
  }
  /**
   * 切换飞机图片。
   */
  private toggleHeroAnimation(): void {
    this.timer.addEventListener(
      egret.TimerEvent.TIMER,
      this.toggleHeroBitMap,
      this,
    );
    this.timer.start();
  }
  private toggleHeroBitMap(event: egret.TimerEvent): void {
    const current = (event.target as egret.Timer).currentCount;
    const index = current % 2;
    this.hero.texture = this.textureList[index];
  }
  public dispose(): void {
    console.log('hero.ts dispose');
    this.removeEventListener(
      egret.TimerEvent.TIMER,
      this.toggleHeroBitMap,
      this,
    );
    this.removeEventListener(
      egret.Event.ADDED_TO_STAGE,
      this.onAddToStage,
      this,
    );
    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);

  }
  public explode() {
    this.timer.stop();
    this.explodeTimer.addEventListener(egret.TimerEvent.TIMER, this.explodeHandle, this);
    this.explodeTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle, this);
    this.explodeTimer.start();
  }
  private explodeHandle(event: egret.TimerEvent):void {
    const current = (event.target as egret.Timer).currentCount;
    const index = current % 4;
    this.hero.texture = this.blowUpTextureList[index];
  }
  private timerCompleteHandle() {
    this.state = PlaneState.nonexistent;
    this.explodeTimer.removeEventListener(egret.TimerEvent.TIMER, this.explodeHandle, this);
    this.explodeTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle, this);
    this.dispose();
    if(this.parent){
      this.parent.removeChild(this);
    }
  }
  public reset() {

  }
}
