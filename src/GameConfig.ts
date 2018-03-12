interface IHero {
  life: number; // 玩家的生命
  planeToggleTimeSpan: number; // 飞机切换图片的时间
  planeToggleCount: number; // 飞机切换的次数
  inStageAnimationTime: number; // 进场动画的时间
  inStageAnimationTimeEnd: number; // 进场动画结束
}
/**
 * 背景
 */
interface IBG{
  speed: number, // 背景滚动的速度
}
/**
 * 配置信息
 * @class GameConfig
 */
class GameConfig {
  public static hero: IHero = {
    life: 1,
    planeToggleTimeSpan: 300,
    planeToggleCount: 0,
    inStageAnimationTime: 0, // 1000
    inStageAnimationTimeEnd: 0, // 3000
  };
  public static bg: IBG = {
    speed: 2,
  }
}
