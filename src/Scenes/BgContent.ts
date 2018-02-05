class BgContent extends egret.DisplayObjectContainer implements IDispose {
  private bgUp: egret.Bitmap;
  private bgDown: egret.Bitmap;
  constructor() {
    super();
    this.bgUp = new egret.Bitmap();
    this.bgDown = new egret.Bitmap();
    const texture = Utils.createBitmapByName('background');
    this.bgUp.texture = texture;
    this.bgDown.texture = texture;

    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    this.addEventListener(egret.Event.REMOVED, this.dispose, this);
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
  }
  public runBg(): void {
    this.addEventListener(egret.Event.ENTER_FRAME, this.moveBg, this);
  }
  private moveBg() {
    this.y += 2;
    if (this.y >= this.stage.stageHeight) {
      this.y = 0;
    }
  }
  public dispose() {
    this.removeEventListener(egret.Event.ENTER_FRAME, this.moveBg, this);
    this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
  }
}
