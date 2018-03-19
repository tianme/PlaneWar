/**
 *
 * @class GameOverEvent
 * @extends {egret.Event}
 */
class GameStartEvent extends egret.Event {
  public static gameStartEvent = 'GameStartEvent';
  public constructor(type: string, bubbles: boolean = true, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}