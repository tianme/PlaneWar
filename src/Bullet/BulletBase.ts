// 子弹抽象类

abstract class BulletBase extends egret.DisplayObjectContainer {
  // 子弹速度
  public abstract speed: number;
  // 子弹的威力
  public abstract power: number;
  // 子弹移动
  public abstract move(direction: Direction):void;
}
