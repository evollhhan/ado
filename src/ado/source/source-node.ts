import PipeNode from '../core/pipe-node';
import AdoPlayer from './audio';

export default class SourceNode extends PipeNode {
  /** 输入源节点 */
  public node: AudioNode;
  /** 输入源 */
  public source: AdoPlayer;

  /**
   * 创建一个输入源节点
   * @param source 输入源
   */
  constructor(source: AdoPlayer) {
    super();
    this.source = source;
  }

  protected main(): void {
    this.node = this.ctx.createMediaElementSource(this.source.audio);
  }
}
