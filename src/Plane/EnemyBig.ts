class EnemyBig extends PlaneBase implements IDispose, ISound {
  public life: number;
  private big: egret.Bitmap;
  public speed: number;
  private timer: egret.Timer;
  private toggleTimer: egret.Timer;
  private textureList: Array<egret.Texture>;
  private channelPosition: number;
  private soundChannel: egret.SoundChannel;
  private direction: Direction;
  private boom: egret.Sound;
  public planeType: PlaneType;
  private bigTextureList: Array<egret.Texture>;
  private lifeCount: number;
  public score: number;
  constructor() {
    super();
    this.lifeCount = 12;
    this.score = 6000;
    this.init();
    this.planeType = PlaneType.bigType;
    this.textureList = new Array<egret.Texture>();
    this.bigTextureList = new Array<egret.Texture>();

    for (let i = 0; i < 6; i++) {
      const texture = Utils.createBitmapByName(`enemy3_down${i + 1}`);
      this.textureList.push(texture);
    }

    ['enemy3_n1', 'enemy3_n2'].forEach(item => {
      const texture = Utils.createBitmapByName(item);
      this.bigTextureList.push(texture);
    });

    this.channelPosition = 0;
    this.boom = Utils.createSoundByName('enemy3_down');
    this.big = new egret.Bitmap();
    this.addEventListener(egret.Event.ADDED, this.addToStage, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
  private addToStage(event: egret.Event) {
    this.timer = new egret.Timer(200, 6);
    this.toggleTimer = new egret.Timer(300, 0);
    this.big.texture = this.bigTextureList[0];
    this.x = this.stage.width / 2 - this.width / 2;
    this.y = -this.height;
    this.addChild(this.big);
    this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.toggleTimer.addEventListener(
      egret.TimerEvent.TIMER,
      this.toggleTimerHandle,
      this,
    );
    this.toggleTimer.start();
  }
  private toggleTimerHandle(event: egret.Event) {
    const current = (event.target as egret.Timer).currentCount;
    const index = current % 2;
    this.big.texture = this.bigTextureList[index];
  }
  public emitBullet() {}
  public move() {
    this.y += this.speed;
    if (this.life < this.lifeCount / 2) {
      this.toggleTimer.stop();
      this.big.texture = Utils.createBitmapByName('enemy3_hit');
    }
  }
  public setDistance() {}
  private frameHandle() {
    this.move();
  }
  public explode() {
    this.play();
    this.toggleTimer.stop();
    this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.toggleTimer.removeEventListener(
      egret.TimerEvent.TIMER,
      this.toggleTimerHandle,
      this,
    );
    this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
    this.timer.addEventListener(
      egret.TimerEvent.TIMER_COMPLETE,
      this.timerCompleteHandle,
      this,
    );
    this.timer.start();
  }
  private timerHandle(event: egret.TimerEvent) {
    const current = (event.target as egret.Timer).currentCount;
    const index = current % 6;
    this.big.texture = this.textureList[index];
  }
  private timerCompleteHandle() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.state = PlaneState.nonexistent;
    this.dispose();
  }
  public dispose() {

    this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.toggleTimer.removeEventListener(
      egret.TimerEvent.TIMER,
      this.toggleTimerHandle,
      this,
    );
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
  private init() {
    this.life = this.lifeCount;
    this.speed = 3;
    this.state = PlaneState.existing;
  }
  public reset() {
    this.init();
  }
  public play() {
    this.soundChannel = this.boom.play(this.channelPosition, 1);
  }
  public stop() {
    if (!this.soundChannel) {
      return;
    }
    // 记录背景音乐播放的位置
    this.channelPosition = this.soundChannel.position;
    // 停止播放背景音乐
    this.soundChannel.stop();
  }
}
