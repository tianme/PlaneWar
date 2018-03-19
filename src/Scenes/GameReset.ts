class GameReset extends egret.DisplayObjectContainer {
  private shape:egret.Shape;

  private resetBtn: egret.TextField;
  private gameStartEvent: egret.Event;
  constructor() {
    super();
    this.shape = new egret.Shape();
    this.resetBtn = new egret.TextField();
    this.gameStartEvent = new GameStartEvent(GameStartEvent.gameStartEvent);

    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);

  }
  private onAddToStage() {
    this.shape.graphics.beginFill( 0xcccccc, 1);
    this.shape.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight );
    this.shape.graphics.endFill();
    this.addChild(this.shape);
    this.resetBtn.touchEnabled = true;
    this.resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle,this);

    const countScoreTextField = new egret.TextField();
    countScoreTextField.text = GameConfig.countScore.toString();
    countScoreTextField.textColor = 0x000000;
    countScoreTextField.x = this.stage.stageWidth /2 - countScoreTextField.width/2;
    countScoreTextField.y = this.stage.stageHeight * 0.4 + countScoreTextField.height / 2;
    this.addChild(countScoreTextField);
    this.resetBtn.text = '重新开始';
    this.resetBtn.textColor = 0x000000;
    // this.resetBtn.borderColor = 0x000000;
    // this.resetBtn.border = true;

    this.resetBtn.x = this.stage.stageWidth /2 - this.resetBtn.width/2;
    this.resetBtn.y = this.stage.stageHeight * 0.7 + this.resetBtn.height / 2;
    this.addChild(this.resetBtn);

  }
  private touchTapHandle() {
    console.log('reset');

    this.dispatchEvent(this.gameStartEvent);
  }
  public dispose() {
    this.resetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandle,this);
  }
}
