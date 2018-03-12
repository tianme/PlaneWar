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
        _this.autoOpenFireTimer = new egret.Timer(200, 0);
        _this.addEnemyTimer = new egret.Timer(1000, 0);
        _this.hero = _this.heroFactory.createPlane();
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.addToStage, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.dispose, _this);
        return _this;
    }
    GameScene.prototype.addToStage = function () {
        this.addChild(this.hero);
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
            if (item.y <= 50) {
                Pool.heroBulletPool.push(item);
                StageObjectCache.heroBulletCache.splice(index, 1);
                _this.removeChild(item);
                // 把item回收到heroBulletPool中
            }
            StageObjectCache.enemyCache.forEach(function (enemy, i) {
                if (Utils.hitDetect(item, enemy) &&
                    enemy.state === PlaneState.existing) {
                    enemy.state = PlaneState.dispose;
                    if (item.parent) {
                        item.parent.removeChild(item);
                        Pool.heroBulletPool.push(item);
                        StageObjectCache.heroBulletCache.splice(index, 1);
                    }
                    enemy.life -= item.power;
                    if (enemy.life <= 0) {
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
        for (var i = 0; i < count; i++) {
            var enemy = StageObjectCache.enemyCache[i];
            if (enemy.y > this.stage.stageHeight + enemy.height
                || enemy.state === PlaneState.nonexistent) {
                StageObjectCache.enemyCache.splice(i, 1);
                Pool.enemySmallPool.push(enemy);
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
        var enemySmall = this.enemySmallFactory.createPlane();
        this.addChild(enemySmall);
        var xMin = 0 - enemySmall.width / 2;
        var xMax = this.stage.stageWidth - enemySmall.width / 2;
        enemySmall.x = this.randomRange(xMin, xMax);
        enemySmall.y = -enemySmall.height;
        StageObjectCache.enemyCache.push(enemySmall);
    };
    GameScene.prototype.touchBeginHandle = function (event) {
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
    };
    return GameScene;
}(egret.DisplayObjectContainer));
__reflect(GameScene.prototype, "GameScene", ["IDispose"]);
