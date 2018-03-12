class Utils {
  // 获取图片资源文件
  public static createBitmapByName(name: string): egret.Texture {
    const texture: egret.Texture = RES.getRes(name);

    return texture;
  }
  // 销毁资源
  public static dispose(dispose: IDispose) {
    dispose.dispose();
  }
  // 移动
  public static move(obj: PlaneBase, stageInfo: IStageInfo) {
    obj.move(stageInfo);
  }
  // 停止声音
  public static soundStop(obj: ISound) {
    obj.stop();
  }
  // 开启声音
  public static soundPlay(obj: ISound) {
    obj.play();
  }
  public static createSoundByName(name: string): egret.Sound {
    return RES.getRes(name) as egret.Sound;
  }
  /**
   * 基于矩形的碰撞检测
   *
   * @static
   * @param {egret.DisplayObject} obj1
   * @param {egret.DisplayObject} obj2
   * @returns {boolean}
   * @memberof Utils
   */
  public static hitDetect(
    obj1: egret.DisplayObject,
    obj2: egret.DisplayObject,
  ): boolean {
    var rect1: egret.Rectangle = obj1.getBounds();
    var rect2: egret.Rectangle = obj2.getBounds();
    rect1.x = obj1.x;
    rect1.y = obj1.y;
    rect2.x = obj2.x;
    rect2.y = obj2.y;
    return rect1.intersects(rect2);
  }
  // /**
  //  * 敌人飞机
  //  *
  //  * @static
  //  * @template T
  //  * @param {{new():T}} t
  //  * @returns {T}
  //  * @memberof Utils
  //  */
  // public static getEnemy<T>(t:{new():T}): T {
  //   return new t();
  // }
}