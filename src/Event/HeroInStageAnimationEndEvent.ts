class HeroInStageAnimationEndEvent extends egret.Event {
  public static heroInStageAnimationEnd = 'HeroInStageAnimationEnd';
  public constructor(type: string, bubbles: boolean = true, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}