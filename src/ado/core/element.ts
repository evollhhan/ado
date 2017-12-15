import AdoPlayer from '../source/audio';
import PipeNode from './pipe-node';

export class AdoElement {
  /** 元素id */
  public readonly id: number;
  /** 音频上下文 */
  public readonly ctx: AudioContext;
  /** 输入节点 */
  private sourceNode: AudioNode;
  /** 当前节点 */
  private currentNode: AudioNode;
  /** 节点列表 */
  private list: PipeNode[];

  constructor(ctx: AudioContext, id: number) {
    this.id = id;
    this.ctx = ctx;
    this.sourceNode = null;
    this.currentNode = null;
  }

  /**
   * 添加输入源
   * @param source 输入源
   */
  public input(source: AdoPlayer): void {
    this.sourceNode = this.ctx.createMediaElementSource(source.audio);
    this.currentNode = this.sourceNode;
  }

  /**
   * 添加音频节点
   * @param pipe 音频节点类型
   */
  public append(pipe: PipeNode): void {
    pipe._Appended(this.ctx);
    this.list.push(pipe);
  }

  /** 初始化该元素，通常情况下由舞台初始化。 */
  public load(): void {
    if (this.currentNode) {
      return;
    }

    this.list.forEach(pipe => {
      this.currentNode.connect(pipe.node);
      this.currentNode = pipe.node;
    });

    this.currentNode.connect(this.ctx.destination);
  }
}
