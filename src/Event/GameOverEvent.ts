/**
 *
 * @class GameOverEvent
 * @extends {egret.Event}
 */
class GameOverEvent extends egret.Event {
  public static gameOverEvent = 'GameOverEvent';
  public constructor(type: string, bubbles: boolean = true, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}