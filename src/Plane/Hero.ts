class Hero extends PlaneBase implements IDispose {
  public armor: number;
  private textureList: Array<egret.Texture>;
  public hero: egret.Bitmap;
  private timer: egret.Timer;
  public distance: IStageInfo;
  constructor(armor: number) {
    super();
    this.armor = armor;
    this.init();
    this.addChild(this.hero);
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    this.addEventListener(egret.Event.REMOVED, this.dispose, this);
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
    this.hero = new egret.Bitmap();
    this.hero.texture = this.textureList[0];
    this.timer = new egret.Timer(300, 0);
  }
  /**
   * 飞机的初始位置
   */
  private initPosition(): void {
    // 初始化飞机的位置
    const stageW = this.stage.stageWidth;
    const stageH = this.stage.stageHeight;
    const x = stageW / 2 - this.hero.width / 2;
    this.hero.x = x;
    this.hero.y = stageH + this.hero.width;
  }
  /**
   * 发送子弹
   *
   * @param {BulletBase} bullet
   * @memberof Hero
   */
  public emitBullet(bullet: BulletBase): void {}

  /**
   * 记录飞机与当前点击位置的距离
   *
   * @param {IStageInfo} stageInfo
   * @memberof Hero
   */
  public setDistance(stageInfo: IStageInfo): void {
    this.distance.stageX = stageInfo.stageX - this.hero.x;
    this.distance.stageY = stageInfo.stageY - this.hero.y;
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
    const y = 0.7 * stageH - this.hero.height / 2;
    const heroInStageAnimationEnd = new HeroInStageAnimationEndEvent(
      HeroInStageAnimationEndEvent.heroInStageAnimationEnd,
    );
    const heroInStageRunBgEvent = new HeroInStageRunBgEvent(
      HeroInStageRunBgEvent.HeroInStageRunBgEvent,
    );
    egret.Tween.get(this.hero)
      .to({y}, 1000, egret.Ease.sineInOut)
      .call(() => {
        console.log('hero背景执行');
        // 动画结束发送事件
        this.dispatchEvent(heroInStageRunBgEvent);
      })
      .to({y: stageH - 200}, 3000, egret.Ease.sineInOut)
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
    console.log('move');
    const hero = this.hero;
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
    this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
  }
}
