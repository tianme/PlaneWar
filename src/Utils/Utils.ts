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
  // 停止声音
  public static soundStop(obj: ISound){
    obj.stop();
  }
  // 开启声音
  public static soundPlay(obj: ISound){
    obj.play();
  }
}
