export default class PipeNode {
  /** 元素id */
  public readonly id: number;
  /** 音频上下文 */
  public readonly ctx: AudioContext;
  /** 音频节点 */
  public readonly node: AudioNode;

  constructor(ctx: AudioContext, id: number) {
    this.id = id;
    this.ctx = ctx;
  }
}
