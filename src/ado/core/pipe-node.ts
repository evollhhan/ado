export default abstract class PipeNode {
  /** 元素id */
  public readonly id: number;
  /** 音频上下文 */
  public ctx: AudioContext;
  /** 父节点 */
  public upNode: number[];
  /** 子节点 */
  public downNode: number[];
  /** 音频节点，由主函数初始化后赋值 */
  public abstract node: AudioNode;

  /** 使用上下文初始化PipeNode类 */
  constructor(ctx: AudioContext) {
    this.id = Date.now();
    this.upNode = [];
    this.downNode = [];
    this.ctx = ctx;
  }

  /**
   * 链接音频节点
   * @param pipe 上一节点
   */
  public connect(pipe: PipeNode): void {
    this.downNode.push(pipe.id);
    pipe.upNode.push(this.id);
    this.node.connect(pipe.node);
  }

  /**
   * 输出节点
   * 任何节点最后都要输出才有作用。
   */
  public output(): void {
    this.node.connect(this.ctx.destination);
  }
}
