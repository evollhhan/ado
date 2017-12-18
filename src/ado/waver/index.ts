import PipeNode from '../core/pipe-node';

export default class AdoWaver extends PipeNode {
  public readonly node: any;

  /**
   * 创建一个周期波形
   * @param ctx 音频上下文
   */
  constructor(ctx: AudioContext) {
    super(ctx);
    this.node = ctx.createOscillator();
  }
}
