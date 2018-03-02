interface IHero {
  life: number; // 玩家的生命
  planeToggleTimeSpan: number; // 飞机切换图片的时间
  planeToggleCount: number; // 飞机切换的次数
  inStageAnimationTime: number; // 进场动画的时间
  inStageAnimationTimeEnd: number;
}

// interface IGameConfig {
//   hero: IHero;
// }
// const gameConfig:IGameConfig = {
//   hero:{
//     armor: 1,
//     planeToggleTimeSpan: 300,
//     planeToggleCount: 0,
//     inStageAnimationTime: 1000,
//   }
// }
class GameConfig {
  public static hero: IHero = {
    life: 1,
    planeToggleTimeSpan: 300,
    planeToggleCount: 0,
    inStageAnimationTime: 1000,
    inStageAnimationTimeEnd: 3000,
  };
}
