import PipeNode from '../core/pipe-node';
import AdoPlayer from './audio';

export default class SourceNode extends PipeNode {
  /** 输入源节点 */
  public readonly node: AudioNode;
  /** 输入源 */
  public source: AdoPlayer;

  /**
   * 创建一个输入源节点
   * @param ctx 上下文
   * @param source 输入源
   */
  constructor(ctx: AudioContext, source: AdoPlayer) {
    super(ctx);
    this.source = source;
    this.node = this.ctx.createMediaElementSource(this.source.audio);
  }
}
