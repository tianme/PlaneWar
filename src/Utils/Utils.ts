class Utils {
  // 获取资源文件
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
}
