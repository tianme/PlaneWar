var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.heroFactory = HeroFactory.getInstance();
        _this.enemySmallFactory = new EnemySmallFactory();
        _this.enemyCenterFactory = new EnemyCenterFactory();
        _this.enemyBigFactory = new EnemyBigFactory();
        _this.autoOpenFireTimer = new egret.Timer(200, 0);
        _this.addEnemyTimer = new egret.Timer(1000, 0);
        _this.hero = _this.heroFactory.createPlane();
        _this.countScoreTextField = new egret.TextField();
        _this.countScoreTextField.height = 40;
        _this.countScoreTextField.textColor = 0x000000;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    GameScene.prototype.addToStage = function () {
        this.touchEnabled = false;
        this.removeChildren();
        this.touchFlag = false;
        this.addChild(this.hero);
        this.countScoreTextField.text = GameConfig.countScore.toString();
        this.countScoreTextField.x = this.stage.stageWidth / 2 - this.countScoreTextField.width / 2;
        this.countScoreTextField.y = 0;
        this.addChild(this.countScoreTextField);
        this.addEventListener(HeroInStageAnimationEndEvent.heroInStageAnimationEnd, this.heroInStageAnimationEndHandle, this);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandle, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandle, this);
    };
    GameScene.prototype.touchMove = function (event) {
        var stageInfo = {
            stageW: this.stage.stageWidth,
            stageH: this.stage.stageHeight,
            stageX: event.stageX,
            stageY: event.stageY,
        };
        Utils.move(this.hero, stageInfo);
    };
    /**
     * hero自动开火
     *
     * @private
     * @memberof GameScene
     */
    GameScene.prototype.autoOpenFire = function () {
        this.autoOpenFireTimer.addEventListener(egret.TimerEvent.TIMER, this.autoAddBullet, this);
        this.autoOpenFireTimer.start();
    };
    /**
     * hero自动添加子弹
     *
     * @private
     * @memberof GameScene
     */
    GameScene.prototype.autoAddBullet = function () {
        var bullet = this.heroFactory.createBullet();
        this.hero.emitBullet(bullet);
    };
    /**
     * 碰撞检测、子弹越界检测、敌机越界检测
     *
     * @private
     * @memberof GameScene
     */
    GameScene.prototype.detect = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
    };
    GameScene.prototype.heroInStageAnimationEndHandle = function (event) {
        event.stopImmediatePropagation();
        this.touchEnabled = true;
        this.autoOpenFire();
        // 开始检测
        this.detect();
        this.addEnemyPlane();
        // 删除监听事件
        this.removeEventListener(HeroInStageAnimationEndEvent.heroInStageAnimationEnd, this.heroInStageAnimationEndHandle, this);
    };
    /**
     *
     *
     * @private
     * @memberof GameScene
     */
    GameScene.prototype.touchEndHandle = function () {
        this.touchFlag = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    /**
     * hero子弹碰撞检测事件的处理方法
     *
     * @private
     * @memberof GameScene
     */
    GameScene.prototype.frameHandle = function () {
        var _this = this;
        // 判断玩家子弹是否与敌人飞机碰撞
        StageObjectCache.heroBulletCache.forEach(function (item, index) {
            // 判断当前子弹是否有父元素，如果没有，当前元素还没有被添加到舞台上，先不做处理。
            if (!item.parent) {
                return;
            }
            if (item.y <= 0) {
                Pool.heroBulletPool.push(item);
                StageObjectCache.heroBulletCache.splice(index, 1);
                _this.removeChild(item);
                // 把item回收到heroBulletPool中
            }
            StageObjectCache.enemyCache.forEach(function (enemy, i) {
                if (Utils.hitDetect(item, enemy) &&
                    enemy.state === PlaneState.existing) {
                    if (item.parent) {
                        item.parent.removeChild(item);
                        Pool.heroBulletPool.push(item);
                        StageObjectCache.heroBulletCache.splice(index, 1);
                    }
                    enemy.life -= item.power;
                    if (enemy.life <= 0) {
                        enemy.state = PlaneState.dispose;
                        GameConfig.countScore += enemy.score;
                        _this.countScoreTextField.text = GameConfig.countScore.toString();
                        enemy.explode();
                    }
                }
                // 判断玩家飞机是否与敌人飞机碰撞
                if (Utils.hitDetect(_this.hero, enemy) &&
                    enemy.state === PlaneState.existing &&
                    _this.hero.state === PlaneState.existing) {
                    enemy.state = _this.hero.state = PlaneState.dispose;
                    console.log('game over');
                    _this.dispose();
                    enemy.explode();
                    _this.hero.explode();
                }
            });
        });
        var count = StageObjectCache.enemyCache.length;
        // 回收飞机
        for (var i = 0; i < count; i++) {
            var enemy = StageObjectCache.enemyCache[i];
            if (this.stage &&
                enemy.y > this.stage.stageHeight + enemy.height ||
                enemy.state === PlaneState.nonexistent) {
                StageObjectCache.enemyCache.splice(i, 1);
                this.recover(enemy);
                i--;
                enemy.reset();
                count--;
            }
        }
    };
    GameScene.prototype.randomRange = function (xMin, xMax) {
        return Math.floor(Math.random() * (xMax - xMin + 1) + xMin);
    };
    /**
     * 添加敌机
     *
     * @private
     * @memberof GameScene
     */
    GameScene.prototype.addEnemyPlane = function () {
        this.addEnemyTimer.addEventListener(egret.TimerEvent.TIMER, this.addEnemyTimerHandle, this);
        this.addEnemyTimer.start();
    };
    GameScene.prototype.addEnemyTimerHandle = function () {
        var enemy = this.getEnemy();
        this.addChild(enemy);
        var xMin = 0 - enemy.width / 2;
        var xMax = this.stage.stageWidth - enemy.width / 2;
        enemy.x = this.randomRange(xMin, xMax);
        enemy.y = -enemy.height;
        StageObjectCache.enemyCache.push(enemy);
    };
    GameScene.prototype.getEnemy = function () {
        var number = this.randomRange(1, 100);
        if (number < 50) {
            return this.enemySmallFactory.createPlane();
        }
        else if (number < 90) {
            return this.enemyCenterFactory.createPlane();
        }
        else {
            return this.enemyBigFactory.createPlane();
        }
    };
    GameScene.prototype.touchBeginHandle = function (event) {
        if (this.touchFlag) {
            return;
        }
        this.touchFlag = true;
        var stageInfo = {
            stageW: this.stage.stageWidth,
            stageH: this.stage.stageHeight,
            stageX: event.stageX,
            stageY: event.stageY,
        };
        this.hero.setDistance(stageInfo);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
    };
    /**
     * 释放资源
     *
     * @memberof GameScene
     */
    GameScene.prototype.dispose = function () {
        this.removeEventListener(HeroInStageAnimationEndEvent.heroInStageAnimationEnd, this.heroInStageAnimationEndHandle, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandle, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandle, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.frameHandle, this);
        this.addEnemyTimer.removeEventListener(egret.TimerEvent.TIMER, this.addEnemyTimerHandle, this);
        this.autoOpenFireTimer.removeEventListener(egret.TimerEvent.TIMER, this.autoAddBullet, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
        // this.removeChildren();
    };
    /**
     * 回收敌机
     *
     * @memberof GameScene
     */
    GameScene.prototype.recover = function (enemy) {
        switch (enemy.planeType) {
            case PlaneType.smallType:
                Pool.enemySmallPool.push(enemy);
                break;
            case PlaneType.centerType:
                Pool.enemyCenterPool.push(enemy);
                break;
            case PlaneType.bigType:
                Pool.enemyBigPool.push(enemy);
                break;
            default:
                break;
        }
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene", ["IDispose"]);
