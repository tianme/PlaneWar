// 飞机抽象类

abstract class PlaneBase extends egret.DisplayObjectContainer{
  // 飞机护甲
  public abstract life: number;

  // 发射子弹方法
  public abstract emitBullet(bullet: BulletBase): void;

  //

  public abstract setDistance(stageInfo:IStageInfo):void;

  // 飞机移动
  public abstract move (point: IStageInfo): void;

}
