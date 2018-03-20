class GameStart extends egret.DisplayObjectContainer {
  private shape:egret.Shape;

  private startBtn: egret.TextField;
  private gameStartEvent: egret.Event;
  constructor() {
    super();
    this.shape = new egret.Shape();
    this.startBtn = new egret.TextField();
    this.gameStartEvent = new GameStartEvent(GameStartEvent.gameStartEvent);

    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);

  }
  private onAddToStage() {
    this.shape.graphics.beginFill( 0xcccccc, 1);
    this.shape.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight );
    this.shape.graphics.endFill();
    this.addChild(this.shape);
    const tip = new egret.TextField();
    tip.text = '点击开始后会有游戏音乐响起，如不需要听背景音乐请先关闭音量。';
    tip.width = this.stage.stageWidth * 0.5;
    tip.lineSpacing = 10;
    tip.x = this.stage.stageWidth / 2 - tip.width / 2;
    tip.y = this.stage.stageHeight * 0.4 + tip.height / 2;
    tip.textColor = 0xFF0000;
    this.addChild(tip);
    this.startBtn.touchEnabled = true;
    this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle,this);
    this.startBtn.text = '开始';
    this.startBtn.textColor = 0x000000;
    // this.resetBtn.borderColor = 0x000000;
    // this.resetBtn.border = true;

    this.startBtn.x = this.stage.stageWidth / 2 - this.startBtn.width / 2;
    this.startBtn.y = this.stage.stageHeight * 0.7 + this.startBtn.height / 2;
    this.addChild(this.startBtn);

  }
  private touchTapHandle() {
    console.log('开始');

    this.dispatchEvent(this.gameStartEvent);
  }
  public dispose() {
    this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle,this);
  }
}
