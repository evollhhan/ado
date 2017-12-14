import { AdoElement } from './element';

/**
 * Ado Stage
 */
export default class AdoStage {
  /** audio context */
  public ctx: AudioContext;
  /** audio element list */
  public elements: { [key: string]: AdoElement };

  /** 创建一个Audio舞台。 */
  constructor() {
    const context = window.AudioContext || window.webkitAudioContext;
    this.ctx = new context();
    this.elements = {};
  }

  /**
   * 添加一个音频元素。
   * @param ele 音频元素
   */
  public createElement(): AdoElement {
    const id = Date.now();
    const ele = new AdoElement(this.ctx, id);
    return ele;
  }
}
