class HeroBullet extends BulletBase implements ISound, IDispose {
  public speed: number;
  public power: number;
  private bulletSound: egret.Sound;
  private bullet: egret.Bitmap;
  private channelPosition: number;
  private soundChannel: egret.SoundChannel;
  private direction: Direction;

  constructor() {
    super();
    this.speed = 12;
    this.power = 1;
    this.channelPosition = 0;
    this.bullet = new egret.Bitmap();
    this.bullet.texture = Utils.createBitmapByName('bullet2');
    this.bulletSound = Utils.createSoundByName('bullet');
    this.width = this.bullet.width;
    this.height = this.bullet.height;
    this.addChild(this.bullet);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
  public play(): void {
    this.bulletSound.play(this.channelPosition, 1);
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
  public move(direction: Direction): void {
    this.direction = direction;
    this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
  }
  private frameHandle() {
    switch (this.direction) {
      case Direction.Up:
        this.y -= this.speed;
        break;
      case Direction.Down:
        this.y += this.speed;
        break;
      default:
        break;
    }
  }
  public dispose() {
    // console.log('bullet.ts dispose');
    this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
  }
}
