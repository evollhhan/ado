import AdoPlayer from '../source/audio';

export class AdoElement {
  /** 元素id */
  public readonly id: number;
  /** 音频上下文 */
  public readonly ctx: AudioContext;
  /** 输入源 */
  private source: AdoPlayer;
  /** 输入节点 */
  private sourceNode: AudioNode;
  /** 当前节点 */
  private currentNode: AudioNode;
  /** 节点列表 */
  private list: AudioNode[];

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
    this.source = source;
  }

  /**
   * 添加音频节点
   * @param node 音频节点
   */
  public append(node: AudioNode): void {
    if (!this.sourceNode) {
      return console.warn('Use method "input" to input an audio source first.');
    }

    this.list.push(node);
  }

  /**
   * 初始化该元素，通常情况下由舞台初始化。
   * @param ctx 音频上下文
   */
  public load(): void {
    if (this.sourceNode) {
      return;
    }

    this.sourceNode = this.ctx.createMediaElementSource(this.source.audio);
    this.currentNode = this.sourceNode;

    this.list.forEach(node => {
      this.currentNode.connect(node);
      this.currentNode = node;
    });

    this.currentNode.connect(this.ctx.destination);
  }
}
