class EnemyCenter extends PlaneBase implements IDispose, ISound {
  public life: number;
  public speed: number;
  public planeType: PlaneType;
  private centerEnemy: egret.Bitmap;
  private textureList: Array<egret.Texture>;
  private timer: egret.Timer;
  private boom: egret.Sound;
  private channelPosition: number;
  private soundChannel: egret.SoundChannel;
  private lifeCount:number;
  public score: number
  constructor() {
    super();
    this.lifeCount = 4;
    this.planeType = PlaneType.centerType;
    this.score = 2000;
    this.textureList = new Array<egret.Texture>();
    this.init();
    this.centerEnemy = new egret.Bitmap();
    this.boom = Utils.createSoundByName('enemy2_down');

    this.channelPosition = 0;
    ['enemy2_down1', 'enemy2_down2', 'enemy2_down3', 'enemy2_down4'].forEach(
      item => {
        const texture = Utils.createBitmapByName(item);
        this.textureList.push(texture);
      },
    );
    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.AddToStage, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
  private init() {
    this.life = this.lifeCount;
    this.speed = 4;
    this.state = PlaneState.existing;
  }
  private AddToStage(): void {
    this.timer = new egret.Timer(200, 4);
    this.centerEnemy.texture = Utils.createBitmapByName('enemy2');
    this.x = this.stage.width / 2 - this.width / 2;
    this.y = -this.height;
    this.addChild(this.centerEnemy);
    this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
  public emitBullet(): void {}
  public explode(): void {
    this.play();
    this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
    this.timer.addEventListener(
      egret.TimerEvent.TIMER_COMPLETE,
      this.timerCompleteHandle,
      this,
    );
    this.timer.start();
  }
  public move(): void {
    this.y += this.speed;
    if(this.life< this.lifeCount/2){
      this.centerEnemy.texture = Utils.createBitmapByName('enemy2_hit');
    }
  }
  public reset(): void {
    this.init();
  }
  public setDistance(): void {}
  public dispose(): void {
    this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.removeEventListener(
      egret.Event.REMOVED_FROM_STAGE,
      this.dispose,
      this,
    );
    this.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
    this.removeEventListener(
      egret.TimerEvent.TIMER_COMPLETE,
      this.timerCompleteHandle,
      this,
    );
  }
  public play(): void {
    this.soundChannel = this.boom.play(this.channelPosition, 1);
    this.soundChannel.volume = 1;
  }
  public stop(): void {
    if (!this.soundChannel) {
      return;
    }
    // 记录背景音乐播放的位置
    this.channelPosition = this.soundChannel.position;
    // 停止播放背景音乐
    this.soundChannel.stop();
  }
  private frameHandle() {
    this.move();
  }
  private timerHandle(event: egret.TimerEvent) {
    const current = (event.target as egret.Timer).currentCount;
    const index = current % 4;
    this.centerEnemy.texture = this.textureList[index];
  }
  private timerCompleteHandle() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.state = PlaneState.nonexistent;
    this.dispose();
  }
}
