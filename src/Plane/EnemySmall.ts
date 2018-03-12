class EnemySmall extends PlaneBase implements IDispose,ISound {
  public life: number;
  private small: egret.Bitmap;
  public speed: number;
  private timer: egret.Timer;
  private textureList: Array<egret.Texture>;
  private channelPosition: number;
  private soundChannel: egret.SoundChannel;
  private direction: Direction;
  private boom: egret.Sound;
  constructor() {
    super();
    this.init();
    this.textureList = new Array<egret.Texture>();
    for (let i = 0; i < 4; i++) {
      const texture = Utils.createBitmapByName(`enemy1_down${i + 1}`);
      this.textureList.push(texture);
    }
    this.channelPosition = 0;
    this.boom = Utils.createSoundByName('enemy1_down');
    this.small = new egret.Bitmap();
    this.addEventListener(egret.Event.ADDED, this.addToStage, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
  private addToStage(event: egret.Event) {
    this.timer = new egret.Timer(200, 4);
    this.small.texture = Utils.createBitmapByName('enemy1');
    this.x = this.stage.width / 2 + this.width / 2;
    this.y = -this.height;
    this.addChild(this.small);
    this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
  }
  public emitBullet() {}
  public move() {
    this.y += this.speed;
  }
  public setDistance() {}
  private frameHandle() {
    this.move();
  }
  public explode() {
    this.play();
    this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
    this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle,this);
    this.timer.start();

  }
  private timerHandle(event: egret.TimerEvent) {
    const current = (event.target as egret.Timer).currentCount;
    const index = current % 4;
    this.small.texture = this.textureList[index];
  }
  private timerCompleteHandle() {
    if(this.parent){
      this.parent.removeChild(this);
    }
    this.state = PlaneState.nonexistent;
    this.dispose();
  }
  public dispose() {
    this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
    this.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
    this.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerCompleteHandle,this);
  }
  private init() {
    this.life = 1;
    this.speed = 6;
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
