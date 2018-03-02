class HeroBullet extends BulletBase implements ISound {
  public speed: number;
  public power: number;
  private bulletSound: egret.Sound;
  private bullet: egret.Bitmap;
  private channelPosition: number;
  private soundChannel :egret.SoundChannel;
  constructor() {
    super();
    this.speed = 12;
    this.power = 1;
    this.channelPosition = 0;
    this.bullet = new egret.Bitmap();
    this.bullet.texture = Utils.createBitmapByName('bullet1');
    this.bulletSound = Utils.createSoundByName('bullet');
    this.width = this.bullet.width;
    this.height = this.bullet.height;
    this.addChild(this.bullet);
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
}
