var __reflect=this&&this.__reflect||function(e,t,n){e.__class__=t,n?n.push(t):n=[t],e.__types__=e.__types__?n.concat(e.__types__):n},__extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n},__awaiter=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(o,r){function s(e){try{h(i.next(e))}catch(t){r(t)}}function a(e){try{h(i["throw"](e))}catch(t){r(t)}}function h(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(s,a)}h((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function n(e){return function(t){return i([e,t])}}function i(n){if(o)throw new TypeError("Generator is already executing.");for(;h;)try{if(o=1,r&&(s=r[2&n[0]?"return":n[0]?"throw":"next"])&&!(s=s.call(r,n[1])).done)return s;switch(r=0,s&&(n=[0,s.value]),n[0]){case 0:case 1:s=n;break;case 4:return h.label++,{value:n[1],done:!1};case 5:h.label++,r=n[1],n=[0];continue;case 7:n=h.ops.pop(),h.trys.pop();continue;default:if(s=h.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){h=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){h.label=n[1];break}if(6===n[0]&&h.label<s[1]){h.label=s[1],s=n;break}if(s&&h.label<s[2]){h.label=s[2],h.ops.push(n);break}s[2]&&h.ops.pop(),h.trys.pop();continue}n=t.call(e,h)}catch(i){n=[6,i],r=0}finally{o=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,r,s,a,h={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},BulletBase=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.DisplayObjectContainer);__reflect(BulletBase.prototype,"BulletBase");var AbstractFactory=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t}(egret.DisplayObjectContainer);__reflect(AbstractFactory.prototype,"AbstractFactory");var PlaneBase=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state=PlaneState.existing,t}return __extends(t,e),t}(egret.DisplayObjectContainer);__reflect(PlaneBase.prototype,"PlaneBase");var EnemySmallFactory=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.prototype.createPlane=function(){var e=Pool.enemySmallPool.shift();return e?e:(egret.log("test"),new EnemySmall)},t.prototype.createBullet=function(){return null},t}(AbstractFactory);__reflect(EnemySmallFactory.prototype,"EnemySmallFactory");var GameConfig=function(){function e(){}return e.hero={life:1,planeToggleTimeSpan:300,planeToggleCount:0,inStageAnimationTime:0,inStageAnimationTimeEnd:0},e.bg={speed:2},e}();__reflect(GameConfig.prototype,"GameConfig");var EnemyBullet=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.prototype.move=function(){},t}(BulletBase);__reflect(EnemyBullet.prototype,"EnemyBullet");var HeroBullet=function(e){function t(){var t=e.call(this)||this;return t.speed=12,t.power=1,t.channelPosition=0,t.bullet=new egret.Bitmap,t.bullet.texture=Utils.createBitmapByName("bullet1"),t.bulletSound=Utils.createSoundByName("bullet"),t.width=t.bullet.width,t.height=t.bullet.height,t.addChild(t.bullet),t.addEventListener(egret.Event.REMOVED_FROM_STAGE,t.dispose,t),t}return __extends(t,e),t.prototype.play=function(){this.bulletSound.play(this.channelPosition,1)},t.prototype.stop=function(){this.soundChannel&&(this.channelPosition=this.soundChannel.position,this.soundChannel.stop())},t.prototype.move=function(e){this.direction=e,this.addEventListener(egret.Event.ENTER_FRAME,this.frameHandle,this)},t.prototype.frameHandle=function(){switch(this.direction){case Direction.Up:this.y-=this.speed;break;case Direction.Down:this.y+=this.speed}},t.prototype.dispose=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.frameHandle,this),this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.dispose,this)},t}(BulletBase);__reflect(HeroBullet.prototype,"HeroBullet",["ISound","IDispose"]);var StageObjectCache=function(){function e(){}return e.heroBulletCache=new Array,e.enemyCache=new Array,e}();__reflect(StageObjectCache.prototype,"StageObjectCache");var Direction;!function(e){e[e.Up=0]="Up",e[e.Down=1]="Down",e[e.Left=2]="Left",e[e.Right=3]="Right"}(Direction||(Direction={}));var PlaneState;!function(e){e[e.existing=0]="existing",e[e.dispose=1]="dispose",e[e.nonexistent=2]="nonexistent"}(PlaneState||(PlaneState={}));var HeroInStageAnimationEndEvent=function(e){function t(t,n,i){return void 0===n&&(n=!0),void 0===i&&(i=!1),e.call(this,t,n,i)||this}return __extends(t,e),t.heroInStageAnimationEnd="HeroInStageAnimationEnd",t}(egret.Event);__reflect(HeroInStageAnimationEndEvent.prototype,"HeroInStageAnimationEndEvent");var HeroInStageRunBgEvent=function(e){function t(t,n,i){return void 0===n&&(n=!0),void 0===i&&(i=!1),e.call(this,t,n,i)||this}return __extends(t,e),t.HeroInStageRunBgEvent="HeroInStageRunBgEvent",t}(egret.Event);__reflect(HeroInStageRunBgEvent.prototype,"HeroInStageRunBgEvent");var Main=function(e){function t(){var t=e.call(this)||this;return t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t}return __extends(t,e),t.prototype.onAddToStage=function(e){var t=this;egret.lifecycle.addLifecycleListener(function(e){e.onUpdate=function(){}}),egret.lifecycle.onPause=function(){egret.ticker.pause(),Utils.soundStop(t.bgContent),console.log(StageObjectCache.heroBulletCache.length),console.log(StageObjectCache.enemyCache.length),console.log(Pool.enemySmallPool.length)},egret.lifecycle.onResume=function(){egret.ticker.resume(),Utils.soundPlay(t.bgContent)},this.runGame()["catch"](function(e){})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.bgContent=new BgContent,this.gameScene=new GameScene,this.createGameScene(),[4,platform.login()];case 2:return t.sent(),[4,platform.getUserInfo()];case 3:return e=t.sent(),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,RES.loadGroup("images",0,e)];case 2:return n.sent(),[4,RES.loadGroup("sounds",0,e)];case 3:return n.sent(),this.stage.removeChild(e),[3,5];case 4:return t=n.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.createGameScene=function(){this.addChild(this.bgContent),this.addChild(this.gameScene),this.addEventListener(HeroInStageRunBgEvent.HeroInStageRunBgEvent,this.HeroInStageRunBgEventHandle,this)},t.prototype.HeroInStageRunBgEventHandle=function(e){e.stopImmediatePropagation(),console.log("runBg"),this.bgContent.runBg(),this.removeEventListener(HeroInStageRunBgEvent.HeroInStageRunBgEvent,this.HeroInStageRunBgEventHandle,this)},t.prototype.startAnimation=function(e){var t=this,n=new egret.HtmlTextParser,i=e.map(function(e){return n.parse(e)}),o=this.textfield,r=-1,s=function(){r++,r>=i.length&&(r=0);var e=i[r];o.textFlow=e;var n=egret.Tween.get(o);n.to({alpha:1},200),n.wait(2e3),n.to({alpha:0},200),n.call(s,t)};s()},t}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var HeroFactory=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.getInstance=function(){return null==this.singletonClass?new t:this.singletonClass},t.prototype.createBullet=function(){var e=Pool.heroBulletPool.shift();return e?e:new HeroBullet},t.prototype.createPlane=function(){return new Hero(1)},t.singletonClass=null,t}(AbstractFactory);__reflect(HeroFactory.prototype,"HeroFactory");var EnemySmall=function(e){function t(){var t=e.call(this)||this;t.init(),t.textureList=new Array;for(var n=0;4>n;n++){var i=Utils.createBitmapByName("enemy1_down"+(n+1));t.textureList.push(i)}return t.small=new egret.Bitmap,t.addEventListener(egret.Event.ADDED,t.addToStage,t),t.addEventListener(egret.Event.REMOVED_FROM_STAGE,t.dispose,t),t}return __extends(t,e),t.prototype.addToStage=function(e){this.timer=new egret.Timer(200,4),this.small.texture=Utils.createBitmapByName("enemy1"),this.x=this.stage.width/2+this.width/2,this.y=-this.height,this.addChild(this.small),this.addEventListener(egret.Event.ENTER_FRAME,this.frameHandle,this)},t.prototype.emitBullet=function(){},t.prototype.move=function(){this.y+=this.speed},t.prototype.setDistance=function(){},t.prototype.frameHandle=function(){this.move()},t.prototype.explode=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.frameHandle,this),this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerHandle,this),this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerCompleteHandle,this),this.timer.start()},t.prototype.timerHandle=function(e){var t=e.target.currentCount,n=t%4;this.small.texture=this.textureList[n]},t.prototype.timerCompleteHandle=function(){this.parent&&this.parent.removeChild(this),this.state=PlaneState.nonexistent,this.dispose()},t.prototype.dispose=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.frameHandle,this),this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.dispose,this),this.removeEventListener(egret.TimerEvent.TIMER,this.timerHandle,this),this.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerCompleteHandle,this)},t.prototype.init=function(){this.life=1,this.speed=6,this.state=PlaneState.existing},t.prototype.reset=function(){this.init()},t}(PlaneBase);__reflect(EnemySmall.prototype,"EnemySmall",["IDispose"]);var Hero=function(e){function t(t){var n=e.call(this)||this;new egret.Shape;return n.life=GameConfig.hero.life,n.state=PlaneState.existing,n.speed=0,n.blowUpTextureList=new Array,n.init(),n.addChild(n.hero),n.addEventListener(egret.Event.ADDED_TO_STAGE,n.onAddToStage,n),n.addEventListener(egret.Event.REMOVED_FROM_STAGE,n.dispose,n),n}return __extends(t,e),t.prototype.onAddToStage=function(e){this.initPosition(),this.toggleHeroAnimation(),this.admissionAnimation(e)},t.prototype.init=function(){var e=this;this.distance={stageW:0,stageH:0,stageX:0,stageY:0},this.textureList=[],["hero1","hero2"].forEach(function(t,n){e.textureList.push(Utils.createBitmapByName(t))}),["hero_blowup_n1","hero_blowup_n2","hero_blowup_n3","hero_blowup_n4"].forEach(function(t,n){e.blowUpTextureList.push(Utils.createBitmapByName(t))}),this.explodeTimer=new egret.Timer(200,4),this.hero=new egret.Bitmap,this.hero.texture=this.textureList[0],this.timer=new egret.Timer(GameConfig.hero.planeToggleTimeSpan,GameConfig.hero.planeToggleCount),this.width=this.hero.width,this.height=this.hero.height},t.prototype.initPosition=function(){var e=this.stage.stageWidth,t=this.stage.stageHeight,n=e/2-this.width/2;this.x=n,this.y=t+this.width},t.prototype.emitBullet=function(e){e.x=this.x+this.width/2-e.width/2,e.y=this.y+this.height/2-e.height/2,this.parent&&this.parent.addChild(e),StageObjectCache.heroBulletCache.push(e);var t=e;t.play(),e.move(Direction.Up)},t.prototype.setDistance=function(e){this.distance.stageX=e.stageX-this.x,this.distance.stageY=e.stageY-this.y},t.prototype.admissionAnimation=function(e){var t=this,n=this.stage.stageHeight,i=.7*n-this.height/2,o=new HeroInStageAnimationEndEvent(HeroInStageAnimationEndEvent.heroInStageAnimationEnd),r=new HeroInStageRunBgEvent(HeroInStageRunBgEvent.HeroInStageRunBgEvent);egret.Tween.get(this).to({y:i},GameConfig.hero.inStageAnimationTime,egret.Ease.sineInOut).call(function(){console.log("hero背景执行"),t.dispatchEvent(r)}).to({y:n-200},GameConfig.hero.inStageAnimationTimeEnd,egret.Ease.sineInOut).call(function(){console.log("hero动画全部结束"),t.dispatchEvent(o)})},t.prototype.move=function(e){var t=this,n=this.distance,i=e.stageX-n.stageX,o=e.stageW-t.width+t.width/2,r=0-t.width/2;i=o>i?i:o,i=r>i?r:i;var s=e.stageY-n.stageY,a=e.stageH-t.height,h=0;s=s>a?a:s,s=s>h?s:h,t.x=i,t.y=s},t.prototype.toggleHeroAnimation=function(){this.timer.addEventListener(egret.TimerEvent.TIMER,this.toggleHeroBitMap,this),this.timer.start()},t.prototype.toggleHeroBitMap=function(e){var t=e.target.currentCount,n=t%2;this.hero.texture=this.textureList[n]},t.prototype.dispose=function(){console.log("hero.ts dispose"),this.removeEventListener(egret.TimerEvent.TIMER,this.toggleHeroBitMap,this),this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this),this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.dispose,this)},t.prototype.explode=function(){this.timer.stop(),this.explodeTimer.addEventListener(egret.TimerEvent.TIMER,this.explodeHandle,this),this.explodeTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerCompleteHandle,this),this.explodeTimer.start()},t.prototype.explodeHandle=function(e){var t=e.target.currentCount,n=t%4;this.hero.texture=this.blowUpTextureList[n]},t.prototype.timerCompleteHandle=function(){this.state=PlaneState.nonexistent,this.explodeTimer.removeEventListener(egret.TimerEvent.TIMER,this.explodeHandle,this),this.explodeTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerCompleteHandle,this),this.dispose(),this.parent&&this.parent.removeChild(this)},t.prototype.reset=function(){},t}(PlaneBase);__reflect(Hero.prototype,"Hero",["IDispose"]);var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var Pool=function(){function e(){}return e.heroBulletPool=new Array,e.enemyBulletPool=new Array,e.enemySmallPool=new Array,e}();__reflect(Pool.prototype,"Pool");var BgContent=function(e){function t(){var t=e.call(this)||this;t.config=GameConfig.bg,t.bgUp=new egret.Bitmap,t.bgDown=new egret.Bitmap,t.channelPosition=0;var n=Utils.createBitmapByName("background");return t.bgSound=Utils.createSoundByName("bgsound"),t.bgUp.texture=n,t.bgDown.texture=n,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAddToStage,t),t.addEventListener(egret.Event.REMOVED_FROM_STAGE,t.dispose,t),t}return __extends(t,e),t.prototype.onAddToStage=function(){var e=this.stage.stageWidth,t=this.stage.stageHeight;this.bgUp.width=e,this.bgUp.height=t,this.bgUp.x=0,this.bgUp.y=-t,this.bgDown.width=e,this.bgDown.height=t,this.bgDown.x=0,this.bgDown.y=0,this.addChild(this.bgUp),this.addChild(this.bgDown),this.play(),this.touchEnabled=!0},t.prototype.runBg=function(){this.addEventListener(egret.Event.ENTER_FRAME,this.moveBg,this)},t.prototype.moveBg=function(){this.y+=this.config.speed,this.y>=this.stage.stageHeight&&(this.y=0)},t.prototype.dispose=function(){this.removeEventListener(egret.Event.ENTER_FRAME,this.moveBg,this),this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this),this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.dispose,this)},t.prototype.play=function(){this.soundChannel=this.bgSound.play(this.channelPosition,-1)},t.prototype.stop=function(){this.soundChannel&&(this.channelPosition=this.soundChannel.position,console.log("stop"),this.soundChannel.stop())},t}(egret.DisplayObjectContainer);__reflect(BgContent.prototype,"BgContent",["IDispose","ISound"]);var GameScene=function(e){function t(){var t=e.call(this)||this;return t.heroFactory=HeroFactory.getInstance(),t.enemySmallFactory=new EnemySmallFactory,t.autoOpenFireTimer=new egret.Timer(200,0),t.addEnemyTimer=new egret.Timer(1e3,0),t.hero=t.heroFactory.createPlane(),t.addEventListener(egret.Event.ADDED_TO_STAGE,t.addToStage,t),t.addEventListener(egret.Event.REMOVED_FROM_STAGE,t.dispose,t),t}return __extends(t,e),t.prototype.addToStage=function(){this.addChild(this.hero),this.addEventListener(HeroInStageAnimationEndEvent.heroInStageAnimationEnd,this.heroInStageAnimationEndHandle,this),this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginHandle,this),this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEndHandle,this)},t.prototype.touchMove=function(e){var t={stageW:this.stage.stageWidth,stageH:this.stage.stageHeight,stageX:e.stageX,stageY:e.stageY};Utils.move(this.hero,t)},t.prototype.autoOpenFire=function(){this.autoOpenFireTimer.addEventListener(egret.TimerEvent.TIMER,this.autoAddBullet,this),this.autoOpenFireTimer.start()},t.prototype.autoAddBullet=function(){var e=this.heroFactory.createBullet();this.hero.emitBullet(e)},t.prototype.detect=function(){this.addEventListener(egret.Event.ENTER_FRAME,this.frameHandle,this)},t.prototype.heroInStageAnimationEndHandle=function(e){e.stopImmediatePropagation(),this.touchEnabled=!0,this.autoOpenFire(),this.detect(),this.addEnemyPlane(),this.removeEventListener(HeroInStageAnimationEndEvent.heroInStageAnimationEnd,this.heroInStageAnimationEndHandle,this)},t.prototype.touchEndHandle=function(){this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this)},t.prototype.frameHandle=function(){var e=this;StageObjectCache.heroBulletCache.forEach(function(t,n){t.parent&&(t.y<=50&&(Pool.heroBulletPool.push(t),StageObjectCache.heroBulletCache.splice(n,1),e.removeChild(t)),StageObjectCache.enemyCache.forEach(function(i,o){Utils.hitDetect(t,i)&&i.state===PlaneState.existing&&(i.state=PlaneState.dispose,t.parent&&(t.parent.removeChild(t),Pool.heroBulletPool.push(t),StageObjectCache.heroBulletCache.splice(n,1)),i.life-=t.power,i.life<=0&&i.explode()),Utils.hitDetect(e.hero,i)&&i.state===PlaneState.existing&&e.hero.state===PlaneState.existing&&(console.log("game over"),e.dispose(),i.explode(),e.hero.explode())}))});for(var t=StageObjectCache.enemyCache.length,n=0;t>n;n++){var i=StageObjectCache.enemyCache[n];(i.y>this.stage.stageHeight+i.height||i.state===PlaneState.nonexistent)&&(StageObjectCache.enemyCache.splice(n,1),Pool.enemySmallPool.push(i),n--,i.reset(),t--)}},t.prototype.randomRange=function(e,t){return Math.floor(Math.random()*(t-e+1)+e)},t.prototype.addEnemyPlane=function(){this.addEnemyTimer.addEventListener(egret.TimerEvent.TIMER,this.addEnemyTimerHandle,this),this.addEnemyTimer.start()},t.prototype.addEnemyTimerHandle=function(){var e=this.enemySmallFactory.createPlane();this.addChild(e);var t=0-e.width/2,n=this.stage.stageWidth-e.width/2;e.x=this.randomRange(t,n),e.y=-e.height,StageObjectCache.enemyCache.push(e)},t.prototype.touchBeginHandle=function(e){var t={stageW:this.stage.stageWidth,stageH:this.stage.stageHeight,stageX:e.stageX,stageY:e.stageY};this.hero.setDistance(t),this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this)},t.prototype.dispose=function(){this.removeEventListener(HeroInStageAnimationEndEvent.heroInStageAnimationEnd,this.heroInStageAnimationEndHandle,this),this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBeginHandle,this),this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEndHandle,this),this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),this.removeEventListener(egret.Event.ENTER_FRAME,this.frameHandle,this),this.addEnemyTimer.removeEventListener(egret.TimerEvent.TIMER,this.addEnemyTimerHandle,this),this.autoOpenFireTimer.removeEventListener(egret.TimerEvent.TIMER,this.autoAddBullet,this),this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.dispose,this)},t}(egret.DisplayObjectContainer);__reflect(GameScene.prototype,"GameScene",["IDispose"]);var Utils=function(){function e(){}return e.createBitmapByName=function(e){var t=RES.getRes(e);return t},e.dispose=function(e){e.dispose()},e.move=function(e,t){e.move(t)},e.soundStop=function(e){e.stop()},e.soundPlay=function(e){e.play()},e.createSoundByName=function(e){return RES.getRes(e)},e.hitDetect=function(e,t){var n=e.getBounds(),i=t.getBounds();return n.x=e.x,n.y=e.y,i.x=t.x,i.y=t.y,n.intersects(i)},e}();__reflect(Utils.prototype,"Utils");