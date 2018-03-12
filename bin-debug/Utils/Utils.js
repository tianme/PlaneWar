var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    // 获取图片资源文件
    Utils.createBitmapByName = function (name) {
        var texture = RES.getRes(name);
        return texture;
    };
    // 销毁资源
    Utils.dispose = function (dispose) {
        dispose.dispose();
    };
    // 移动
    Utils.move = function (obj, stageInfo) {
        obj.move(stageInfo);
    };
    // 停止声音
    Utils.soundStop = function (obj) {
        obj.stop();
    };
    // 开启声音
    Utils.soundPlay = function (obj) {
        obj.play();
    };
    Utils.createSoundByName = function (name) {
        return RES.getRes(name);
    };
    /**
     * 基于矩形的碰撞检测
     *
     * @static
     * @param {egret.DisplayObject} obj1
     * @param {egret.DisplayObject} obj2
     * @returns {boolean}
     * @memberof Utils
     */
    Utils.hitDetect = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
