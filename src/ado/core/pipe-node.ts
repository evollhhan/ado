export default abstract class PipeNode {
  /** 元素id */
  public readonly id: number;
  /** 音频上下文 */
  public ctx: AudioContext;
  /** 上游节点 */
  public listOfUpNode: number[];
  /** 下游节点 */
  public listOfDownNode: number[];
  /** 根节点 */
  public rootNode: PipeNode;
  /** 音频节点，由主函数初始化后赋值 */
  public abstract node: AudioNode;

  /** 初始化PipeNode类 */
  constructor() {
    this.id = Date.now();
    this.listOfUpNode = [];
    this.listOfDownNode = [];
  }

  /** 音频节点主函数 */
  protected abstract main(): void;

  /**
   * 链接音频节点
   * @param pipe 上一节点
   */
  public append(pipe: PipeNode): void {
    this.ctx = pipe.ctx;
    this.rootNode = pipe.rootNode;
    this.listOfDownNode.push(pipe.id);
    pipe.listOfUpNode.push(this.id);
    this.main();
  }
}
