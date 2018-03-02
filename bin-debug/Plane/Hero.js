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
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(armor) {
        var _this = _super.call(this) || this;
        _this.life = GameConfig.hero.life;
        // console.log(gameConfig);
        _this.init();
        _this.addChild(_this.hero);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        _this.addEventListener(egret.Event.REMOVED, _this.dispose, _this);
        return _this;
    }
    Hero.prototype.onAddToStage = function (event) {
        // 初始位置
        this.initPosition();
        // 切换
        this.toggleHeroAnimation();
        // 入场动画
        this.admissionAnimation(event);
    };
    /**
     * 初始化
     */
    Hero.prototype.init = function () {
        var _this = this;
        // 初始化distance
        this.distance = {
            stageW: 0,
            stageH: 0,
            stageX: 0,
            stageY: 0,
        };
        // 初始化hero图片
        this.textureList = [];
        ['hero1', 'hero2'].forEach(function (item, index) {
            _this.textureList.push(Utils.createBitmapByName(item));
        });
        this.hero = new egret.Bitmap();
        this.hero.texture = this.textureList[0];
        this.timer = new egret.Timer(GameConfig.hero.planeToggleTimeSpan, GameConfig.hero.planeToggleCount);
        this.width = this.hero.width;
        this.height = this.hero.height;
    };
    /**
     * 飞机的初始位置
     */
    Hero.prototype.initPosition = function () {
        // 初始化飞机的位置
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        var x = stageW / 2 - this.width / 2;
        this.x = x;
        this.y = stageH + this.width;
    };
    /**
     * 发送子弹
     *
     * @param {BulletBase} bullet
     * @memberof Hero
     */
    Hero.prototype.emitBullet = function (bullet) {
        bullet.x = this.x + this.width / 2 - bullet.width / 2;
        bullet.y = this.y + this.height / 2 - bullet.height / 2;
        this.parent.addChild(bullet);
        BulletPool.heroBulletPool.push(bullet);
        var horeBullet = bullet;
        horeBullet.play();
        this.addEventListener(egret.Event.ENTER_FRAME, this.bulleMove.bind(this, bullet), this);
    };
    /**
     * 记录飞机与当前点击位置的距离
     *
     * @param {IStageInfo} stageInfo
     * @memberof Hero
     */
    Hero.prototype.setDistance = function (stageInfo) {
        this.distance.stageX = stageInfo.stageX - this.x;
        this.distance.stageY = stageInfo.stageY - this.y;
    };
    /**
     * 入场动画
     *
     * @private
     * @param {egret.TouchEvent} event
     * @memberof Hero
     */
    Hero.prototype.admissionAnimation = function (event) {
        var _this = this;
        var stageH = this.stage.stageHeight;
        var y = 0.7 * stageH - this.height / 2;
        var heroInStageAnimationEnd = new HeroInStageAnimationEndEvent(HeroInStageAnimationEndEvent.heroInStageAnimationEnd);
        var heroInStageRunBgEvent = new HeroInStageRunBgEvent(HeroInStageRunBgEvent.HeroInStageRunBgEvent);
        egret.Tween.get(this)
            .to({ y: y }, GameConfig.hero.inStageAnimationTime, egret.Ease.sineInOut)
            .call(function () {
            console.log('hero背景执行');
            // 动画结束发送事件
            _this.dispatchEvent(heroInStageRunBgEvent);
        })
            .to({ y: stageH - 200 }, GameConfig.hero.inStageAnimationTimeEnd, egret.Ease.sineInOut)
            .call(function () {
            console.log('hero动画全部结束');
            _this.dispatchEvent(heroInStageAnimationEnd);
        });
    };
    /**
     * 飞机移动
     *
     * @param {IStageInfo} stageInfo
     * @memberof Hero
     */
    Hero.prototype.move = function (stageInfo) {
        console.log('move');
        var hero = this;
        var distance = this.distance;
        var x = stageInfo.stageX - distance.stageX;
        var xMax = stageInfo.stageW - hero.width + hero.width / 2;
        var xMin = 0 - hero.width / 2;
        x = x < xMax ? x : xMax;
        x = x < xMin ? xMin : x;
        var y = stageInfo.stageY - distance.stageY;
        var yMax = stageInfo.stageH - hero.height;
        var yMin = 0;
        y = y > yMax ? yMax : y;
        y = y > yMin ? y : yMin;
        hero.x = x;
        hero.y = y;
    };
    /**
     * 切换飞机图片。
     */
    Hero.prototype.toggleHeroAnimation = function () {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.toggleHeroBitMap, this);
        this.timer.start();
    };
    Hero.prototype.toggleHeroBitMap = function (event) {
        var current = event.target.currentCount;
        var index = current % 2;
        this.hero.texture = this.textureList[index];
    };
    Hero.prototype.dispose = function () {
        this.removeEventListener(egret.TimerEvent.TIMER, this.toggleHeroBitMap, this);
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
    };
    Hero.prototype.bulleMove = function (bullet) {
        bullet.y -= bullet.speed;
    };
    return Hero;
}(PlaneBase));
__reflect(Hero.prototype, "Hero", ["IDispose"]);
