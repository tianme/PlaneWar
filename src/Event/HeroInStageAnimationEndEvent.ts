/**
 * Hero进入舞台并且动画执行完毕后的事件
 *
 * @class HeroInStageAnimationEndEvent
 * @extends {egret.Event}
 */
class HeroInStageAnimationEndEvent extends egret.Event {
  public static heroInStageAnimationEnd = 'HeroInStageAnimationEnd';
  public constructor(type: string, bubbles: boolean = true, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}