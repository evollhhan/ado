export default abstract class PipeNode {
  /** 元素id */
  public readonly id: number;
  /** 音频上下文 */
  public ctx: AudioContext;
  /** 音频节点，由主函数初始化后赋值 */
  public node: AudioNode;

  /** 初始化PipeNode类 */
  constructor() {
    this.id = Date.now();
  }

  /** 音频节点主函数 */
  public abstract main(): AudioNode;

  /** 根据传入的上下文，挂载节点 */
  public _Appended(ctx: AudioContext): void {
    this.ctx = ctx;
    this.node = this.main();
  }
}
