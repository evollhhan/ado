import PipeNode from './pipe-node';

export class AdoElement {
  /** 元素id */
  public readonly id: number;
  /** 音频上下文 */
  public readonly ctx: AudioContext;
  /** 根节点 */
  public rootNode: PipeNode;

  constructor(ctx: AudioContext, id: number) {
    this.id = id;
    this.ctx = ctx;
    this.rootNode = null;
  }

  /**
   * 添加音频根节点
   * @param pipe 音频节点类型
   */
  public append(pipe: PipeNode): void {
    if (this.rootNode) {
      console.warn('Only one rootnode is allowed in an ado element.');
      return;
    }

    pipe.ctx = this.ctx;
    pipe.rootNode = pipe;
    this.rootNode = pipe;
  }
}
