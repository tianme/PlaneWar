var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Utils = (function () {
    function Utils() {
    }
    // 获取资源文件
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
    return Utils;
}());
__reflect(Utils.prototype, "Utils");
