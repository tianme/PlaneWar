class BgContent extends egret.DisplayObjectContainer
  implements IDispose, ISound {
  private bgUp: egret.Bitmap;
  private bgDown: egret.Bitmap;
  private bgSound: egret.Sound;
  private soundChannel: egret.SoundChannel;
  private channelPosition: number;
  private config:IBG;
  constructor() {
    super();
    this.config = GameConfig.bg;
    this.bgUp = new egret.Bitmap();
    this.bgDown = new egret.Bitmap();
    this.channelPosition = 0;
    const texture = Utils.createBitmapByName('background');
    this.bgSound = Utils.createSoundByName('bgsound');
    this.bgUp.texture = texture;
    this.bgDown.texture = texture;

    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);

  }
  private onAddToStage() {
    const stageW = this.stage.stageWidth;
    const stageH = this.stage.stageHeight;
    this.bgUp.width = stageW;
    this.bgUp.height = stageH;
    this.bgUp.x = 0;
    this.bgUp.y = -stageH;
    this.bgDown.width = stageW;
    this.bgDown.height = stageH;
    this.bgDown.x = 0;
    this.bgDown.y = 0;
    this.addChild(this.bgUp);
    this.addChild(this.bgDown);
    this.play();
    this.touchEnabled = true;
    // this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchPlay,this);
  }
  public runBg(): void {
    this.addEventListener(egret.Event.ENTER_FRAME, this.moveBg, this);
  }
  private moveBg() {
    this.y += this.config.speed;
    if (this.y >= this.stage.stageHeight) {
      this.y = 0;
    }
  }
  public dispose() {
    this.removeEventListener(egret.Event.ENTER_FRAME, this.moveBg, this);
    this.removeEventListener(
      egret.Event.ADDED_TO_STAGE,
      this.onAddToStage,
      this,
    );
    // this.removeEventListener(egret.Event.REMOVED,this.touchPlay,this);
    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }

  public play() {
    this.soundChannel = this.bgSound.play(this.channelPosition, -1);

  }
  public stop() {
    if (!this.soundChannel) {
      return;
    }
    // 记录背景音乐播放的位置
    this.channelPosition = this.soundChannel.position;
    // 停止播放背景音乐
    console.log('stop');
    this.soundChannel.stop();
  }
  // private touchPlay() {
  //   this.play();
  //   this.touchEnabled = false;
  // }
}
