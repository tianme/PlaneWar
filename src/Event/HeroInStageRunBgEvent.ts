class HeroInStageRunBgEvent extends egret.Event{
  public static HeroInStageRunBgEvent = 'HeroInStageRunBgEvent';
  public constructor(type: string, bubbles: boolean = true , cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}