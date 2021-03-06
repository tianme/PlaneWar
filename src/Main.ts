//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

  private bgContent: BgContent;
  private gameStart: GameStart;
  private gameScene: GameScene;
  private gameReset: GameReset;

  // private enemySmall: PlaneBase;
  public constructor() {
    super();

    this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
  }
  private onAddToStage(event: egret.Event) {
    egret.lifecycle.addLifecycleListener(context => {
      // custom lifecycle plugin

      context.onUpdate = () => {};
    });

    egret.lifecycle.onPause = () => {
      egret.ticker.pause();
      Utils.soundStop(this.bgContent);
    };

    egret.lifecycle.onResume = () => {
      egret.ticker.resume();
      Utils.soundPlay(this.bgContent);
    };

    this.runGame().catch(e => {
      // console.log(e);
    });
  }

  private async runGame() {
    await this.loadResource();


    this.bgContent = new BgContent();
    this.gameStart = new GameStart();
    this.gameScene = new GameScene();
    this.gameReset = new GameReset();

    this.createGameScene();
    this.addEventListener(GameStartEvent.gameStartEvent,this.gameStartHandle,this);
    this.addEventListener(GameOverEvent.gameOverEvent,this.gameOverHandle,this);
    await platform.login();
    const userInfo = await platform.getUserInfo();
  }
  private gameOverHandle(event: egret.Event) {
    this.removeChild(this.bgContent);
    this.removeChild(this.gameScene);
    this.addChild(this.gameReset);
  }
  private gameStartHandle() {
    GameConfig.countScore = 0;
    StageObjectCache.heroBulletCache= [];
    StageObjectCache.enemyCache= [];
    if(this.gameReset.parent){
      this.removeChild(this.gameReset);
    }
    if(this.bgContent.parent){
      this.removeChild(this.bgContent);
    }
    if(this.gameScene.parent){
      this.removeChild(this.gameScene);
    }
    this.addChild(this.bgContent);
    this.addChild(this.gameScene);
  }
  private async loadResource() {
    try {
      const loadingView = new LoadingUI();
      this.stage.addChild(loadingView);
      await RES.loadConfig('resource/default.res.json', 'resource/');
      await RES.loadGroup('images', 0, loadingView);
      await RES.loadGroup('sounds', 0, loadingView);
      this.stage.removeChild(loadingView);
    } catch (e) {
      console.error(e);
    }
  }

  private textfield: egret.TextField;
  /**
   * 创建游戏场景
   * Create a game scene
   */
  private createGameScene() {
    // this.addChild(this.bgContent);
    // this.addChild(this.gameScene);
    this.addChild(this.gameStart);
    this.addEventListener(
      HeroInStageRunBgEvent.HeroInStageRunBgEvent,
      this.HeroInStageRunBgEventHandle,
      this,
    );
  }
  /**
   * hero进入场景的处理事件
   * @param event egret.Event
   */
  private HeroInStageRunBgEventHandle(event: egret.Event) {
    event.stopImmediatePropagation();
    // console.log(6666666);
    this.bgContent.runBg();
    // this.removeEventListener(
    //   HeroInStageRunBgEvent.HeroInStageRunBgEvent,
    //   this.HeroInStageRunBgEventHandle,
    //   this,
    // );
  }

  /**
   * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
   * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
   */
  //   private createBitmapByName(name: string) {
  //     let result = new egret.Bitmap();
  //     let texture: egret.Texture = RES.getRes(name);
  //     result.texture = texture;
  //     return result;
  //   }

  /**
   * 描述文件加载成功，开始播放动画
   * Description file loading is successful, start to play the animation
   */
  private startAnimation(result: string[]) {
    let parser = new egret.HtmlTextParser();

    let textflowArr = result.map(text => parser.parse(text));
    let textfield = this.textfield;
    let count = -1;
    let change = () => {
      count++;
      if (count >= textflowArr.length) {
        count = 0;
      }
      let textFlow = textflowArr[count];

      // 切换描述内容
      // Switch to described content
      textfield.textFlow = textFlow;
      let tw = egret.Tween.get(textfield);
      tw.to({alpha: 1}, 200);
      tw.wait(2000);
      tw.to({alpha: 0}, 200);
      tw.call(change, this);
    };

    change();
  }
}
